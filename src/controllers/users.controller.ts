import { Request, Response } from "express";
import { prismaConnection } from "../database/prisma.connection";

export class UsersController {
  public static async create(request: Request, response: Response) {
    try {
      // captura dos dados do body "inputs do usuário":
      const { name, email, username, password } = request.body;

      //Verificação se já existe e-mail
      const existingEmail = await prismaConnection.user.findUnique({
        where: {
          emailAddress: email,
        },
      });

      if (existingEmail) {
        return response.status(400).json({
          ok: false,
          message: "E-mail já cadastrado",
        });
      }

      // verificação se já existe o username:
      const existingUser = await prismaConnection.user.findUnique({
        where: {
          username: username,
        },
      });

      if (existingUser) {
        return response.status(400).json({
          ok: false,
          message: "Esse username já está sendo usado, tente outro",
        });
      }

      //código para salvar dados no BD:
      const newUser = await prismaConnection.user.create({
        data: {
          name,
          emailAddress: email,
          username,
          password,
        },
      });

      return response.status(201).json({
        ok: true,
        message: "Usuário cadastrado com sucesso",
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

      const users = await prismaConnection.user.findMany({
        skip: limitDefault * (pageDefault - 1),
        take: limitDefault,
        orderBy: {
          name: "asc",
        },
        where: {
          deleted: false,
        },
      });

      const totalUsers = users.length;

      return response.status(200).json({
        ok: true,
        message: "Abaixo lista de usuários cadastrados:",
        users: users,
        pagination: {
          limit: limitDefault,
          page: pageDefault,
          count: totalUsers,
          totalPages: Math.ceil(totalUsers / limitDefault),
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
      const { userId } = request.params;

      const userFound = await prismaConnection.user.findUnique({
        where: {
          id: userId,
          deleted: false,
        },
      });

      if (!userFound) {
        return response.status(404).json({
          ok: false,
          message: "Usuário não localizado em nosso Banco de Dados",
        });
      }

      return response.status(201).json({
        ok: true,
        message: `Usuário localizado com sucesso`,
        user: userFound,
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
      const { userId } = request.params;
      const { name } = request.body;

      const userFound = await prismaConnection.user.findUnique({
        where: {
          id: userId,
          deleted: false,
        },
      });

      if (!userFound) {
        return response.status(404).json({
          ok: false,
          message: "Usuário não localizado em nosso Banco de Dados",
        });
      }

      const userUpdate = await prismaConnection.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          updatedAt: new Date(),
        },
      });

      return response.status(201).json({
        ok: true,
        message: `Usuário atualizado com sucesso`,
        user: userUpdate,
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
      const { userId } = request.params;

      const userFound = await prismaConnection.user.findUnique({
        where: {
          id: userId,
          deleted: false,
        },
      });

      if (!userFound) {
        return response.status(404).json({
          ok: false,
          message: "Usuário não localizado em nosso Banco de Dados",
        });
      }

      const userDeleted = await prismaConnection.user.update({
        where: {
          id: userId,
          deleted: false,
        },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      });

      return response.status(200).json({
        ok: true,
        message: "Usuário deletado com sucesso",
        userDeleted,
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
