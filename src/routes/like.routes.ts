import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth/auth.middleware";
import { LikesController } from "../controllers/likes.controller";

export class likeRoutes {
  public static execute(): Router {
    const router = Router();

    //definicação de rotas:
    // ambas as rotas são privadas e necessitam autenticação (token)
    //rota para criar um like e rota para deletar um like
    router.post(
      "/:tweetId",
      [AuthMiddleware.validate],

      LikesController.create
    );
    router.delete(
      "/:likeId",
      [AuthMiddleware.validate],
      LikesController.delete
    );

    return router;
  }
}
