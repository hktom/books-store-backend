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
const Cart_1 = require("../entity/Cart");
class CartRepository {
    constructor(dataSource, cart) {
        this.repository = dataSource.getRepository(cart);
    }
    getCartById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.repository.find({
                relations: ["order"],
                where: { id: id },
            });
            if (cart.length) {
                return cart[0];
            }
            return null;
        });
    }
    createCart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCart = new Cart_1.Cart();
            newCart.quantity = cart.quantity;
            newCart.total = cart.total;
            newCart.unitPrice = cart.book.point;
            newCart.bookCover = cart.book.cover;
            newCart.bookTitle = cart.book.title;
            newCart.bookId = cart.book.id;
            newCart.order = cart.order;
            yield this.repository.save(newCart);
            return newCart.id;
        });
    }
    updateCart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(cart.id, cart);
            return cart.id;
        });
    }
    deleteCart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.remove(cart);
            return cart.id;
        });
    }
}
exports.default = CartRepository;
