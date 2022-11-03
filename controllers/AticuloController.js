const articuloModel = require("./../models/ArticuloModel");
const departamentoModel = require("./../models/DepartamentoModel");
const claseModel = require("./../models/ClaseModel");
const familiaModel = require("./../models/FamiliaModel");

class ArticuloController {
  async FindAll(req, res, next) {
    try {
      const response = await articuloModel.findAll();
      const arrayArticulos = response.map(({ dataValues }) => {
        return {
          sku: dataValues.sku,
          articulo: dataValues.articulo,
          marca: dataValues.marca,
          modelo: dataValues.modelo,
          stock: dataValues.stock,
          cantidad: dataValues.cantidad,
        };
      });
      return res.status(200).json({
        articulos: arrayArticulos,
      });
    } catch (error) {
      return res.status(500).json({
        mensage: `Error en el servidor favor de intentar más tarde.`,
      });
    }
  }
  async FindArticulo(req, res, next) {
    try {
      const { sku } = req.params;
      const response = await articuloModel.findOne({ where: { sku } });
      if (response !== null) {
        const departamento = await departamentoModel.findByPk(
          response.departamento
        );
        const clase = await claseModel.findByPk(response.clase);
        const familia = await familiaModel.findByPk(response.familia);
        const articulo = {
          sku: response.sku,
          articulo: response.articulo,
          marca: response.marca,
          modelo: response.modelo,
          departamento: {
            id: departamento.id,
            value: departamento.nombre,
          },
          clase: {
            id: clase.id,
            value: clase.nombre,
          },
          familia: {
            id: familia.id,
            value: familia.nombre,
          },
          stock: response.stock,
          cantidad: response.cantidad,
          descontinuado: response.descontinuado,
          fecha_de_alta: response.fecha_de_alta,
          fecha_de_baja: response.fecha_de_baja,
        };
        return res.status(200).json({
          mensage: "articulo encontrado",
          articulo,
        });
      } else {
        return res.status(404).json({
          mensage: `articulo con sku: ${sku} no encontrado.`,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        mensage: `Error en el servidor favor de intentar más tarde.`,
      });
    }
  }
  async crearArticulo(req, res, next) {
    try {
      const newArticulo = req.body;
      const response = await articuloModel.create(newArticulo);
      const departamento = await departamentoModel.findByPk(
        response.departamento
      );
      const clase = await claseModel.findByPk(response.clase);
      const familia = await familiaModel.findByPk(response.familia);
      const registeredArticulo = {
        sku: response.sku,
        articulo: response.articulo,
        marca: response.marca,
        modelo: response.modelo,
        departamento: {
          id: departamento.id,
          value: departamento.nombre,
        },
        clase: {
          id: clase.id,
          value: clase.nombre,
        },
        familia: {
          id: familia.id,
          value: familia.nombre,
        },
        stock: response.stock,
        cantidad: response.cantidad,
        descontinuado: response.descontinuado,
        fecha_de_alta: response.fecha_de_alta,
        fecha_de_baja: response.fecha_de_baja,
      };
      return res.status(200).json({
        mensage: `El articulo ${response.articulo} con sku: ${response.sku} se ha registrado exitosamente`,
        articulo: registeredArticulo,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        mensage: `Error en el servidor favor de intentar más tarde.`,
      });
    }
  }
  async updateArticulo(req, res, next) {
    try {
      const {
        articulo,
        marca,
        modelo,
        departamento,
        clase,
        familia,
        cantidad,
        stock,
        descontinuado,
      } = req.body;
      const { sku } = req.params;
      const dataArticulo = await articuloModel.findOne({ where: { sku } });
      if (dataArticulo !== null) {
        dataArticulo.articulo = articulo;
        dataArticulo.marca = marca;
        dataArticulo.modelo = modelo;
        dataArticulo.departamento = departamento;
        dataArticulo.clase = clase;
        dataArticulo.familia = familia;
        dataArticulo.cantidad = cantidad;
        dataArticulo.stock = stock;
        dataArticulo.descontinuado = descontinuado;
        dataArticulo.fecha_de_baja = descontinuado
          ? Date.now()
          : new Date("1900, 01, 01");
        await dataArticulo.save();
        return res.status(200).json({
          mensage: `se ha actualizado el articulo con sku: ${sku} correctamente.`,
        });
      } else {
        return res.status(404).json({
          mensage: `articulo con sku: ${sku} no encontrado.`,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        mensage: `Error en el servidor favor de intentar más tarde.`,
      });
    }
  }
  async deleteArticulo(req, res, next) {
    try {
      const { sku } = req.params;
      const response = await articuloModel.destroy({ where: { sku } });
      if (response !== 0) {
        return res.status(200).json({
          mensage: `Articulo con sku: ${sku} eliminado correctamente.`,
        });
      } else {
        return res.status(404).json({
          mensage: `Articulo con sku: ${sku} no encontrado, imposible de eliminar.`,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        mensage: `Error en el servidor favor de intentar más tarde.`,
      });
    }
  }
}
module.exports = ArticuloController;
