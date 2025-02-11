import { NextFunction, Request, Response } from "express";

export const requestObjectStructureVerification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    Object.keys(req.body).length == 2 &&
    req.body.email &&
    req.body.password
  ) {
    next();
  } else {
    res.status(400).json({ errorMessage: "Bad request.", errorCode: 400 });
  }
};
