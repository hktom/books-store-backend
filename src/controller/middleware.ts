import { Request, Response } from "express";
import AuthenticationService from "../service/authenticationService";
import ShoppingService from "../service/shoppingService";
import OrderService from "../service/orderService";

export interface IMiddleware {
  getUser(req: Request, res: Response, next: any): void;
}

export class Middleware implements IMiddleware {
  constructor(
    private authenticationService: AuthenticationService,
    private shoppingService: ShoppingService,
    private orderService: OrderService
  ) {}

  async getUser(req: Request, res: Response, next: any) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    const user = await this.authenticationService.me(token);

    if (!user) return res.sendStatus(401);

    req.body.user = user;
    req.body.token = token;

    if (req.body.bookId) {
      const book = await this.shoppingService.getShoppingItemById(
        req.body.bookId
      );
      if (!book) return res.status(404);
      req.body.book = book;
    }

    if (req.body.cartId) {
      const cart = await this.orderService.getCartById(req.body.cartId);
      if (!cart) return res.status(404);
      req.body.cart = cart;
      req.body.order = cart.order;
    }

    const currentOrder = await this.orderService.getOrderByStatus(
      user,
      "pending"
    );
    if (!currentOrder) {
      const order = await this.orderService.createOrder(user, {
        status: "pending",
        total: 0,
        user: user,
      });
      req.body.currentOrder = order;
    } else {
      req.body.currentOrder = currentOrder;
    }

    if (req.body.orderId) {
      const order = await this.orderService.get(
        user,
        req.body.orderId
      );
      if (!order) return res.status(404);
      req.body.order = order;
    }

    next();
  }
}
