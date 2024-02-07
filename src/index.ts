import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import AppDataSource from "./config/AppDataSource";
import { bootstrap } from "./config/bootstrap";
import AuthenticationController from "./controller/authenticationController";
import BookController from "./controller/bookController";
import OrderController from "./controller/orderController";
import cors from "cors";
import CartController from "./controller/cartControler";
import { Middleware } from "./controller/middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

AppDataSource.initialize()
  .then(() => {
    console.log("[database]: Connection has been established successfully.");
  })
  .catch((error) => console.error(error));

const { authenticationService, orderService, shoppingService, cartService } =
  bootstrap();

const authenticationController = new AuthenticationController(
  authenticationService
);

const bookController = new BookController(shoppingService);
const orderController = new OrderController(orderService);
const cartController = new CartController(cartService);
const middleware = new Middleware(
  authenticationService,
  shoppingService,
  orderService,
  cartService
);

// book route
app.get("/books", (req: Request, res: Response) =>
  bookController.getBooks(req, res)
);
app.get("/book/:id", (req: Request, res: Response) =>
  bookController.getBookById(req, res)
);
app.post("/book/create", (req: Request, res: Response) =>
  bookController.createBook(req, res)
);

// order route
app.get(
  "/orders",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => orderController.getOrders(req, res)
);

app.get(
  "/order/current",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => orderController.getCurrentOrder(req, res)
);

app.put(
  "/order/update",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => orderController.updateOrder(req, res)
);

// cart route
app.post(
  "/cart/create",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => cartController.addBookToCart(req, res)
);

app.get(
  "/cart/remove",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => cartController.removeBookFromCart(req, res)
);
app.get(
  "/cart/update",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => cartController.updateCart(req, res)
);

// user route
app.get(
  "/me",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => authenticationController.me(req, res)
);

app.post("/login", (req: Request, res: Response) =>
  authenticationController.login(req, res)
);
app.post("/register", (req: Request, res: Response) =>
  authenticationController.register(req, res)
);
app.get("/logout", (req: Request, res: Response) =>
  authenticationController.logout(req, res)
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
