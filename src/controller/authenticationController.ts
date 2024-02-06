import express, { Express, Request, Response } from "express";
import AuthenticationService, {
  IAuthenticationService,
} from "../service/authenticationService";

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

    try {
      const token = await this.authenticationService.login(email, password);
      if (!token) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ token });
    } catch (error) {
      console.log(error);
      res.send("An error occurred");
    }
  }

  async register(req: Request, res: Response) {}

  async logout(req: Request, res: Response) {}
}

export default AuthenticationController;
