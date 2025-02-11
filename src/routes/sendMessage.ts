import express, { Request, Response } from "express";
import { decodeJWT } from "../middlewares/searchUsers/decodeJWT";
import { sendMessageController } from "../controllers/sendMessage";

const sendMessageRouter = express.Router();

sendMessageRouter.post("/", decodeJWT, (req: Request, res: Response) => {
  sendMessageController(req, res);
});
// create a controller

export default sendMessageRouter;
