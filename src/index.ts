import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { User } from "./entity/User";
import { AppDataSource } from "./data-source";
import { QueryFailedError } from "typeorm";
import signupRouter from "./routes/singup";
import loginRouter from "./routes/login";
import searchUserRotuer from "./routes/searchUser";
import http from "http";
import sendMessageRouter from "./routes/sendMessage";
import { recieveMessagesRouter } from "./routes/recieveMessage";
import { conversationsRouter } from "./routes/conversations";

//connecting to database.
AppDataSource.initialize()
  .then(() => {
    console.log("AppDataSource Initialized.");
  })
  .catch((error) => {
    console.log(error);
  });

//loading .env variables
dotenv.config();

//creating application
const app: Express = express();
const port = process.env.PORT || 3000;

// Create HTTP server for Express and WebSocket
const server = http.createServer(app);

// Initialize Socket.IO

//middleware to parse json body object
app.use(express.json());

//routers for specific addresses
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/searchUser", searchUserRotuer);
app.use("/sendMessage", sendMessageRouter);
app.use("/recieveMessage", recieveMessagesRouter)
app.use("/conversations", conversationsRouter )
// route handler to get all id of people someone has prior conversations with

//route handler handeling the requests to the homepage
app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

//starting the server
app.listen(port, async () => {
  console.log(`[server]: Server is runnin at http://localhost:${port}`);
});
