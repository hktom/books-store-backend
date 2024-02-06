import { IUserRepository } from "../repository/UserRepository";

export interface IAuthenticationService {
  login(email: string, password: string): Promise<string>;
  register(user: any): Promise<string>;
  logout(token: string): Promise<void>;
}

class AuthenticationService implements IAuthenticationService {
  constructor(private userRepository: IUserRepository) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (user && user.password === password) {
      return "Login successful";
    }
    return "Login failed";
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