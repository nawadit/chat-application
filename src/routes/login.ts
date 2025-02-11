import express, { Request, Response } from "express";
import { login } from "../controllers/login";
import {emailVerification as loginEmailStructureVerification} from "../middlewares/login/emailStructure";
import { requestObjectStructureVerification } from "../middlewares/login/requestObjectStructure";

const loginRouter = express.Router();

loginRouter.post("/",requestObjectStructureVerification, loginEmailStructureVerification, (req: Request, res: Response) => login(req, res));



export default loginRouter;
