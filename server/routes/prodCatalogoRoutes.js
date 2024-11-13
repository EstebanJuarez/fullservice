// routes/productoRoutes.js
import express from 'express';
import { obtenerProductos, crearProducto, actualizarFichaTecnica } from '../controllers/ProdCatalaogoController.js';
import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js'

const routeProdCatalogo = express.Router();

// Obtener productos
routeProdCatalogo.get('/all', adminAuthMiddleware, obtenerProductos);

// Crear un producto
routeProdCatalogo.post('/create', adminAuthMiddleware, crearProducto);

//routeProdCatalogoActualizar ficha técnica de un producto
routeProdCatalogo.put('/update/:id', adminAuthMiddleware, actualizarFichaTecnica);

export default routeProdCatalogo;
