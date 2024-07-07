import { Router } from "express";
import { CreateUsersMiddleware } from "../middlewares/users/create.users.middleware";
import { UsersController } from "../controllers/users.controller";
import { UpdateUsersMiddleware } from "../middlewares/users/update.users.middleware";

export class usersRoutes {
  public static execute(): Router {
    const router = Router();

    // definições de rotas para users:

    //rota para cadastro de usuário:
    router.post("/", [CreateUsersMiddleware.validate], UsersController.create);
    //rota para listar usuários cadastrados:
    router.get("/", UsersController.list);
    //rota para exibir usuário específico através do ID:
    router.get("/:userId", UsersController.get);
    //rota para atualizar usuário específico através do ID:
    router.put(
      "/:userId",
      [UpdateUsersMiddleware.validate],
      UsersController.update
    );
    //rota para deletar usuário específico através do ID:
    router.delete("/:userId", UsersController.delete);

    return router;
  }
}
