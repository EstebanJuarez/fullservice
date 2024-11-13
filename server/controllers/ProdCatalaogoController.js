// controllers/productoController.js
import ProdCatalogo from "../models/prodCatalogoModel.js";
// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
    try {
        const productos = await ProdCatalogo.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un producto nuevo
export const crearProducto = async (req, res) => {
    const { nombre, costo, iva } = req.body;
    try {
        const nuevoProducto = await ProdCatalogo.create({ nombre, costo, iva });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar ficha técnica de un producto
export const actualizarFichaTecnica = async (req, res) => {
    const { id } = req.params;
    const { ficha_tecnica, img_url } = req.body;

    try {
        const producto = await ProdCatalogo.findByPk(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        producto.ficha_tecnica = ficha_tecnica || producto.ficha_tecnica;
        producto.img_url = img_url || producto.img_url;

        await producto.save();
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
