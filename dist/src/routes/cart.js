"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const bootstrap_1 = require("../config/bootstrap");
const cartControler_1 = __importDefault(require("../controller/cartControler"));
const cartController = new cartControler_1.default(bootstrap_1.cartService, bootstrap_1.orderService);
exports.cartRouter = (0, express_1.Router)();
exports.cartRouter.post("/cart/create", (req, res, next) => bootstrap_1.middleware.check(req, res, next), (req, res) => cartController.addBookToCart(req, res));
exports.cartRouter.put("/cart/update", (req, res, next) => bootstrap_1.middleware.check(req, res, next), (req, res) => cartController.updateCart(req, res));
exports.cartRouter.post("/cart/remove", (req, res, next) => bootstrap_1.middleware.check(req, res, next), (req, res) => cartController.removeBookFromCart(req, res));
