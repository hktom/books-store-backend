"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../entity/User");
const Book_1 = require("../entity/Book");
const Order_1 = require("../entity/Order");
const Cart_1 = require("../entity/Cart");
dotenv_1.default.config();
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [User_1.User, Book_1.Book, Order_1.Order, Cart_1.Cart],
    subscribers: [],
    migrations: [],
});
exports.default = AppDataSource;
