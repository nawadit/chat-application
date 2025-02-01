import { Request, Response } from "express";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { AppDataSource } from "../data-source";
import { QueryFailedError } from "typeorm";
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

interface requestObject {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

//function to validate email structure
const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const signup = async (req: Request, res: Response) => {
  //res.send("still working on it");

  //checkin if request object is of correct stcture
  if (
    Object.keys(req.body).length != 4 ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).json({
      errorMessage: "Bad request object. ",
      errorCode: 400,
    });
  }

  console.log(Object.keys(req.body + " is the length of the request object. "));

  //validating email structure
  const body: requestObject = req.body;
  if (!validateEmail(body.email)) {
    res.status(400).json({
      errorMessage: "Invalid email.",
      errorCode: 400,
    });
  }

  //creating new user for the database
  const user = new User();
  user.firstName = body.firstName;
  user.lastName = body.lastName;
  user.email = body.email;
  user.passwordHash = await bcrypt.hash(body.password, saltRounds);

  //trying to save the new user information to the database
  try {
    await AppDataSource.manager.save(user);
    res.status(200).json({ status: "New user created.", userId : user.id });
  } catch (err) {
    console.log(`Error saving user with ${body.email} as email to database. `);
    if (err instanceof QueryFailedError) {
    }
    res.status(500).json({ errorMessage: "Internal error", errorCode: 500 });
  }

};

export default signup;
