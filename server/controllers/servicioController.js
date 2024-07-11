import db from "../database/db.js";
import Instalacion from "../models/instalacionModel.js";


import Reparacion from '../models/reparacionesModel.js';

// Obtener los precios de reparaciones
// Obtener los precios de reparaciones
export const getPrecios = async (req, res) => {
  try {
      const precios = await Reparacion.findOne();
      if (!precios) {
          return res.status(404).json({ message: 'No se encontraron precios de reparaciones.' });
      }
      res.json(precios);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Actualizar un precio específico
export const updatePrecio = async (req, res) => {
  const { column, value } = req.body;
  try {
      // Obtener el registro único
      let precios = await Reparacion.findOne();

      // Si no existe el registro, crearlo
      if (!precios) {
          precios = await Reparacion.create({});
      }

      // Validar que la columna existe en el modelo
      if (!(column in precios)) {
          return res.status(400).json({ message: 'Columna no válida.' });
      }

      // Actualizar el valor de la columna específica
      precios[column] = value;
      await precios.save();

      res.json(precios);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};



// Obtener los precios de instalaciones
export const getInstalacionPrecios = async (req, res) => {
  try {
      const precios = await Instalacion.findOne();
      if (!precios) {
          return res.status(404).json({ message: 'No se encontraron precios de instalaciones.' });
      }
      res.json(precios);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Actualizar un precio específico de instalaciones
export const updateInstalacionPrecio = async (req, res) => {
  const { column, value } = req.body;
  try {
      let precios = await Instalacion.findOne();
      if (!precios) {
          precios = await Instalacion.create({});
      }
      if (!(column in precios)) {
          return res.status(400).json({ message: 'Columna no válida.' });
      }
      precios[column] = value;
      await precios.save();
      res.json(precios);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};