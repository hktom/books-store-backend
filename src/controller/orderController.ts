import { Request, Response } from "express";
import OrderService from "../service/orderService";
import { IOrder } from "../entity/Order";

export interface IOrderController {
  getOrders(req: Request, res: Response): void;
  getCurrentOrder(req: Request, res: Response): void;
  updateOrder(req: Request, res: Response): void;
}

class OrderController implements IOrderController {
  constructor(private orderService: OrderService) {}

  async getOrders(req: Request, res: Response) {
    res.json(req.body.user.orders);
  }

  async getCurrentOrder(req: Request, res: Response) {
    const order = req.body.orders.find(
      (order: IOrder) => order.status === "pending"
    );
    res.json(order);
  }

  async updateOrder(req: Request, res: Response) {
    const order = await this.orderService.updateOrder(req.body.order);
    res.json(order);
  }
}

export default OrderController;
