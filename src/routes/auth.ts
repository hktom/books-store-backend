import express, { Router } from "express";
import { Request, Response } from "express";
import AuthenticationController from "../controller/authenticationController";

import { authenticationService, middleware } from "../config/bootstrap";

const authenticationController = new AuthenticationController(
  authenticationService
);

export const authRouter = Router();

authRouter.post("/login", (req: Request, res: Response) =>
  authenticationController.login(req, res)
);

authRouter.post("/register", (req: Request, res: Response) =>
  authenticationController.register(req, res)
);

authRouter.get(
  "/me",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => authenticationController.me(req, res)
);

export default authRouter;
