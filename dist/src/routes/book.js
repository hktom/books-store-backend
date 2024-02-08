"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = require("express");
const bookController_1 = __importDefault(require("../controller/bookController"));
const bootstrap_1 = require("../config/bootstrap");
const bookController = new bookController_1.default(bootstrap_1.shoppingService);
exports.bookRouter = (0, express_1.Router)();
exports.bookRouter.get("/books", (req, res) => bookController.getBooks(req, res));
exports.bookRouter.get("/book", (req, res) => bookController.findBookByTitle(req, res));
exports.bookRouter.get("/book/:id", (req, res) => bookController.getBookById(req, res));
exports.bookRouter.post("/book/create", (req, res) => bookController.createBook(req, res));
