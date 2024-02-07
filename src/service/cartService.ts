import { Cart, ICart } from "../entity/Cart";
import { ICartRepository } from "../repository/CartRepository";

export interface ICartService {
  getCartById(id: string): Promise<ICart | null>;
  upsertBookToCart(cart: Partial<ICart>): Promise<string>;
  removeBookFromCart(cart: ICart): Promise<string | null>;
}

class CartService implements ICartService {
  constructor(private cartRepository: ICartRepository) {}

  async getCartById(id: string) {
    return await this.cartRepository.getCartById(id);
  }

  async upsertBookToCart(cart: Partial<ICart>) {
    if (cart.id) {
      await this.cartRepository.updateCart(cart);
    } else {
      await this.cartRepository.createCart(cart);
    }
    return "success";
  }

  async removeBookFromCart(cart: ICart) {
    return await this.cartRepository.deleteCart(cart);
  }
}

export default CartService;
