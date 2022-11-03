const { DataTypes } = require("sequelize");
const db = require("./../config/dbConfig");

const Departamento = db.define(
  "departamentos",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Departamento;
