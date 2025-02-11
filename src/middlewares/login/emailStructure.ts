import { NextFunction, Request, Response } from "express";
import { validateEmailStructure } from "../../utils/emailverification";

export const emailVerification = (req: Request, res: Response, next: NextFunction) => {
  if (validateEmailStructure(req.body.email)) {
    next();
  } else {
    res.send(400).json({
      errorMessage: "Bad request, unacceptable email. ",
      errorCode: 400,
    });
  }
};

