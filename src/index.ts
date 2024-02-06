import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import AppDataSource from "./config/AppDataSource";
import BookRepository from "./repository/BookRespository";
import { Book } from "./entity/Book";
import { authenticationController } from "./config/bootstrap";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));

AppDataSource.initialize()
  .then(() => {
    console.log("[database]: Connection has been established successfully.");
  })
  .catch((error) => console.log(error));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/login", authenticationController.login);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
