import { DataSource, EntityTarget, Repository } from "typeorm";
import { Book, IBook } from "../entity/Book";

export interface IBookRepository {
  getBooks(): Promise<any>;
  getBookById(id: string): Promise<any>;
  createBook(book: IBook): Promise<any>;
  updateBook(id: string, payload: Partial<IBook>): Promise<any>;
  deleteBook(id: string): Promise<any>;
}

class BookRepository implements IBookRepository {
  private repository!: Repository<Book>;

  constructor(dataSource: DataSource, book: EntityTarget<Book>) {
    this.repository = dataSource.getRepository(book);
  }

  async getBooks() {
    return await this.repository.find();
  }

  async getBookById(id: string) {
    return await this.repository.findOneBy({ id: id });
  }

  async createBook(payload: IBook) {
    const book = new Book();
    book.title = payload.title;
    book.writer = payload.writer;
    book.point = payload.point;
    book.cover = payload.cover;
    book.tags = payload.tags;
    return await this.repository.save(book);
  }

  async updateBook(id: string, payload: Partial<IBook>) {
    let book = await this.getBookById(id);
    if (book) {
      book.title = payload.title || book.title;
      book.writer = payload.writer || book.writer;
      book.point = payload.point || book.point;
      book.cover = payload.cover || book.cover;
      book.tags = payload.tags || book.tags;
      return await this.repository.save(book);
    }
    return {};
  }

  async deleteBook(id: string) {
    let book = await this.getBookById(id);
    if (book) {
      return await this.repository.remove(book);
    }
    return {};
  }
}

export default BookRepository;
