import { NextFunction, Request, Response } from "express";

export class CreateTweetMiddleware {
  public static validade(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { content } = request.body;

    if (!content || typeof content !== "string") {
      return response.status(400).json({
        ok: false,
        message: "É obrigatório passar um conteúdo para o tweet",
      });
    }
    return next();
  }
}
