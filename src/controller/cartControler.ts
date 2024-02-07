import { Request, Response } from "express";
import CartService from "../service/cartService";

export interface ICartController {
  getCart(req: Request, res: Response): void;
  addBookToCart(req: Request, res: Response): void;
  removeBookFromCart(req: Request, res: Response): void;
  updateCart(req: Request, res: Response): void;
}

class CartController implements ICartController {
  constructor(private cartService: CartService) {}

  async getCart(req: Request, res: Response) {
    const cart = await this.cartService.getCartById(req.body.cart.id);
    res.json(cart);
  }

  async addBookToCart(req: Request, res: Response) {
    await this.cartService.upsertBookToCart(req.body.cart);
    res.json({ message: "Book added to cart" });
  }

  async removeBookFromCart(req: Request, res: Response) {
    await this.cartService.removeBookFromCart(req.body.cart);
    res.json({ message: "Book removed from cart" });
  }

  async updateCart(req: Request, res: Response) {
    await this.cartService.upsertBookToCart(req.body.cart);
    res.json({ message: "Cart updated" });
  }
}

export default CartController;
