import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import AppDataSource from "./config/AppDataSource";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger";
import authRouter from "./routes/auth";
import { cartRouter } from "./routes/cart";
import { bookRouter } from "./routes/book";
import { orderRouter } from "./routes/order";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(cartRouter);
app.use(bookRouter);
app.use(orderRouter);

const specs = swaggerJsdoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

AppDataSource.initialize()
  .then(() => {
    console.log("[database]: Connection has been established successfully.");
  })
  .catch((error) => console.error(error));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
