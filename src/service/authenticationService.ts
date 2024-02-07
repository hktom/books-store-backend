import { IUser } from "../entity/User";
import { IUserRepository } from "../repository/UserRepository";
import { IJwtService } from "./jwtService";

export interface IAuthenticationService {
  me(token: string): Promise<IUser | null>;
  login(email: string, password: string): Promise<string | null>;
  register(user: Partial<IUser>): Promise<string | null>;
  logout(token: string): Promise<void>;
  updaterUser(user: Partial<IUser>): Promise<IUser | null>;
}

class AuthenticationService implements IAuthenticationService {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: IJwtService
  ) {}

  async me(token: string) {
    const userId = this.jwtService.verifyToken(token);
    if (!userId) {
      return null;
    }
    return await this.userRepository.getUserById(userId);
  }

  async updaterUser(user: Partial<IUser>) {
    return this.userRepository.updateProfile(user);
  }

  private async getUserByEmail(email: string) {
    return this.userRepository.getUserByEmail(email);
  }

  async login(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (user && user.password === password) {
      return this.jwtService.generateToken(user.id);
    }
    return null;
  }

  async register(payload: Partial<IUser>) {
    let user = await this.getUserByEmail(payload.email!);
    if (user) {
      return null;
    }
    user = await this.userRepository.createUser(payload);
    if (!user) {
      return null;
    }

    return this.login(user.email, user.password);
  }

  async logout(token: string) {
    // remove token from session
  }
}

export default AuthenticationService;
