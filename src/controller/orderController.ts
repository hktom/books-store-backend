import { Request, Response } from "express";
import OrderService from "../service/orderService";
import AuthenticationService from "../service/authenticationService";

export interface IOrderController {
  getUser(req: Request, res: Response, next: any): void;
  getOrders(req: Request, res: Response): void;
  updateOrder(req: Request, res: Response): void;
  addBookToOrder(req: Request, res: Response): void;
  removeBookFromOrder(req: Request, res: Response): void;
  updateBookQuantity(req: Request, res: Response): void;
}

class OrderController implements IOrderController {
  constructor(
    private orderService: OrderService,
    private authenticationService: AuthenticationService
  ) {}

  async getUser(req: Request, res: Response, next: any) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    const user = await this.authenticationService.me(token);

    if (!user) return res.sendStatus(401);

    req.body.user = user;

    next();
  }

  async getOrders(req: Request, res: Response) {
    res.json(req.body.user.orders);
  }

  async addBookToOrder(req: Request, res: Response) {
    const { id } = req.params;
    const { bookId } = req.body;
    const order = this.orderService.addBookToOrder(bookId);
    res.json(order);
  }

  async removeBookFromOrder(req: Request, res: Response) {
    const { id } = req.params;
    const { bookId } = req.body;
    const order = this.orderService.removeBookFromOrder(id, bookId);
    res.json(order);
  }

  async updateBookQuantity(req: Request, res: Response) {
    const { id } = req.params;
    const { bookId, quantity } = req.body;
    const order = this.orderService.updateBookQuantity(id, bookId, quantity);
    res.json(order);
  }

  async updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    const order = this.orderService.updateOrder(id, req.body.status);
    if (order) return res.json(order);
    res.sendStatus(404);
  }
}

export default OrderController;
