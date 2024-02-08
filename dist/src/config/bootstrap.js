"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.cartService = exports.shoppingService = exports.orderService = exports.authenticationService = exports.bootstrap = void 0;
const middleware_1 = require("../controller/middleware");
const Book_1 = require("../entity/Book");
const Cart_1 = require("../entity/Cart");
const Order_1 = require("../entity/Order");
const User_1 = require("../entity/User");
const BookRespository_1 = __importDefault(require("../repository/BookRespository"));
const CartRepository_1 = __importDefault(require("../repository/CartRepository"));
const OrderRepository_1 = __importDefault(require("../repository/OrderRepository"));
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const authenticationService_1 = __importDefault(require("../service/authenticationService"));
const cartService_1 = __importDefault(require("../service/cartService"));
const jwtService_1 = __importDefault(require("../service/jwtService"));
const orderService_1 = __importDefault(require("../service/orderService"));
const shoppingService_1 = __importDefault(require("../service/shoppingService"));
const AppDataSource_1 = __importDefault(require("./AppDataSource"));
const bootstrap = () => {
    const bookRepository = new BookRespository_1.default(AppDataSource_1.default, Book_1.Book);
    const userRepository = new UserRepository_1.default(AppDataSource_1.default, User_1.User);
    const orderRepository = new OrderRepository_1.default(AppDataSource_1.default, Order_1.Order);
    const cartRepository = new CartRepository_1.default(AppDataSource_1.default, Cart_1.Cart);
    const jwtService = new jwtService_1.default();
    const authenticationService = new authenticationService_1.default(userRepository, jwtService);
    const cartService = new cartService_1.default(cartRepository);
    const orderService = new orderService_1.default(orderRepository);
    const shoppingService = new shoppingService_1.default(bookRepository);
    return {
        cartService,
        authenticationService,
        orderService,
        shoppingService,
    };
};
exports.bootstrap = bootstrap;
_a = (0, exports.bootstrap)(), exports.authenticationService = _a.authenticationService, exports.orderService = _a.orderService, exports.shoppingService = _a.shoppingService, exports.cartService = _a.cartService;
exports.middleware = new middleware_1.Middleware(exports.authenticationService, exports.shoppingService, exports.orderService, exports.cartService);
