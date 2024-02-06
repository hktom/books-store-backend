import { IBook } from "../entity/Book";
import { IBookRepository } from "../repository/BookRespository";

export interface IShoppingService {
  getShoppingList(page: number): Promise<any>;
  getShoppingItemById(id: string): Promise<any>;
  createShoppingItem(payload: Partial<IBook>): Promise<any>;
  updateShoppingItem(id: string, payload: any): Promise<any>;
  deleteShoppingItem(id: string): Promise<any>;
}

class ShoppingService implements IShoppingService {
  constructor(private bookRepository: IBookRepository) {}

  async getShoppingList(page: number) {
    let books = await this.bookRepository.getBooks();
    return books.slice((page - 1) * 10, page * 10);
  }

  async getShoppingItemById(id: string) {
    return await this.bookRepository.getBookById(id);
  }

  async createShoppingItem(payload: Partial<IBook>) {
    return await this.bookRepository.createBook(payload);
  }

  async updateShoppingItem(id: string, payload: any) {
    return await this.bookRepository.updateBook(id, payload);
  }

  async deleteShoppingItem(id: string) {
    return await this.bookRepository.deleteBook(id);
  }
}

export default ShoppingService;
