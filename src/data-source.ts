import { DataSource } from "typeorm";
import { Message } from "./entity/Message";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"chat_application_admin",
    password:"newpassword",
    database:"chat_application",
    synchronize: true,
    logging: true,
    entities:[User, Message],
    subscribers: [],
    migrations: [],
})