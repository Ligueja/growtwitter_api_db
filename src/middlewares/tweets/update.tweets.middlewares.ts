import { NextFunction, Request, Response } from "express";

export class UpdateTweetsMiddleware {
  public static validate(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { content } = request.body;

    if (!content || typeof content !== "string") {
      return response.status(400).json({
        ok: false,
        message: "Ter conteúdo é obrigatório",
      });
    }
    return next();
  }
}
