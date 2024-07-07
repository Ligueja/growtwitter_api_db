import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth/auth.middleware";
import { CreateTweetMiddleware } from "../middlewares/tweets/create.tweets.middleware";
import { TweetsController } from "../controllers/tweets.controller";
import { UpdateTweetsMiddleware } from "../middlewares/tweets/update.tweets.middlewares";

export class tweetsRoutes {
  public static execute(): Router {
    const router = Router();

    //rota para cadastro de um tweet, somente se estiver logado:
    router.post(
      "/:userId",
      [AuthMiddleware.validate],
      [CreateTweetMiddleware.validade],
      TweetsController.create
    );
    //rota para listar tweets:
    router.get("/", TweetsController.list);
    //rota para exibir tweet específico através do ID:
    router.get("/:tweetId", TweetsController.get);
    //rota para atualizar tweet específico através do ID, somwente se estiver logado:
    router.put(
      "/:tweetId",
      [AuthMiddleware.validate],
      [UpdateTweetsMiddleware.validate],
      TweetsController.update
    );
    //rota para deletar tweet específico através do ID, somente se estiver logado:
    router.delete(
      "/:tweetId",
      [AuthMiddleware.validate],
      TweetsController.delete
    );

    return router;
  }
}
