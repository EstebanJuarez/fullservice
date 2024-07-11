import Producto from '../models/productoModel.js';
import imgProductoModel from '../models/imgProductoModel.js';
import { Op } from 'sequelize';
import fs from 'fs'
import { fileURLToPath } from 'url';
import path from 'path';
import jwt from 'jsonwebtoken'

export const crearProductoConImagenes = async (req, res) => {
  try {
    const { descripcion, detalles, precio, stock } = req.body;

    // Crear el producto
    const nuevoProducto = await Producto.create({
      descripcion,
      detalles,
      precio,
      stock
    });

    // Crear las imágenes del producto
    const imagenesProducto = [];
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const ruta = req.files[i].filename;
        const descripcionImagen = `Imagen ${i + 1}`;
        const imagenProducto = await imgProductoModel.create({
          id_producto: nuevoProducto.id,
          ruta,
          descripcion: descripcionImagen
        });
        imagenesProducto.push(imagenProducto);
      }
    }

    res.status(201).json({
      message: 'Producto creado exitosamente',
      producto: nuevoProducto,
      imagenesProducto
    });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};
export const obtenerProductosConImagenes = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [
        {
          model: imgProductoModel,
          attributes: ['id', 'ruta', 'descripcion']
        }
      ],
      order: [['descripcion', 'DESC']] // Ordenar por descripción en orden descendente
    });

    if (productos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos' });
    }

    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};





export const getAllProds = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [
        {
          model: imgProductoModel,

          attributes: ['id', 'ruta', 'descripcion']
        }
      ]
    });

    res.status(200).json({ productos });
  } catch (error) {
    console.log('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

export const getProducto = async (req, res) => {
  try {
    const producto = await Producto.findOne({
      include: [
        {
          model: imgProductoModel,

          attributes: ['id', 'ruta', 'descripcion']
        }
      ],
      where: { id: req.params.id }
    });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ producto });
  } catch (error) {
    console.log('Error al obtener el producto:', error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};
















const __dirname = path.dirname(fileURLToPath(import.meta.url));




export const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log('Error deleting file', err);
    } else {
      console.log('File deleted successfully');
    }
  });
};




export const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id, {
      include: [imgProductoModel]
    });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const imagenes = producto.img_productos;

    // Delete images from the folder
    imagenes.forEach((imagen) => {
      const filePath = path.join(__dirname, '..', 'uploads', imagen.ruta);
      deleteFile(filePath);
    });

    // Destroy the images from the database
    await imgProductoModel.destroy({
      where: {
        id_producto: id
      }
    });

    // Destroy the product from the database
    await producto.destroy();

    res.status(200).json({
      message: 'Producto eliminado exitosamente',
      producto
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};



export const actualizarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el producto por ID
    const producto = await Producto.findByPk(id, {
      include: [imgProductoModel]
    });

    if (!producto) {
      console.log("Producto no encontrado");
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar las propiedades del producto
    producto.descripcion = req.body.descripcion || producto.descripcion;
    producto.detalles = req.body.detalles || producto.detalles;
    producto.precio = req.body.precio || producto.precio;
    producto.stock = req.body.stock || producto.stock;

    await producto.save();

    // Si hay nuevas imágenes, actualizarlas
    const imagenesProducto = [];
    if (req.files && req.files.length > 0) {
      // Eliminar las imágenes anteriores
      await imgProductoModel.destroy({ where: { id_producto: producto.id } });

      // Crear las nuevas imágenes
      for (let i = 0; i < req.files.length; i++) {
        const ruta = req.files[i].filename;
        const descripcion = `Imagen ${i + 1}`;
        const imagenProducto = await imgProductoModel.create({
          id_producto: producto.id,
          ruta,
          descripcion
        });
        imagenesProducto.push(imagenProducto);
      }
    }

    res.status(200).json({
      message: 'Producto actualizado exitosamente',
      producto,
      imagenesProducto
    });
  } catch (error) {
    console.log('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

export const eliminarImagen = async (req, res) => {

  const { id } = req.params;
  try {
    const imagen = await imgProductoModel.findByPk(id)

    if (!imagen) {
      return res.status(404).json({
        message: 'Imagen no encontrada'
      })


    }
    const filePath = path.join(__dirname, '..', 'uploads', imagen.ruta)
    deleteFile(filePath)

    await imagen.destroy()

    res.status(200).json({
      message: 'imagen eliminado exitosamente',
      imagen
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
}




export const getLastProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [{ model: imgProductoModel }],
      limit: 8,
      order: [['createdAt', 'DESC']],
    });

    // Si el usuario no está autenticado, devuelve los productos con sus precios por defecto
    res.status(200).json({ productos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};
