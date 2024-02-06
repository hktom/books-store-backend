import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import AppDataSource from "./config/AppDataSource";
import { bootstrap } from "./config/bootstrap";
import AuthenticationController from "./controller/authenticationController";
import BookController from "./controller/bookController";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("[database]: Connection has been established successfully.");
  })
  .catch((error) => console.error(error));

const { authenticationService, orderService, shoppingService, jwtService } =
  bootstrap();

const authenticationController = new AuthenticationController(
  authenticationService
);

const bookController = new BookController(shoppingService);

app.get("/books", (req: Request, res: Response) => bookController.getBooks(req, res));
app.get("/book/:id", (req: Request, res: Response) => bookController.getBookById(req, res));
app.post("/book/create", (req: Request, res: Response) => bookController.createBook(req, res));

app.post("/login", (req: Request, res: Response) => authenticationController.login(req, res));
app.post("/register", (req: Request, res: Response)=> authenticationController.register(req, res));
app.get("/logout", (req: Request, res: Response) => authenticationController.logout(req, res));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
