import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import AppDataSource from "./config/AppDataSource";
import { bootstrap } from "./config/bootstrap";
import AuthenticationController from "./controller/authenticationController";
import { User } from "./entity/User";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.json());

const { authenticationService, orderService, shoppingService, jwtService } =
  bootstrap();

const authenticationController = new AuthenticationController(
  authenticationService
);

AppDataSource.initialize()
  .then(() => {
    console.log("[database]: Connection has been established successfully.");
  })
  .catch((error) => console.log(error));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/login", (req: Request, res: Response) => {
  // authenticationController.login(req, res);
  // AppDataSource.getRepository(User)
  //   .find()
  //   .then((users) => {
  //     console.log(users);
  //   });
  res.send("hello");
});
// app.post("/register", authenticationController.register);
// app.get("/logout", authenticationController.logout);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
