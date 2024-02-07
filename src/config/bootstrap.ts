import AuthenticationController from "../controller/authenticationController";
import { Book } from "../entity/Book";
import { Cart } from "../entity/Cart";
import { Order } from "../entity/Order";
import { User } from "../entity/User";
import BookRepository from "../repository/BookRespository";
import CartRepository from "../repository/CartRepository";
import OrderRepository from "../repository/OrderRepository";
import UserRepository from "../repository/UserRepository";
import AuthenticationService from "../service/authenticationService";
import JwtService from "../service/jwtService";
import OrderService from "../service/orderService";
import ShoppingService from "../service/shoppingService";
import AppDataSource from "./AppDataSource";

// export const bootstrap = (req: Request, res: Response, next: any) => {};

export interface IBootstrap {
  authenticationService: AuthenticationService;
  orderService: OrderService;
  shoppingService: ShoppingService;
  jwtService: JwtService;
}

export const bootstrap = (): IBootstrap => {
  const bookRepository = new BookRepository(AppDataSource, Book);
  const userRepository = new UserRepository(AppDataSource, User);
  const orderRepository = new OrderRepository(AppDataSource, Order);
  const cartRepository = new CartRepository(AppDataSource, Cart);
  const jwtService = new JwtService();

  const authenticationService = new AuthenticationService(
    userRepository,
    jwtService
  );

  const orderService = new OrderService(
    orderRepository,
    cartRepository,
    bookRepository,
    userRepository
  );
  const shoppingService = new ShoppingService(bookRepository);

  return {
    jwtService,
    authenticationService,
    orderService,
    shoppingService,
  };
};
