import { DataSource, EntityTarget, Repository } from "typeorm";
import { IOrder, Order } from "../entity/Order";
import { IUser } from "../entity/User";

export interface IOrderRepository {
  getOrderById: (id: string) => Promise<Order | null>;
  getOrderByStatus: (status: string) => Promise<Order | null>;
  createOrder: (user: IUser, order: any) => Promise<string>;
  updateOrder: (order: Partial<IOrder>) => Promise<string | null>;
}

class OrderRepository implements IOrderRepository {
  private repository!: Repository<Order>;

  constructor(dataSource: DataSource, order: EntityTarget<Order>) {
    this.repository = dataSource.getRepository(order);
  }

  async getOrderById(id: string) {
    const order = await this.repository.find({
      relations: ["carts"],
      where: { id: id },
    });

    if (order.length) {
      return order[0];
    }

    return null;
  }

  async getOrderByStatus(status: string) {
    const order = await this.repository.find({
      relations: ["carts"],
      where: { status: status },
    });

    if (order.length) {
      return order[0];
    }

    return null;
  }

  async createOrder(user: IUser, order: IOrder) {
    const newOrder = new Order();
    newOrder.status = order.status;
    newOrder.total = order.total;
    newOrder.user = user;
    await this.repository.save(newOrder);
    return newOrder.id!;
  }

  async updateOrder(order: Partial<IOrder>) {
    await this.repository.update(order.id!, order);
    return order.id!;
  }

  async deleteOrder(order: IOrder) {
    await this.repository.remove(order);
    return order.id!;
  }
}

export default OrderRepository;
