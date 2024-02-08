import "reflect-metadata"
import { DataSource } from "typeorm"
import {ToDo} from "./entity/ToDo";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "",
    database: "onboarding",
    synchronize: true,
    logging: true,
    entities: [ToDo],
    migrations: [],
    subscribers: [],
})
