import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const JWT_SECRET: string | null = process.env.JWT_SECRET ?? "thisisthesecret";

//verify and extract JWT token and place payload to req.body

export const decodeJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log("request was here too")
  const recievedJWT: string | null = req.headers.authorization?.split(" ")[1]?? null;
  console.log(recievedJWT)

  if (recievedJWT == null) {
    console.log("Bad request: Missing JWT token.");
    res.status(400).json({ errorMessage: "Bad request", errorCode: 400 });
  } else if (recievedJWT && JWT_SECRET) {
    try {
      console.log("Control has reached the try block.")
      const decode = jwt.verify(recievedJWT, JWT_SECRET);
      req.body.JWTPayload = decode;
      next();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        res.status(400).json({
          errorMessage: "Unable to verify JWT token.",
          errorCode: 400,
        });
      }
    }
  }else{
    console.log("Couldn't get the JWT_SECRET")
    res.status(500).json({errorMessage:"Internal server error", errorCode:"500"})
  }
};
