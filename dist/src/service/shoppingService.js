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
class ShoppingService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    getShoppingList(page) {
        return __awaiter(this, void 0, void 0, function* () {
            let books = yield this.bookRepository.getBooks();
            return books.slice((page - 1) * 4, page * 4);
        });
    }
    getShoppingItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bookRepository.getBookById(id);
        });
    }
    createShoppingItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bookRepository.createBook(payload);
        });
    }
    updateShoppingItem(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bookRepository.updateBook(id, payload);
        });
    }
    findBookByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bookRepository.findBookByTitle(title);
        });
    }
    deleteShoppingItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bookRepository.deleteBook(id);
        });
    }
}
exports.default = ShoppingService;
