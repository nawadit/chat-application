import express, { Request, Response } from "express";
import { decodeJWT } from "../middlewares/searchUsers/decodeJWT";
import { searchUsers } from "../controllers/searchUser";

const searchUserRotuer = express.Router();

searchUserRotuer.get("", decodeJWT, (req, res) => {
  console.log('request hit here')
  searchUsers(req,res);
});


export default searchUserRotuer;
