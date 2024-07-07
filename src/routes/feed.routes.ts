import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth/auth.middleware";
import { FeedController } from "../controllers/feed.controller";

export class feedRoutes {
  public static execute(): Router {
    const router = Router();

    //definicação de rotas:
    //rota para listar o feed do usuário autenticado:
    router.put("/", [AuthMiddleware.validate], FeedController.list);

    return router;
  }
}
