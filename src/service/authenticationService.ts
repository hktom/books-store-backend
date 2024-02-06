import { IUserRepository } from "../repository/UserRepository";
import { IJwtService } from "./jwtService";

export interface IAuthenticationService {
  login(email: string, password: string): Promise<string | null>;
  register(user: any): Promise<string>;
  logout(token: string): Promise<void>;
}

class AuthenticationService implements IAuthenticationService {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: IJwtService
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (user && user.password === password) {
      return this.jwtService.generateToken(user.id);
    }
    return null;
  }

  async register(user: any) {
    await this.userRepository.createUser(user);
    return "Registration successful";
  }

  async logout(token: string) {
    // remove token from session
  }
}

export default AuthenticationService;
