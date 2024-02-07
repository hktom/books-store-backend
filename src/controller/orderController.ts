import { Request, Response } from "express";
import OrderService from "../service/orderService";
import { IOrder } from "../entity/Order";
import { IShoppingService } from "../service/shoppingService";

export interface IOrderController {
  getOrders(req: Request, res: Response): void;
  createOrder(req: Request, res: Response): void;
  updateOrder(req: Request, res: Response): void;
  addBookToOrder(req: Request, res: Response): void;
  removeBookFromOrder(req: Request, res: Response): void;
  updateBookQuantity(req: Request, res: Response): void;
  placeOrder(req: Request, res: Response): void;
  getCurrentOrder(req: Request, res: Response): void;
}

class OrderController implements IOrderController {
  constructor(
    private orderService: OrderService,
    private bookService: IShoppingService
  ) {}

  async getOrders(req: Request, res: Response) {
    res.json(req.body.user.orders);
  }

  async getCurrentOrder(req: Request, res: Response) {
    const order = req.body.currentOrder;
    res.json(order);
  }

  async addBookToOrder(req: Request, res: Response) {
    const { book, currentOrder, quantity } = req.body;

    currentOrder.total += Math.round(book.price * quantity);

    await this.orderService.addBookToOrder(book, currentOrder, quantity);
    await this.orderService.updateOrder(req.body.user, currentOrder);

    res.json({ message: "Book added to order" });
  }

  async removeBookFromOrder(req: Request, res: Response) {
    const { cart, currentOrder } = req.body;
    const order = await this.orderService.removeBookFromOrder(cart.id);
    currentOrder.total -= cart.total;

    await this.orderService.updateOrder(req.body.user, currentOrder);
    res.json({ message: "Book removed from order" });
  }

  async updateBookQuantity(req: Request, res: Response) {
    const { book, quantity, cart } = req.body;
    cart.quantity = quantity;
    cart.total = Math.round(book.price * quantity);
    const order = this.orderService.updateBookQuantity(
      req.body.user,
      cart,
      req.body.currentOrder
    );
    res.json(order);
  }

  async updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    const order = this.orderService.updateOrder(id, req.body.status);
    if (order) return res.json(order);
    res.sendStatus(404);
  }

  async placeOrder(req: Request, res: Response) {
    const message = this.orderService.purchaseOrder(req.body.user);
    res.json({ message });
  }
}

export default OrderController;
