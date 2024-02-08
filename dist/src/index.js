"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const AppDataSource_1 = __importDefault(require("./config/AppDataSource"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const auth_1 = __importDefault(require("./routes/auth"));
const cart_1 = require("./routes/cart");
const book_1 = require("./routes/book");
const order_1 = require("./routes/order");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(auth_1.default);
app.use(cart_1.cartRouter);
app.use(book_1.bookRouter);
app.use(order_1.orderRouter);
const specs = (0, swagger_jsdoc_1.default)(swagger_1.swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, { explorer: true }));
AppDataSource_1.default.initialize()
    .then(() => {
    console.log("[database]: Connection has been established successfully.");
})
    .catch((error) => console.error(error));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
