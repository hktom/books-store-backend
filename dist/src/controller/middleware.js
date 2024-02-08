"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
class Middleware {
    constructor(authenticationService, shoppingService, orderService, cartService) {
        this.authenticationService = authenticationService;
        this.shoppingService = shoppingService;
        this.orderService = orderService;
        this.cartService = cartService;
    }
    bookMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.bookId) {
                const book = yield this.shoppingService.getShoppingItemById(req.body.bookId);
                if (!book)
                    return false;
                req.body.book = book;
            }
            return true;
        });
    }
    cartMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.cartId) {
                const cart = yield this.cartService.getCartById(req.body.cartId);
                if (!cart)
                    return false;
                req.body.cart = cart;
                req.body.cart.total = Math.round(req.body.book.point * req.body.quantity);
                req.body.order = cart.order;
            }
            if (!req.body.cartId && req.body.quantity && req.body.bookId) {
                req.body.cart = {
                    bookId: req.body.book.id,
                    book: req.body.book,
                    quantity: req.body.quantity,
                    total: Math.round(req.body.book.point * req.body.quantity),
                    order: req.body.currentOrder,
                };
            }
            return true;
        });
    }
    orderMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body.user;
            const orders = user.orders;
            req.body.orders = orders;
            let currentOrder = orders.find((order) => order.status === "pending");
            if (currentOrder) {
                currentOrder = yield this.orderService.getOrderById(currentOrder.id);
            }
            else {
                const orderId = yield this.orderService.createOrder(user, {
                    status: "pending",
                    total: 0,
                    user: user,
                });
                if (!orderId)
                    return false;
                currentOrder = yield this.orderService.getOrderById(orderId);
            }
            req.body.currentOrder = currentOrder;
            if (req.body.orderId) {
                const order = yield this.orderService.getOrderById(req.body.orderId);
                if (!order)
                    return false;
                req.body.order = order;
            }
            return true;
        });
    }
    userMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            if (token == null)
                return false;
            const user = yield this.authenticationService.me(token);
            if (!user)
                return false;
            req.body.user = user;
            req.body.token = token;
            return true;
        });
    }
    check(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.userMiddleware(req, res, next))) {
                return res.status(401).send("Unauthorized");
            }
            if (!(yield this.bookMiddleware(req, res, next))) {
                return res.status(404).send("Book not found");
            }
            if (!(yield this.orderMiddleware(req, res, next))) {
                return res.status(500).send("Internal Server Error");
            }
            if (!(yield this.cartMiddleware(req, res, next))) {
                return res.status(500).send("Internal Server Error");
            }
            next();
        });
    }
}
exports.Middleware = Middleware;
