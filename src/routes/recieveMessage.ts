import { Request, Response, Router } from "express";
import { decodeJWT } from "../middlewares/searchUsers/decodeJWT";
import { recieveMessageController } from "../controllers/recieveMessage";

export const recieveMessagesRouter = Router();

recieveMessagesRouter.get("/", decodeJWT, (req: Request, res: Response) => {
  recieveMessageController(req, res);
});
