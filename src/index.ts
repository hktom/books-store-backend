import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import AppDataSource from "./config/AppDataSource";
import { bootstrap } from "./config/bootstrap";
import AuthenticationController from "./controller/authenticationController";
import BookController from "./controller/bookController";
import OrderController from "./controller/orderController";

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
const orderController = new OrderController(orderService, authenticationService);

app.get("/books", (req: Request, res: Response) => bookController.getBooks(req, res));
app.get("/book/:id", (req: Request, res: Response) => bookController.getBookById(req, res));
app.post("/book/create", (req: Request, res: Response) => bookController.createBook(req, res));

app.get("/orders", (req: Request, res: Response, next: any) => orderController.getUser(req, res, next), (req: Request, res: Response) => orderController.getOrders(req, res));
app.get("/orders/addBook/:id", (req: Request, res: Response, next: any) => orderController.getUser(req, res, next), (req: Request, res: Response) => orderController.addBookToOrder(req, res));
app.get("/orders/removeBook/:id", (req: Request, res: Response, next: any) => orderController.getUser(req, res, next), (req: Request, res: Response) => orderController.removeBookFromOrder(req, res));
app.get("/orders/updateQuantity", (req: Request, res: Response, next: any) => orderController.getUser(req, res, next), (req: Request, res: Response) => orderController.updateBookQuantity(req, res));
app.get("/orders/updateOrder", (req: Request, res: Response, next: any) => orderController.getUser(req, res, next), (req: Request, res: Response) => orderController.updateOrder(req, res));

app.post("/login", (req: Request, res: Response) => authenticationController.login(req, res));
app.post("/register", (req: Request, res: Response)=> authenticationController.register(req, res));
app.get("/logout", (req: Request, res: Response) => authenticationController.logout(req, res));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
