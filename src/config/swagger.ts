export const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Book Store API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "TOM HIKARI",
        url: "https://github.com/hktom",
        email: "tomprescott1565@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};
