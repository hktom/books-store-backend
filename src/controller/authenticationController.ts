import express, { Express, Request, Response } from "express";
import AuthenticationService, {
  IAuthenticationService,
} from "../service/authenticationService";
import { IUser } from "../entity/User";

export interface IAuthenticationController {
  login(req: Request, res: Response): void;
  register(req: Request, res: Response): void;
  logout(req: Request, res: Response): void;
}

class AuthenticationController implements IAuthenticationController {
  constructor(private authenticationService: IAuthenticationService) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (!/@/g.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const token = await this.authenticationService.login(email, password);
    if (!token) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ token });
  }

  async register(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body as Partial<IUser>;

    if (!/@/g.test(email!)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: "Email, password, first name and last name are required",
      });
    }

    const token = await this.authenticationService.register({
      email,
      password,
      firstName,
      lastName,
    });

    if (!token) {
      return res.status(400).json({ message: "User already exists" });
    }

    res.json({ token });
  }

  async logout(req: Request, res: Response) {}
}

export default AuthenticationController;
