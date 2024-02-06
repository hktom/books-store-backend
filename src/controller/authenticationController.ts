import express, { Express, Request, Response } from "express";
import { IAuthenticationService } from "../service/authenticationService";

export interface IAuthenticationController {
  login(req: Request, res: Response): void;
  register(req: Request, res: Response): void;
  logout(req: Request, res: Response): void;
}

class AuthenticationController implements IAuthenticationController {
  constructor(private authenticationService: IAuthenticationService) {}

  async login(req: Request, res: Response) {
    res.send("login");
  }

  async register(req: Request, res: Response) {}

  async logout(req: Request, res: Response) {}
}

export default AuthenticationController;
