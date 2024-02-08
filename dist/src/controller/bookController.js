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
class BookController {
    constructor(ShoppingService) {
        this.ShoppingService = ShoppingService;
    }
    createBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, cover, point, writer, tags } = req.body;
            if (!title || !cover || !point || !writer || !tags)
                return res.status(400).send("Invalid input");
            const book = yield this.ShoppingService.createShoppingItem({
                title,
                cover,
                point,
                writer,
                tags,
            });
            if (book)
                return res.status(201).send("Book created successfully");
            return res.status(500).send("Internal server error");
        });
    }
    findBookByTitle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const title = req.query.title;
            if (!title)
                return res.status(400).send("Title is required");
            const book = yield this.ShoppingService.findBookByTitle(title);
            if (book)
                return res.status(200).json(book);
            return res.status(404).send("Book not found");
        });
    }
    getBooks(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const page = ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page) ? +req.query.page : 1;
            const books = yield this.ShoppingService.getShoppingList(page);
            return res.status(200).json(books);
        });
    }
    getBookById(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const id = (_a = req.params.id) !== null && _a !== void 0 ? _a : "";
            if (!id)
                return res.status(400).send("Book id is required");
            const book = yield this.ShoppingService.getShoppingItemById(id);
            if (book)
                return res.status(200).json(book);
            return res.status(404).send("Book not found");
        });
    }
}
exports.default = BookController;
