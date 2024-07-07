import { Request, Response } from "express";
import { prismaConnection } from "../database/prisma.connection";

export class ReplysController {
  public static async create(request: Request, response: Response) {
    try {
      const { content } = request.body;
      const { tweetId } = request.params;
      const userId = request.body.userId;

      // Verificar se o tweet à ser respondido/retwitado  existe
      const tweetFound = await prismaConnection.tweet.findUnique({
        where: {
          id: tweetId,
        },
      });

      if (!tweetFound) {
        return response.status(404).json({
          ok: false,
          message: "Tweet não encontrado",
        });
      }

      // Verificar se o usuário já respondeu a este tweet
      const existingReply = await prismaConnection.reply.findFirst({
        where: {
          userId,
          tweetId,
        },
      });

      if (existingReply) {
        return response.status(400).json({
          ok: false,
          message: "Você já respondeu a este tweet.",
        });
      }

      // Criação da resposta como um tweet do tipo REPLY
      const newReply = await prismaConnection.tweet.create({
        data: {
          content,
          type: "REPLY", // Setando o tipo como REPLY
          userId,
        },
      });

      // Criar relação de resposta
      await prismaConnection.reply.create({
        data: {
          userId,
          tweetId: tweetFound.id, // Referencia ao tweet original
        },
      });

      return response.status(201).json({
        ok: true,
        message: "Resposta cadastrada com sucesso",
        newReply: { content },
      });
    } catch (err) {
      return response.status(500).json({
        ok: false,
        message: `Ocorreu um erro inesperado. Erro:${(err as Error).name} - ${
          (err as Error).message
        }`,
      });
    }
  }

  public static async list(request: Request, response: Response) {
    try {
      const userId = request.body.userId;

      // Buscar todos os replies do usuário que está autenticado
      const replies = await prismaConnection.reply.findMany({
        where: {
          userId,
        },
        include: {
          tweet: {
            select: {
              content: true,
            },
          },
        },
      });

      return response.status(200).json({
        ok: true,
        message: "Replies listados com sucesso",
        replies,
      });
    } catch (err) {
      return response.status(500).json({
        ok: false,
        message: `Ocorreu um erro inesperado. Erro:${(err as Error).name} - ${
          (err as Error).message
        }`,
      });
    }
  }

  public static async delete(request: Request, response: Response) {
    try {
      const { replyId } = request.params;
      const userId = request.body.userId;

      // Verificar se o reply existe e se o usuário é o autor
      const replyFound = await prismaConnection.reply.findUnique({
        where: {
          id: replyId,
        },
      });

      if (!replyFound) {
        return response.status(404).json({
          ok: false,
          message: "Reply não encontrado",
        });
      }

      // validar que somente o usuário que fez o reply possa apagar o mesmo
      if (replyFound.userId !== userId) {
        return response.status(403).json({
          ok: false,
          message: "Você não tem permissão para deletar este reply",
        });
      }

      // Deletar o reply
      await prismaConnection.reply.delete({
        where: {
          id: replyId,
        },
      });

      return response.status(200).json({
        ok: true,
        message: "Reply deletado com sucesso",
      });
    } catch (err) {
      return response.status(500).json({
        ok: false,
        message: `Ocorreu um erro inesperado. Erro:${(err as Error).name} - ${
          (err as Error).message
        }`,
      });
    }
  }
}
