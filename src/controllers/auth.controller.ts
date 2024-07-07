import { Request, Response } from "express";
import { prismaConnection } from "../database/prisma.connection";
import { randomUUID } from "crypto";

export class AuthController {
  public static async Login(request: Request, response: Response) {
    try {
      const { email, passsword } = request.body;

      //buscar usuário com o e-mail e senha informados no corpo da requisição:
      const userFound = await prismaConnection.user.findUnique({
        where: {
          emailAddress: email,
          password: passsword,
        },
      });

      // se não localizar o e-mail e/ou senha:
      if (!userFound) {
        return response.status(401).json({
          ok: false,
          message: "Credenciais inválidas",
        });
      }

      //verificar se o usuário já está logado (se já possui atuthToken)
      if (userFound.authToken) {
        return response.status(401).json({
          ok: false,
          message: "O usuário já está logado",
        });
      }

      // geração do authToken
      const authToken = randomUUID();

      await prismaConnection.user.update({
        where: { id: userFound.id },
        data: { authToken },
      });

      return response.status(201).json({
        ok: true,
        message: "Usuário autenticado",
        authToken,
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

  public static async logout(requeste: Request, response: Response) {
    try {
      const headers = requeste.headers;

      if (!headers.authorization) {
        return response.status(401).json({
          ok: false,
          message: "Token é obrigatório",
        });
      }

      //fazer atualização e retirar authToken do usuário:
      await prismaConnection.user.updateMany({
        where: {
          authToken: headers.authorization,
        },
        data: { authToken: null },
      });

      return response.status(200).json({
        ok: true,
        message: "Logout realizado com sucesso",
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
