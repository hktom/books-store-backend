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
class OrderController {
    constructor(orderService, userService) {
        this.orderService = orderService;
        this.userService = userService;
    }
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(req.body.user.orders);
        });
    }
    getCurrentOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = req.body.currentOrder;
            res.json(order);
        });
    }
    updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body.user;
            const order = req.body.order;
            order.status = req.body.status;
            if (order.status !== "cancelled" && order.status !== "purchased") {
                return res.status(400).json({ message: "bad status" });
            }
            if (order.status === "purchased") {
                user.points = user.points - order.total;
            }
            if (order.status === "purchased" && user.points < 0) {
                return res.status(400).json({ message: "Not enough points" });
            }
            if (req.body.order.status === "cancelled") {
                user.points = user.points + order.total;
            }
            const update = yield this.orderService.updateOrder({
                id: order.id,
                status: order.status,
            });
            yield this.userService.updaterUser({ id: user.id, points: user.points });
            res.json(update);
        });
    }
}
exports.default = OrderController;
