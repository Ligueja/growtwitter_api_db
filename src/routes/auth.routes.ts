import { Router } from "express";
import { LoginMiddleware } from "../middlewares/auth/login.middleware";
import { AuthController } from "../controllers/auth.controller";

export class authRoutes {
  public static execute(): Router {
    const router = Router();

    // definições de rotas:
    // rota de login e rota de logout:
    router.post("/login", [LoginMiddleware.validate], AuthController.Login);
    router.post("/logout", AuthController.logout);

    return router;
  }
}
