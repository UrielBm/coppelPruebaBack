const { DataTypes } = require("sequelize");
const db = require("./../config/dbConfig");

const Familia = db.define(
  "familias",
  {
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Familia;
