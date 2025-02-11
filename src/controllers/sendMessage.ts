import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Message } from "../entity/Message";
import { User } from "../entity/User";

export const sendMessageController = async (req: Request, res: Response) => {
  const body = req.body;
  const messageRepository = AppDataSource.getRepository(Message);
  const userRepository = AppDataSource.getRepository(User);

  if (!body.senderId || !body.recieverId || !body.messageText) {
    console.log(body.recieverId + " is the reciever id.");
    console.log(body.senderId.id + " is the sender's id.");
    console.log(body.messageText + " is the message text.");
    res
      .status(400)
      .json({ errorMessage: "Bad request alksdflasd", errorCode: 400 });
  }

  const reciever = await userRepository.findOne({
    where: { id: body.recieverId },
  });

  if (reciever) {
    const message = new Message();
    message.messageText = body.messageText;
    message.senderId = body.senderId.id;
    message.receiverId = body.recieverId;
    message.timestamp = new Date();

    try {
      const data = await messageRepository.save(message);
      res.status(200).json({ data, code: 200 });
    } catch (err) {
      res
        .status(500)
        .json({ errorMessage: "Internal server error", errorCode: 500 });
    }
  }
};
