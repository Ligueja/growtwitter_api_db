import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth/auth.middleware";
import { ReplysController } from "../controllers/replys.controller";

export class replyRoutes {
  public static execute(): Router {
    const router = Router();

    // definição de rotas:
    // ambas as rotas são privadas e necessitam autenticação (token)
    //rotas para criar, listar, atualizar e deletar um Reply:

    router.post(
      "/:tweetId",
      [AuthMiddleware.validate],
      ReplysController.create
    );
    router.get("/", [AuthMiddleware.validate], ReplysController.list);
    // router.put("/:replyId", [AuthMiddleware.validate], ReplysController.update);
    router.delete(
      "/:replyId",
      [AuthMiddleware.validate],
      ReplysController.delete
    );

    return router;
  }
}
