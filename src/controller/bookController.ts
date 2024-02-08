import { Request, Response } from "express";
import { IBook } from "../entity/Book";
import { IShoppingService } from "../service/shoppingService";

export interface IBookController {
  createBook(req: Request, res: Response): void;
  getBooks(req: Request, res: Response): void;
  getBookById(req: Request, res: Response): void;
  findBookByTitle(req: Request, res: Response): void;
}

class BookController implements IBookController {
  constructor(private ShoppingService: IShoppingService) {}

  async createBook(req: Request, res: Response) {
    const { title, cover, point, writer, tags } = req.body as Partial<IBook>;
    if (!title || !cover || !point || !writer || !tags)
      return res.status(400).send("Invalid input");

    const book = await this.ShoppingService.createShoppingItem({
      title,
      cover,
      point,
      writer,
      tags,
    });

    if (book) return res.status(201).send("Book created successfully");
    return res.status(500).send("Internal server error");
  }

  async findBookByTitle(req: Request, res: Response) {
    const title = req.query.title as string;
    if (!title) return res.status(400).send("Title is required");
    const book = await this.ShoppingService.findBookByTitle(title);
    if (book) return res.status(200).json(book);
    return res.status(404).send("Book not found");
  }

  async getBooks(req: Request, res: Response) {
    const page: number = req?.query?.page ? +req.query.page : 1;
    const books = await this.ShoppingService.getShoppingList(page);
    return res.status(200).json(books);
  }

  async getBookById(req: Request, res: Response) {
    const id = req.params.id ?? "";
    if (!id) return res.status(400).send("Book id is required");

    const book = await this.ShoppingService.getShoppingItemById(id);
    if (book) return res.status(200).json(book);
    return res.status(404).send("Book not found");
  }
}

export default BookController;
