
import express from 'express'
import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js'

import { getPrecios, updatePrecio, getInstalacionPrecios, updateInstalacionPrecio } from '../controllers/servicioController.js';

const routeServicio = express.Router();



routeServicio.get('/reparacion/precios', getPrecios);
routeServicio.put('/reparacion/precios', adminAuthMiddleware, updatePrecio);

routeServicio.get('/instalacion/precios', getInstalacionPrecios);
routeServicio.put('/instalacion/precios', adminAuthMiddleware, updateInstalacionPrecio);
export default routeServicio;

