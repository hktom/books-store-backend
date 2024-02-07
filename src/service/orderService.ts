import { IOrder, Order } from "../entity/Order";
import { IUser, User } from "../entity/User";
import { IOrderRepository } from "../repository/OrderRepository";

export interface IOrderService {
  getOrderById(id: string): Promise<Order | null>;
  getOrderByStatus(status: string): Promise<any>;
  createOrder(user: IUser, order: any): Promise<any>;
  updateOrder(order: IOrder): Promise<any>;
}

class OrderService implements IOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async getOrderById(id: string) {
    return await this.orderRepository.getOrderById(id);
  }

  async getOrderByStatus(status: string) {
    const order = await this.orderRepository.getOrderByStatus(status);
    if (!order) return null;
    return order;
  }

  async updateOrder(order: IOrder) {
    return await this.orderRepository.updateOrder(order);
  }

  async createOrder(user: IUser, order: any) {
    return await this.orderRepository.createOrder(user, order);
  }
}

export default OrderService;
