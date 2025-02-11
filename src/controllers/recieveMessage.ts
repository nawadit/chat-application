import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Message } from "../entity/Message";

export const recieveMessageController = async (req: Request, res: Response) => {
  const body = req.body;
  const senderId = body.senderId.id;
  const receiverId = body.receiverId;
  const messageRepository = AppDataSource.getRepository(Message);

  if (Object.keys(body).length != 2 || !body.receiverId || !body.senderId) {
    res.status(400).json({ errorMessage: "Bad request ", errorCode: 400 });
  }

  try {
    console.log(senderId + " is the sender's id and receiver's id is " + receiverId)
    const messages = await messageRepository
      .createQueryBuilder("message")
      .where(
        "(message.senderId = :senderId AND message.receiverId = :receiverId) OR (message.senderId = :receiverId AND message.receiverId = :senderId)",
        { senderId, receiverId }
      )
      .orderBy("message.timestamp", "ASC") // Optional: order messages by creation date
      .getMany();


    res.status(200).json(messages);
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: "Internal server error", errorCode: 500 });
  }
};
