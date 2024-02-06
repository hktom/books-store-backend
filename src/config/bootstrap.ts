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
import OrderService from "../service/orderService";
import ShoppingService from "../service/shoppingService";
import AppDataSource from "./AppDataSource";

const bookRepository = new BookRepository(AppDataSource, Book);
const userRepository = new UserRepository(AppDataSource, User);
const orderRepository = new OrderRepository(AppDataSource, Order);
const cartRepository = new CartRepository(AppDataSource, Cart);

const authenticationService = new AuthenticationService(userRepository);
const orderService = new OrderService(orderRepository);
const shoppingService = new ShoppingService(bookRepository);

export const authenticationController = new AuthenticationController(
  authenticationService
);
