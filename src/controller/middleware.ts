import { Request, Response } from "express";
import AuthenticationService from "../service/authenticationService";
import ShoppingService from "../service/shoppingService";
import OrderService from "../service/orderService";
import CartService from "../service/cartService";
import { IOrder } from "../entity/Order";

export interface IMiddleware {
  check(req: Request, res: Response, next: any): void;
}

export class Middleware implements IMiddleware {
  constructor(
    private authenticationService: AuthenticationService,
    private shoppingService: ShoppingService,
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  private async bookMiddleware(req: Request, res: Response, next: any) {
    if (req.body.bookId) {
      const book = await this.shoppingService.getShoppingItemById(
        req.body.bookId
      );
      if (!book) return false;
      req.body.book = book;
    }

    return true;
  }

  private async cartMiddleware(req: Request, res: Response, next: any) {
    if (req.body.cartId) {
      const cart = await this.cartService.getCartById(req.body.cartId);
      if (!cart) return false;
      req.body.cart = cart;
      req.body.order = cart.order;
    }
    return true;
  }

  private async orderMiddleware(req: Request, res: Response, next: any) {
    const user = req.body.user;
    const orders = user.orders;
    const pendingOrderId = orders.find(
      (order: IOrder) => order.status === "pending"
    );
    let currentOrder = await this.orderService.getOrderById(pendingOrderId);
    if (!currentOrder) {
      const orderId = await this.orderService.createOrder(user, {
        status: "pending",
        total: 0,
        user: user,
      });
      if (!orderId) return false;
      currentOrder = await this.orderService.getOrderById(orderId);
    }
    req.body.currentOrder = currentOrder;

    if (req.body.orderId) {
      const order = await this.orderService.getOrderById(req.body.orderId);
      if (!order) return false;
      req.body.order = order;
    }
    return true;
  }

  private async userMiddleware(req: Request, res: Response, next: any) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return false;

    const user = await this.authenticationService.me(token);

    console.log("user", user);

    if (!user) return false;

    req.body.user = user;
    req.body.token = token;

    return true;
  }

  async check(req: Request, res: Response, next: any) {
    if (!(await this.userMiddleware(req, res, next))) {
      return res.status(401).send("Unauthorized");
    }
    if (!(await this.bookMiddleware(req, res, next))) {
      return res.status(404).send("Book not found");
    }
    if (!(await this.orderMiddleware(req, res, next))) {
      return res.status(500).send("Internal Server Error");
    }
    if (!(await this.cartMiddleware(req, res, next))) {
      return res.status(500).send("Internal Server Error");
    }

    next();
  }
}
