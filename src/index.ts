import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { User } from "./entity/User";
import { AppDataSource } from "./data-source";
import { QueryFailedError } from "typeorm";
import signupRouter from "./routes/singup";

AppDataSource.initialize()
  .then(() => {
    console.log("AppDataSource Initialized.");
  })
  .catch((error) => {
    console.log(error);
  });

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/signup", signupRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
  const user = new User();
  user.firstName = "Nawadit";
  user.lastName = "Sharma";
  user.email = "nawadit@sharma.com";
  user.passwordHash = "sl;kdfa";

  try {
    await AppDataSource.manager.save(user);
  } catch (error) {
    if (error instanceof QueryFailedError) {
      console.error("Query Failed:", error); // Access specific properties
      console.error("SQL:", error.query); // Query that caused the error
      console.error("Parameters:", error.parameters); // Parameters passed to the query
    } else {
      console.error("Unexpected Error:", error);
    }
  }
});

app.listen(port, async () => {
  console.log(`[server]: Server is runnin at http://localhost:${port}`);
});
