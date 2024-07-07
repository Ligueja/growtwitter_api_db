import { Request, Response } from "express";
import { prismaConnection } from "../database/prisma.connection";

export class TweetsController {
  public static async create(request: Request, response: Response) {
    try {
      const { content, type } = request.body;
      const { userId } = request.params;

      const authenticatedUserId = request.body.userId;
      if (userId !== authenticatedUserId) {
        return response.status(403).json({
          ok: false,
          message:
            "Você não tem permissão para criar esse um tweet em nome de outro usuário.",
        });
      }
      // verificar se o usuário referente ao id informado existe:
      const userFound = await prismaConnection.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userFound) {
        return response.status(404).json({
          ok: false,
          message: "Usuário não encontrado",
        });
      }

      // criação do tweet
      const newTweet = await prismaConnection.tweet.create({
        data: {
          content,
          type: type || "TWEET", // se não informar nenhum tipo, manter o default "tweet"
          userId,
        },
      });

      return response.status(201).json({
        ok: true,
        message: "Tweet cadastrado com sucesso",
        newTweet,
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
      let { limit, page } = request.query;

      let limitDefault = 5;
      let pageDefault = 1;

      if (limit) {
        limitDefault = Number(limit);
      }

      if (page) {
        pageDefault = Number(page);
      }

      const tweets = await prismaConnection.tweet.findMany({
        skip: limitDefault * (pageDefault - 1),
        take: limitDefault,
        where: {
          type: "TWEET",
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              username: true,
            },
          },
          Like: {
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });

      const totalTweets = tweets.length;

      return response.status(200).json({
        ok: true,
        message: "Abaixo lista de tweets postados:",
        tweets: tweets,
        pagination: {
          limit: limitDefault,
          page: pageDefault,
          count: totalTweets,
          totalPages: Math.ceil(totalTweets / limitDefault),
        },
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

  public static async get(request: Request, response: Response) {
    try {
      const { tweetId } = request.params;

      const tweetFound = await prismaConnection.tweet.findUnique({
        where: {
          id: tweetId,
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
          Like: {
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });

      if (!tweetFound) {
        return response.status(404).json({
          ok: false,
          message: "Tweet não encontrado",
        });
      }

      return response.status(200).json({
        ok: true,
        message: "Tweet encontrado",
        tweet: tweetFound,
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

  public static async update(request: Request, response: Response) {
    try {
      const { tweetId } = request.params;
      const { content, userId } = request.body;

      // verificar se o tweet existe e se o mesmo pertence ao usuário autenticado(logado)
      const tweetFound = await prismaConnection.tweet.findUnique({
        where: { id: tweetId },
        select: { userId: true },
      });

      if (!tweetFound) {
        return response.status(404).json({
          ok: false,
          message: "Tweet não encontrado",
        });
      }

      if (tweetFound.userId !== userId) {
        return response.status(403).json({
          ok: false,
          message: "Usuário não autorizado a atualizar este tweet",
        });
      }

      // logica para atualizar o tweet:
      const tweetUpdated = await prismaConnection.tweet.update({
        where: {
          id: tweetId,
        },
        data: {
          content: content,
        },
      });

      return response.status(200).json({
        ok: true,
        message: "Tweet atualizado com sucesso",
        tweetUpdated,
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
      const { tweetId } = request.params;
      const { userId } = request.body;

      // Verificar se o tweet existe e se pertence ao usuário autenticado/logado:
      const tweetFound = await prismaConnection.tweet.findUnique({
        where: { id: tweetId },
        select: { userId: true },
      });

      if (!tweetFound) {
        return response.status(404).json({
          ok: false,
          message: "Tweet não encontrado",
        });
      }

      if (tweetFound.userId !== userId) {
        return response.status(403).json({
          ok: false,
          message: "Usuário não autorizado a deletar este tweet",
        });
      }

      // lógica para deletar o tweet:
      await prismaConnection.tweet.delete({
        where: { id: tweetId },
      });

      return response.status(200).json({
        ok: true,
        message: "Tweet deletado com sucesso",
      });
    } catch (err) {
      return response.status(500).json({
        ok: false,
        message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
          (err as Error).message
        }`,
      });
    }
  }
}
