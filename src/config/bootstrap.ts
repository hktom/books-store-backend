import { Middleware } from "../controller/middleware";
import { Book } from "../entity/Book";
import { Cart } from "../entity/Cart";
import { Order } from "../entity/Order";
import { User } from "../entity/User";
import BookRepository from "../repository/BookRespository";
import CartRepository from "../repository/CartRepository";
import OrderRepository from "../repository/OrderRepository";
import UserRepository from "../repository/UserRepository";
import AuthenticationService from "../service/authenticationService";
import CartService from "../service/cartService";
import JwtService from "../service/jwtService";
import OrderService from "../service/orderService";
import ShoppingService from "../service/shoppingService";
import AppDataSource from "./AppDataSource";

export interface IBootstrap {
  authenticationService: AuthenticationService;
  orderService: OrderService;
  cartService: CartService;
  shoppingService: ShoppingService;
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

  const cartService = new CartService(cartRepository);
  const orderService = new OrderService(orderRepository);
  const shoppingService = new ShoppingService(bookRepository);

  return {
    cartService,
    authenticationService,
    orderService,
    shoppingService,
  };
};

export const {
  authenticationService,
  orderService,
  shoppingService,
  cartService,
} = bootstrap();

export const middleware = new Middleware(
  authenticationService,
  shoppingService,
  orderService,
  cartService
);
