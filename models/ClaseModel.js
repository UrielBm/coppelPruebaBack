const { DataTypes } = require("sequelize");
const db = require("./../config/dbConfig");

const Clase = db.define(
  "clases",
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

module.exports = Clase;
