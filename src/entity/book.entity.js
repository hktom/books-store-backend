const { Sequelize, DataTypes } = require("sequelize");
const db = require("../helpers/db");

const TAG = ["fiction", "non-fiction", "science", "essay"];

const User = db.define(
  "Book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    point: {
      type: DataTypes.price,
      allowNull: false,
    },
    tag: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    // Other model options go here
  }
);
