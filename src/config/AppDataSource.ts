import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entity/user";
import { Book } from "../entity/book";
import { Order } from "../entity/order";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Book, Order],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;