import express, { Router } from "express";
import { Request, Response } from "express";

import BookController from "../controller/bookController";
import { shoppingService } from "../config/bootstrap";

const bookController = new BookController(shoppingService);

export const bookRouter = Router();

bookRouter.get("/books", (req: Request, res: Response) =>
  bookController.getBooks(req, res)
);
bookRouter.get("/book/:id", (req: Request, res: Response) =>
  bookController.getBookById(req, res)
);
bookRouter.post("/book/create", (req: Request, res: Response) =>
  bookController.createBook(req, res)
);
