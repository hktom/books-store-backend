import express, { Router } from "express";
import { Request, Response } from "express";
import { cartService, middleware, orderService } from "../config/bootstrap";
import CartController from "../controller/cartControler";

const cartController = new CartController(cartService, orderService);
export const cartRouter = Router();

cartRouter.post(
  "/cart/create",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => cartController.addBookToCart(req, res)
);

cartRouter.put(
  "/cart/update",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => cartController.updateCart(req, res)
);

cartRouter.post(
  "/cart/remove",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => cartController.removeBookFromCart(req, res)
);
