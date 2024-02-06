const { Sequelize, DataTypes } = require("sequelize");
const DB = new Sequelize(
  "postgres://postgres:admin@localhost:5432/hyperhire-book-stores"
);

module.exports = DB;
