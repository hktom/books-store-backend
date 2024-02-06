import { DataSource, EntityTarget, Repository } from "typeorm";
import { Cart, ICart } from "../entity/Cart";
import { Book } from "../entity/Book";
import { Order } from "../entity/Order";

export interface ICartRepository {
  createCart: (cart: ICart, book: Book, order: Order) => Promise<ICart>;
  updateCart: (
    id: string,
    quantity: number,
    total: number
  ) => Promise<ICart | null>;
  deleteCart: (id: string) => Promise<ICart | null>;
}

class CartRepository implements ICartRepository {
  private repository!: Repository<Cart>;

  constructor(dataSource: DataSource, cart: EntityTarget<Cart>) {
    this.repository = dataSource.getRepository(cart);
  }

  private async findCartById(id: string) {
    return await this.repository.findOneBy({ id: id });
  }

  async createCart(cart: ICart) {
    const newCart = new Cart();
    newCart.quantity = cart.quantity;
    newCart.total = cart.total;
    newCart.book = cart.book;
    newCart.order = cart.order;

    return await this.repository.save(newCart);
  }

  async updateCart(id: string, number: number, total: number) {
    const cart = await this.findCartById(id);
    if (cart) {
      cart.quantity = number || cart.quantity;
      cart.total = total || cart.total;
      return await this.repository.save(cart);
    }
    return null;
  }

  async deleteCart(id: string) {
    const cart = await this.findCartById(id);
    if (cart) {
      return await this.repository.remove(cart);
    }
    return null;
  }
}

export default CartRepository;
