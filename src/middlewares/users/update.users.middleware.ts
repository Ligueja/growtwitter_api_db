import { NextFunction, Request, Response } from "express";

export class UpdateUsersMiddleware {
  public static validate(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { name } = request.body;

    if (!name || typeof name !== "string") {
      return response.status(400).json({
        ok: false,
        message: "Nome é obrigatório",
      });
    }
    return next();
  }
}
