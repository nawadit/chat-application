import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Message } from "../entity/Message";
import { User } from "../entity/User";

export const conversationsController = async (req: Request, res: Response) => {
  const messageRepository = AppDataSource.getRepository(Message);
  const userRepository = AppDataSource.getRepository(User);

  // Validate `senderId`
  if (!req.body.senderId || !req.body.senderId.id) {
    return res.status(400).json({ errorMessage: "Invalid senderId." });
  }

  const userId = req.body.senderId.id;

  try {
    // Get distinct conversation partners
    const conversationWith = await messageRepository
      .createQueryBuilder("message")
      .select(
        "DISTINCT CASE " +
          "WHEN message.senderId = :userId THEN message.receiverId " +
          "WHEN message.receiverId = :userId THEN message.senderId " +
          "END",
        "contactId"
      )
      .where("message.senderId = :userId OR message.receiverId = :userId", {
        userId,
      })
      .getRawMany();

    const contacts = conversationWith.map((contact) => contact.contactId);

    // If no contacts, return an empty array
    if (contacts.length === 0) {
      return res.status(200).json([]);
    }

    // Fetch user details for the contacts
    const users = await userRepository
      .createQueryBuilder("user")
      .select(["user.id", "user.firstName", "user.lastName"])
      .where("user.id IN (:...contacts)", { contacts })
      .getMany();

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching conversations:", err);
    res.status(500).json({ errorMessage: "Internal server error.", errorCode: 500 });
  }
};
