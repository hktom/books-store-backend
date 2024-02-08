"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = require("../entity/Book");
class BookRepository {
    constructor(dataSource, book) {
        this.repository = dataSource.getRepository(book);
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOneBy({ id: id });
        });
    }
    findBookByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield this.getBooks();
            return books.filter((book) => book.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
        });
    }
    createBook(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = new Book_1.Book();
            book.title = payload.title;
            book.writer = payload.writer;
            book.point = payload.point;
            book.cover = payload.cover;
            book.tags = payload.tags;
            return yield this.repository.save(book);
        });
    }
    updateBook(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let book = yield this.getBookById(id);
            if (book) {
                book.title = payload.title || book.title;
                book.writer = payload.writer || book.writer;
                book.point = payload.point || book.point;
                book.cover = payload.cover || book.cover;
                book.tags = payload.tags || book.tags;
                return yield this.repository.save(book);
            }
            return {};
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let book = yield this.getBookById(id);
            if (book) {
                return yield this.repository.remove(book);
            }
            return {};
        });
    }
}
exports.default = BookRepository;
