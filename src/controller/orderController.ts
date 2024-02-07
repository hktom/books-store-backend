import { Request, Response } from "express";
import OrderService from "../service/orderService";
import { IOrder } from "../entity/Order";
import AuthenticationService from "../service/authenticationService";

export interface IOrderController {
  getOrders(req: Request, res: Response): void;
  getCurrentOrder(req: Request, res: Response): void;
  updateOrder(req: Request, res: Response): void;
}

class OrderController implements IOrderController {
  constructor(
    private orderService: OrderService,
    private userService: AuthenticationService
  ) {}

  async getOrders(req: Request, res: Response) {
    res.json(req.body.user.orders);
  }

  async getCurrentOrder(req: Request, res: Response) {
    const order = req.body.currentOrder;
    res.json(order);
  }

  async updateOrder(req: Request, res: Response) {
    const user = req.body.user;
    const order = req.body.order;

    if (order.status === "purchased") {
      user.points = user.points - order.total;
    }

    if (order.status === "purchased" && user.points < 0) {
      return res.status(400).json({ message: "Not enough points" });
    }

    if (req.body.order.status === "cancelled") {
      user.points = user.points + order.total;
    }

    const update = await this.orderService.updateOrder(order);
    await this.userService.updaterUser(user);
    res.json(update);
  }
}

export default OrderController;
