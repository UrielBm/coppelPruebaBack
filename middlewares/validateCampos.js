const { validationResult } = require("express-validator");

const validateCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensage: "Error, campos faltantes o erroneos",
      errores: errores.mapped(),
    });
  }
  next();
};

module.exports = {
  validateCampos,
};
