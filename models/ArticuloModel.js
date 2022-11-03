const { DataTypes } = require("sequelize");
const db = require("./../config/dbConfig");

const Articulo = db.define("articulos", {
  sku: {
    type: DataTypes.UUID(6),
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  articulo: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  departamento: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
  },
  clase: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  familia: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER(9),
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER(9),
    allowNull: false,
    defaultValue: 1000,
  },
  descontinuado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  fecha_de_alta: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  fecha_de_baja: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: new Date("1900, 01, 01"),
  },
});

module.exports = Articulo;
