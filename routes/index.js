var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { validateCampos } = require("../middlewares/validateCampos");
const ArticuloController = require("./../controllers/AticuloController");
const intanceArticulo = new ArticuloController();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hola es el Api de coppel test");
});
//Read
router.get("/findall", (req, res, next) => {
  intanceArticulo.FindAll(req, res, next);
});
router.get("/findarticulo/:sku", (req, res, next) => {
  intanceArticulo.FindArticulo(req, res, next);
});

//register
router.post(
  "/registrararticulo",
  [
    check("sku", "el campo sku es obligatorio").not().isEmpty(),
    check("sku", "el campo sku no puede ser mayor a 6 dígitos").isLength({
      max: 6,
    }),
    check("articulo", "el campo articulo es obligatorio").not().isEmpty(),
    check("marca", "el campo marca es obligatorio").not().isEmpty(),
    check("modelo", "el campo modelo es obligatorio").not().isEmpty(),
    check("departamento", "el campo departamento es obligatorio")
      .not()
      .isEmpty(),
    check("clase", "el campo clase es obligatorio").not().isEmpty(),
    check("familia", "el campo familia es obligatorio").not().isEmpty(),
    check("stock", "el campo stock es obligatorio").not().isEmpty(),
    check("cantidad", "el campo cantidad es obligatorio").not().isEmpty(),
    validateCampos,
  ],
  (req, res, next) => {
    intanceArticulo.crearArticulo(req, res, next);
  }
);

// update
router.put(
  "/actualizaracticulo/:sku",
  [
    check("articulo", "el campo articulo es obligatorio").not().isEmpty(),
    check("marca", "el campo marca es obligatorio").not().isEmpty(),
    check("modelo", "el campo modelo es obligatorio").not().isEmpty(),
    check("departamento", "el campo departamento es obligatorio")
      .not()
      .isEmpty(),
    check("clase", "el campo clase es obligatorio").not().isEmpty(),
    check("familia", "el campo familia es obligatorio").not().isEmpty(),
    check("stock", "el campo stock es obligatorio").not().isEmpty(),
    check("cantidad", "el campo cantidad es obligatorio").not().isEmpty(),
    validateCampos,
  ],
  (req, res, next) => {
    intanceArticulo.updateArticulo(req, res, next);
  }
);

//delete
router.delete("/eliminararticulo/:sku", (req, res, next) => {
  intanceArticulo.deleteArticulo(req, res, next);
});
module.exports = router;
