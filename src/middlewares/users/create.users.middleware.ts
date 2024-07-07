import { NextFunction, Request, Response } from "express";

export class CreateUsersMiddleware {
  public static validate(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { name, email, username, password } = request.body;

    if (!name || typeof name !== "string") {
      return response.status(400).json({
        ok: false,
        message: "Nome é obrigatório",
      });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return response.status(400).json({
        ok: false,
        message: "Informe um e-mail válido",
      });
    }

    if (!username || typeof username !== "string") {
      return response.status(400).json({
        ok: false,
        message: "Username é obrigatório",
      });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return response.status(400).json({
        ok: false,
        message: "Informe uma senha com no mínimo 6 caracteres",
      });
    }
    return next();
  }
}
