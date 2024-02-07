import { DataSource, EntityTarget, Repository } from "typeorm";
import { User } from "../entity/User";

export interface IUserRepository {
  getUsers(): Promise<any[]>;
  updateUserPoint(id: string, points: number): Promise<any>;
  getUserById(id: string): Promise<User | any>;
  getUserByEmail(email: string): Promise<User | any>;
  createUser(user: any): Promise<User>;
}

class UserRepository implements IUserRepository {
  private repository!: Repository<User>;

  constructor(dataSource: DataSource, user: EntityTarget<User>) {
    this.repository = dataSource.getRepository(user);
  }

  async getUsers() {
    return await this.repository.find();
  }

  async getUserByEmail(email: string) {
    const user = await this.repository.find({
      relations: ["orders"],
      where: { email: email },
    });

    if (user.length) {
      return user[0];
    }

    return null;
  }

  async getUserById(id: string) {
    const user = await this.repository.find({
      relations: ["orders"],
      where: { id: id },
    });

    if (user.length) {
      return user[0];
    }

    return null;
  }

  async createUser(payload: any) {
    const user = new User();
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.email = payload.email;
    user.password = payload.password;
    return await this.repository.save(user);
  }

  async updateUserPoint(id: string, points: number) {
    await this.repository.update(id, { points: points });
    return this.getUserById(id);
  }
}

export default UserRepository;
