import { DataSource, EntityTarget, Repository } from "typeorm";
import { Cart, ICart } from "../entity/Cart";

export interface ICartRepository {
  getCartById: (id: string) => Promise<ICart | null>;
  createCart: (cart: Partial<ICart>) => Promise<string>;
  updateCart: (cart: Partial<ICart>) => Promise<string | null>;
  deleteCart: (cart: ICart) => Promise<string | null>;
}

class CartRepository implements ICartRepository {
  private repository!: Repository<Cart>;

  constructor(dataSource: DataSource, cart: EntityTarget<Cart>) {
    this.repository = dataSource.getRepository(cart);
  }

  async getCartById(id: string) {
    const cart = await this.repository.find({
      relations: ["order"],
      where: { id: id },
    });
    if (cart.length) {
      return cart[0];
    }
    return null;
  }

  async createCart(cart: Partial<ICart>) {
    const newCart = new Cart();
    newCart.quantity = cart.quantity!;
    newCart.total = cart.total!;
    newCart.unitPrice = cart.book!.point!;
    newCart.book = cart.book!;
    newCart.order = cart.order!;
    await this.repository.save(newCart);
    return newCart.id!;
  }

  async updateCart(cart: Partial<ICart>) {
    await this.repository.update(cart.id!, cart);
    return cart.id!;
  }

  async deleteCart(cart: Cart) {
    await this.repository.remove(cart);
    return cart.id;
  }
}

export default CartRepository;
