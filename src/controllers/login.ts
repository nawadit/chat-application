import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { generateJWT } from "../utils/generateJWT";

const userRepo = AppDataSource.getRepository(User);
const saltRounds = process.env.SALT_ROUNDS || 10;

export const login = async (req: Request, res: Response) => {
  const user = await userRepo.findOne({
    where: { email: req.body.email },
  });
  if (!user) {
    res.status(404).json({ errorMessage: "No user found", errorCode: 404 });
  } else {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );
    if (passwordMatch) {
      let payload: object = {
        id: user.id,
      };

      const token = generateJWT(payload, 60 * 60 * 24 * 15);
      if (token instanceof Error) {
        res
          .status(500)
          .json({ errorMessage: "Error creating token.", errorCode: 500 });
      } else {
        res.status(200).json({id:user.id, name:user.firstName +" "+  user.lastName, token });
      }
    } else {
      res
        .status(404)
        .json({ errorMessage: "Incorrect Password", errorCode: 404 });
    }
  }
};
