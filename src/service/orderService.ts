import { IBook } from "../entity/Book";
import { ICart } from "../entity/Cart";
import { IOrder, Order } from "../entity/Order";
import { IUser, User } from "../entity/User";
import { IBookRepository } from "../repository/BookRespository";
import { ICartRepository } from "../repository/CartRepository";
import { IOrderRepository } from "../repository/OrderRepository";
import { IUserRepository } from "../repository/UserRepository";

export interface IOrderService {
  getCartById(id: string): Promise<any>;
  createOrder(user: IUser, order: any): Promise<any>;
  addBookToOrder(bookId: IBook, order: Order, quantity: number): Promise<any>;
  removeBookFromOrder(id: string, bookId: string): Promise<any>;
  updateBookQuantity(user: IUser, cart: ICart, order: IOrder): Promise<any>;
  getOrderByStatus(user: IUser, status: string): Promise<any>;
  updateOrder(user: User, order: IOrder): Promise<any>;
}

class OrderService implements IOrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private cartRepository: ICartRepository
  ) {}

  async getCartById(id: string) {
    return await this.cartRepository.findCartById(id);
  }

  async getOrderByStatus(user: IUser, status: string = "pending") {
    const order = await this.orderRepository.getOrderByStatus(user, status);
    if (!order) return null;
    return order;
  }

  async updateOrder(user: User, order: IOrder) {
    return await this.orderRepository.updateOrder(user, order);
  }

  async createOrder(user: IUser, order: any) {
    return await this.orderRepository.createOrder(user, order);
  }

  async addBookToOrder(book: IBook, order: Order, quantity: number) {
    await this.cartRepository.createCart({
      quantity: 1,
      order: order,
      book: book,
    });

    return order;
  }

  async removeBookFromOrder(id: string) {
    return await this.cartRepository.deleteCart(id);
  }

  async updateBookQuantity(user: IUser, cart: ICart, order: IOrder) {
    await this.cartRepository.updateCart(cart.id, cart.quantity, cart.total);
    let carts = order!.carts
      .filter((curr) => cart.id !== curr.id)
      .map((curr) => ({ total: curr.total }));
    let total = carts.reduce((acc, cur) => acc + cur.total, 0);
    order.total = total;

    return order;
  }
}

export default OrderService;
