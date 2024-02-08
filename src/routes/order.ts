import express, { Router } from "express";
import { Request, Response } from "express";
import OrderController from "../controller/orderController";
import {
  authenticationService,
  middleware,
  orderService,
} from "../config/bootstrap";

const orderController = new OrderController(
  orderService,
  authenticationService
);

export const orderRouter = Router();

orderRouter.get(
  "/orders",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => orderController.getOrders(req, res)
);

orderRouter.get(
  "/order/current",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => orderController.getCurrentOrder(req, res)
);

orderRouter.put(
  "/order/update",
  (req: Request, res: Response, next: any) => middleware.check(req, res, next),
  (req: Request, res: Response) => orderController.updateOrder(req, res)
);
