import { IBookRepository } from "../repository/BookRespository";

export interface IShoppingService {
  getShoppingList(): Promise<any>;
  getShoppingItemById(id: string): Promise<any>;
  createShoppingItem(payload: any): Promise<any>;
  updateShoppingItem(id: string, payload: any): Promise<any>;
  deleteShoppingItem(id: string): Promise<any>;
}

class ShoppingService implements IShoppingService {
  constructor(private bookRepository: IBookRepository) {}

  async getShoppingList() {
    return await this.bookRepository.getBooks();
  }

  async getShoppingItemById(id: string) {
    return await this.bookRepository.getBookById(id);
  }

  async createShoppingItem(payload: any) {
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
