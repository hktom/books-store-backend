"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const orderController_1 = __importDefault(require("../controller/orderController"));
const bootstrap_1 = require("../config/bootstrap");
const orderController = new orderController_1.default(bootstrap_1.orderService, bootstrap_1.authenticationService);
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.get("/orders", (req, res, next) => bootstrap_1.middleware.check(req, res, next), (req, res) => orderController.getOrders(req, res));
exports.orderRouter.get("/order/current", (req, res, next) => bootstrap_1.middleware.check(req, res, next), (req, res) => orderController.getCurrentOrder(req, res));
exports.orderRouter.put("/order/update", (req, res, next) => bootstrap_1.middleware.check(req, res, next), (req, res) => orderController.updateOrder(req, res));
