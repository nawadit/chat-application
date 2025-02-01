import express, { Request, Response } from "express";
import signup from "../controllers/singup";


const signupRouter = express.Router();

signupRouter.post("/", (req: Request, res: Response) => signup(req, res));

export default signupRouter;
