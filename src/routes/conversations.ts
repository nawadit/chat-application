import { Router } from "express";
import { decodeJWT } from "../middlewares/searchUsers/decodeJWT";
import { conversationsController } from "../controllers/conversations";

export const conversationsRouter = Router();

conversationsRouter.get("/", decodeJWT, (req, res) => {
  conversationsController(req, res);
});
