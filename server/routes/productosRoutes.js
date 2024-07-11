
import express from 'express'
import multer from 'multer';
import path from 'path';

import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js'
import {
    crearProductoConImagenes, obtenerProductosConImagenes,
    getProducto, getAllProds, eliminarProducto, actualizarProducto, eliminarImagen, getLastProductos,
} from '../controllers/productoImgController.js'
const routeProducto = express.Router()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // Tamaño máximo de archivo: 5 MB
});




routeProducto.get('/id/:id', getProducto)
routeProducto.get('/productos', obtenerProductosConImagenes);



routeProducto.get('/lastProds', getLastProductos)
routeProducto.post('/', adminAuthMiddleware, upload.array('imagenes', 3), crearProductoConImagenes)
routeProducto.get('/admin', adminAuthMiddleware, getAllProds)
routeProducto.delete('/admin/:id', adminAuthMiddleware, eliminarProducto);
routeProducto.get('/admin/:id', adminAuthMiddleware, getProducto)
routeProducto.put('/admin/:id', adminAuthMiddleware, upload.array('imagenes', 3), actualizarProducto)
routeProducto.delete('/imagen/:id', adminAuthMiddleware, eliminarImagen)





export default routeProducto