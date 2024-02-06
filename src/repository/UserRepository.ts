import { DataSource, EntityTarget, Repository } from "typeorm";
import { User } from "../entity/user";

export interface IUserRepository {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | any>;
  createUser(user: any): Promise<User>;
  updateUser(id: string, payload: any): Promise<User | null>;
  deleteUser(id: string): Promise<User | null>;
}

class UserRepository implements IUserRepository {
  private repository!: Repository<User>;

  constructor(dataSource: DataSource, user: EntityTarget<User>) {
    this.repository = dataSource.getRepository(user);
  }

  async getUsers() {
    return await this.repository.find();
  }

  async getUserById(id: string) {
    return await this.repository.findOneBy({ id: id });
  }

  async createUser(payload: any) {
    const user = new User();
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.email = payload.email;
    user.password = payload.password;
    return await this.repository.save(user);
  }

  async updateUser(id: string, payload: any) {
    let user = await this.getUserById(id);
    if (user) {
      user.firstName = payload.firstName || user.firstName;
      user.lastName = payload.lastName || user.lastName;
      user.email = payload.email || user.email;
      user.password = payload.password || user.password;
      return await this.repository.save(user);
    }
    return null;
  }

  async deleteUser(id: string) {
    let user = await this.getUserById(id);
    if (user) {
      return await this.repository.remove(user);
    }
    return null;
  }
}

export default UserRepository;
