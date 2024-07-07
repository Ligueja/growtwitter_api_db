import { Request, Response } from "express";
import { prismaConnection } from "../database/prisma.connection";

export class FeedController {
  public static async list(request: Request, response: Response) {
    try {
      let { limit, page } = request.query;
      const userId = request.body.userId;

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
          userId, // mostrar apenas feed do usuário cujo o authToken é passado no header.
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
          Like: true,
          Reply: {
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
        message: `Abaixo o feed do usuário:`,
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
}
