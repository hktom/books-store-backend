import { Request, Response } from "express";
import CartService from "../service/cartService";
import OrderService from "../service/orderService";
import { IOrder } from "../entity/Order";

export interface ICartController {
  getCart(req: Request, res: Response): void;
  addBookToCart(req: Request, res: Response): void;
  removeBookFromCart(req: Request, res: Response): void;
  updateCart(req: Request, res: Response): void;
}

class CartController implements ICartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  private async updateOrderTotal(order: IOrder) {
    const currentOrder = await this.orderService.getOrderById(order.id);
    const total = currentOrder?.carts.reduce(
      (acc, cart) => acc + cart.total,
      0
    );
    if (total) {
      order.total = total;
      await this.orderService.updateOrder(order);
    }
  }

  async getCart(req: Request, res: Response) {
    const cart = await this.cartService.getCartById(req.body.cart.id);
    res.json(cart);
  }

  async addBookToCart(req: Request, res: Response) {
    await this.cartService.upsertBookToCart(req.body.cart);
    await this.updateOrderTotal(req.body.cart.order);
    res.json({ message: "Book added to cart" });
  }

  async removeBookFromCart(req: Request, res: Response) {
    await this.cartService.removeBookFromCart(req.body.cart);
    await this.updateOrderTotal(req.body.cart.order);
    res.json({ message: "Book removed from cart" });
  }

  async updateCart(req: Request, res: Response) {
    await this.cartService.upsertBookToCart(req.body.cart);
    await this.updateOrderTotal(req.body.cart.order);
    res.json({ message: "Cart updated" });
  }
}

export default CartController;
