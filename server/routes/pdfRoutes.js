import express from 'express';
import { cargarProductosDesdePDF } from '../controllers/pdfController.js';
import multer from 'multer';
import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js';

const upload = multer({
    dest: 'uploads/',  // Carpeta de almacenamiento temporal
    limits: { fileSize: 10 * 1024 * 1024 }, // Límite de tamaño del archivo (10MB)
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.includes('pdf')) {
            return cb(new Error('Solo se permiten archivos PDF.'));
        }
        cb(null, true);
    }
});

// Crear una instancia de la ruta para PDF
const routePdf = express.Router();

// Middleware de manejo de errores de multer
routePdf.post('/', upload.single('pdf'), (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Error al subir el archivo: ${err.message}` });
    } else if (err) {
        return res.status(400).json({ message: `Error: ${err.message}` });
    }
    next(); // Si no hay errores, pasar al controlador
}, adminAuthMiddleware, cargarProductosDesdePDF);

export default routePdf;
