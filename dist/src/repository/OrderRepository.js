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
const Order_1 = require("../entity/Order");
class OrderRepository {
    constructor(dataSource, order) {
        this.repository = dataSource.getRepository(order);
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.repository.find({
                relations: ["carts"],
                where: { id: id },
            });
            if (order.length) {
                return order[0];
            }
            return null;
        });
    }
    getOrderByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.repository.find({
                relations: ["carts"],
                where: { status: status },
            });
            if (order.length) {
                return order[0];
            }
            return null;
        });
    }
    createOrder(user, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOrder = new Order_1.Order();
            newOrder.status = order.status;
            newOrder.total = order.total;
            newOrder.user = user;
            yield this.repository.save(newOrder);
            return newOrder.id;
        });
    }
    updateOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(order.id, order);
            return order.id;
        });
    }
    deleteOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.remove(order);
            return order.id;
        });
    }
}
exports.default = OrderRepository;
