import { Request, Response } from "express";
import { prismaConnection } from "../database/prisma.connection";

export class LikesController {
  public static async create(request: Request, response: Response) {
    try {
      const { userId } = request.body;
      const { tweetId } = request.params;

      // verificar se o tweet referente ao id informado existe:
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
      // verificar se o usuário já curtiu o tweet, evitando esse usuário de curtir duas vezes o mesmo tweet:
      const likeFound = await prismaConnection.like.findFirst({
        where: {
          userId,
          tweetId: tweetId,
        },
      });

      if (likeFound) {
        return response.status(400).json({
          ok: false,
          message: "Usuário já curtiu este tweet",
        });
      }

      // criação do like:
      const like = await prismaConnection.like.create({
        data: {
          userId,
          tweetId: tweetId,
        },
      });

      return response.status(201).json({
        ok: true,
        message: "Like criado com sucesso",
        like,
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
      const { likeId } = request.params;
      const { userId } = request.body;

      // fazer consulta no BD para verifciar se o like referente ao ID informado existe:
      const likeFound = await prismaConnection.like.findUnique({
        where: {
          id: likeId,
        },
      });

      if (!likeFound) {
        return response.status(404).json({
          ok: false,
          message: "Like não encontrado",
        });
      }

      if (likeFound.userId !== userId) {
        return response.status(403).json({
          ok: false,
          message: "Usuário não autorizado a deletar este like",
        });
      }

      // Deletar o like
      await prismaConnection.like.delete({
        where: {
          id: likeId,
        },
      });

      return response.status(200).json({
        ok: true,
        message: "Like deletado com sucesso",
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
