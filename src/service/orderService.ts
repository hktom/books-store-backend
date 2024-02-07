import { IOrder } from "../entity/Order";
import { IUser, User } from "../entity/User";
import { IBookRepository } from "../repository/BookRespository";
import { ICartRepository } from "../repository/CartRepository";
import { IOrderRepository } from "../repository/OrderRepository";
import { IUserRepository } from "../repository/UserRepository";

export interface IOrderService {
  createOrder(order: any): Promise<any>;
  updateOrder(id: string, status: string): Promise<any>;
  addBookToOrder(bookId: string): Promise<any>;
  removeBookFromOrder(id: string, bookId: string): Promise<any>;
  updateBookQuantity(
    id: string,
    bookId: string,
    quantity: number
  ): Promise<any>;
  deleteOrder(id: string): Promise<any>;
  purchaseOrder(user: IUser): Promise<any>;
  declineOrder(user: IUser, id: string): Promise<any>;
}

class OrderService implements IOrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private cartRepository: ICartRepository,
    private bookRepository: IBookRepository,
    private userRepository: IUserRepository
  ) {}

  private async getBookById(bookId: string) {
    const book = await this.bookRepository.getBookById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }

  private async getOrderByStatus() {
    const order = await this.orderRepository.getOrderByStatus("pending");
    if (!order) new Error("Order not found");

    return order;
  }

  async purchaseOrder(user: IUser) {
    const order = await this.getOrderByStatus();
    const me = user;
    if (me.points < order!.total) return "Insufficient points";

    me.points -= order!.total;

    await this.orderRepository.updateOrder(order!.id, "purchased");
    await this.userRepository.updateUserPoint(me.id, me.points);
    return "Order purchased successfully";
  }

  async declineOrder(user: IUser, id: string) {
    const order = await this.orderRepository.getOrderById(id);
    if (!order) return new Error("Order not found");
    const me = user;
    me.points += order!.total;

    await this.orderRepository.updateOrder(order!.id, "declined");
    await this.userRepository.updateUserPoint(me.id, me.points);
    return "Order declined successfully";
  }

  async createOrder(order: any) {
    return await this.orderRepository.createOrder(order);
  }

  async updateOrder(id: string, status: string) {
    return await this.orderRepository.updateOrder(id, status);
  }

  async addBookToOrder(bookId: string) {
    const book = await this.getBookById(bookId);

    let order = await this.orderRepository.getOrderByStatus("pending");
    if (!order) {
      order = await this.createOrder({ status: "pending", total: book.point });
    }
    await this.cartRepository.createCart({
      quantity: 1,
      order: order,
      book: book,
    });
    await this.orderRepository.getOrderByStatus("pending");
  }

  async removeBookFromOrder(id: string, bookId: string) {
    const book = await this.getBookById(bookId);
    const cart = await this.cartRepository.deleteCart(id);
    if (!cart) return null;

    let order = cart.order;

    await this.orderRepository.updateOrder(
      order.id,
      "pending",
      order.total - book.point
    );

    return await this.orderRepository.getOrderByStatus("pending");
  }

  async updateBookQuantity(id: string, bookId: string, quantity: number) {
    const book = await this.getBookById(bookId);
    let order = await this.removeBookFromOrder(id, bookId);
    if (!order) return null;
    const cart = await this.cartRepository.createCart({
      quantity: quantity,
      order: order,
      book: book,
    });
    order = await this.getOrderByStatus();
    let carts = order!.carts.map((cart) => ({ total: cart.total }));
    let total = carts.reduce((acc, cur) => acc + cur.total, 0);

    return await this.orderRepository.updateOrder(order!.id, "pending", total);
  }

  async deleteOrder(id: string) {
    return await this.orderRepository.deleteOrder(id);
  }
}

export default OrderService;
