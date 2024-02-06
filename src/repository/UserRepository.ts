import { DataSource, EntityTarget, Repository } from "typeorm";
import { User } from "../entity/User";

export interface IUserRepository {
  getUsers(): Promise<User[]>;
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
    return await this.repository.findOneBy({ email: email });
  }

  async createUser(payload: any) {
    const user = new User();
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.email = payload.email;
    user.password = payload.password;
    return await this.repository.save(user);
  }
}

export default UserRepository;
