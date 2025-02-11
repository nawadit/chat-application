import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Like } from "typeorm";

export const searchUsers = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const query = req.query.searchFor;
  const data = await userRepository
    .createQueryBuilder("user")
    .select(["user.firstName", "user.lastName", "user.id", "user.email"])
    .where("user.firstName ILIKE :query", { query: `%${query}%` })
    .orWhere("user.lastName ILIKE :query", { query: `%${query}%` })
    .orWhere("user.email ILIKE :query", { query: `%${query}%` })
    .getMany();
  res.status(200).json(data);
};
