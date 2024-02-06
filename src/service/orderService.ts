import { IOrderRepository } from "../repository/OrderRepository";

export interface IOrderService {
  createOrder(order: any): Promise<any>;
  updateOrder(id: string, status: string): Promise<any>;
  addBookToOrder(id: string, bookId: string): Promise<any>;
  removeBookFromOrder(id: string, bookId: string): Promise<any>;
  updateBookQuantity(
    id: string,
    bookId: string,
    quantity: number
  ): Promise<any>;
  deleteOrder(id: string): Promise<any>;
}

class OrderService implements IOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async createOrder(order: any) {
    return await this.orderRepository.createOrder(order);
  }

  async updateOrder(id: string, status: string) {
    return await this.orderRepository.updateOrder(id, status);
  }

  async addBookToOrder(id: string, bookId: string) {
    // return await this.orderRepository.addBookToOrder(id, bookId);
  }

  async removeBookFromOrder(id: string, bookId: string) {
    // return await this.orderRepository.removeBookFromOrder(id, bookId);
  }

  async updateBookQuantity(id: string, bookId: string, quantity: number) {
    // return await this.orderRepository.updateBookQuantity(id, bookId, quantity);
  }

  async deleteOrder(id: string) {
    return await this.orderRepository.deleteOrder(id);
  }
}
