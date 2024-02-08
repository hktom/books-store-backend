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
class CartController {
    constructor(cartService, orderService) {
        this.cartService = cartService;
        this.orderService = orderService;
    }
    updateOrderTotal(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentOrder = yield this.orderService.getOrderById(order.id);
            const total = currentOrder === null || currentOrder === void 0 ? void 0 : currentOrder.carts.reduce((acc, cart) => acc + cart.total, 0);
            if (total) {
                order.total = total;
                const { id } = order;
                yield this.orderService.updateOrder({ id, total });
            }
        });
    }
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartService.getCartById(req.body.cart.id);
            res.json(cart);
        });
    }
    addBookToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, quantity, book, total, order } = req.body.cart;
            yield this.cartService.upsertBookToCart({ id, quantity, book, total, order });
            yield this.updateOrderTotal(req.body.cart.order);
            res.json({ message: "Book added to cart" });
        });
    }
    removeBookFromCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cartService.removeBookFromCart(req.body.cart);
            yield this.updateOrderTotal(req.body.cart.order);
            res.json({ message: "Book removed from cart" });
        });
    }
    updateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cartService.upsertBookToCart(req.body.cart);
            yield this.updateOrderTotal(req.body.cart.order);
            res.json({ message: "Cart updated" });
        });
    }
}
exports.default = CartController;
