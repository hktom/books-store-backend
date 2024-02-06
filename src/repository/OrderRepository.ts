import { DataSource, EntityTarget, Repository } from "typeorm";
import { IOrder, Order } from "../entity/Order";

export interface IOrderRepository {
  getOrders: () => Promise<Order[]>;
  getOrderById: (id: string) => Promise<Order | null>;
  createOrder: (order: any) => Promise<Order>;
  updateOrder: (id: string, status: string) => Promise<Order | null>;
  deleteOrder: (id: string) => Promise<Order | null>;
}

class OrderRepository implements IOrderRepository {
  private repository!: Repository<Order>;

  constructor(dataSource: DataSource, order: EntityTarget<Order>) {
    this.repository = dataSource.getRepository(order);
  }

  async getOrders() {
    return [];
  }

  async getOrderById(id: string) {
    return await this.repository.findOneBy({ id: id });
  }

  async createOrder(order: IOrder) {
    const newOrder = new Order();
    newOrder.status = order.status;
    newOrder.total = order.total;
    newOrder.user = order.user;
    return await this.repository.save(newOrder);
  }

  async updateOrder(id: string, status: string) {
    const order = await this.getOrderById(id);
    if (order) {
      order.status = status;
      return await this.repository.save(order);
    }
    return null;
  }

  async deleteOrder(id: string) {
    const order = await this.getOrderById(id);
    if (order) {
      return await this.repository.remove(order);
    }
    return null;
  }
}

export default OrderRepository;
