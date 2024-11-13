import fs from 'fs';
import pdfParse from 'pdf-parse';
import ProdCatalogo from '../models/prodCatalogoModel.js';

export const cargarProductosDesdePDF = async (req, res) => {
    const archivoPDF = req.file;

    if (!archivoPDF || archivoPDF.mimetype !== 'application/pdf') {
        return res.status(400).json({ message: "El archivo debe ser un PDF." });
    }

    let dataBuffer;
    try {
        dataBuffer = fs.readFileSync(archivoPDF.path);
    } catch (err) {
        return res.status(500).json({ message: "Error al leer el archivo PDF." });
    }

    try {
        const data = await pdfParse(dataBuffer);
        const texto = data.text;

        const lineas = texto.split('\n');
        const productos = [];

        // Expresión regular para capturar nombre del producto, costo y IVA.
        const patron = /(.*?)(\d{1,3}(?:[.,]\d{1,3})*)\s*\$\s*(\d{1,2}(?:[.,]\d{1,2})?)\s*%/;

        for (let linea of lineas) {
            const match = linea.match(patron);

            if (!match || match.length < 4) {
                continue;
            }

            const [_, nombreCompleto, costo, iva] = match;

            if (!nombreCompleto || !costo || !iva) continue;

            // Corregir nombre del producto: separar palabras pegadas
            const nombreCorregido = nombreCompleto.replace(/([a-z])([A-Z])/g, '$1 $2');

            // Convertir el costo y el IVA a formato numérico adecuado
            const costoFormateado = costo.replace(/\./g, '').replace(',', '.');
            const costoNumerico = parseFloat(costoFormateado);
            const ivaNumerico = parseFloat(iva.replace(',', '.'));

            console.log("Producto extraído:", { nombre: nombreCorregido, costo: costoNumerico, iva: ivaNumerico });

            // Verificar si el producto ya existe en la base de datos por su nombre
            const productoExistente = await ProdCatalogo.findOne({ where: { nombre: nombreCorregido } });

            if (!productoExistente) {
                try {
                    const producto = await ProdCatalogo.create({
                        nombre: nombreCorregido,
                        costo: costoNumerico,
                        iva: ivaNumerico,
                        ficha_tecnica: ""
                    });
                    productos.push(producto);
                } catch (err) {
                    console.error('Error al guardar el producto:', err.message);
                    return res.status(500).json({ message: `Error al guardar el producto ${nombreCorregido}.` });
                }
            } else {
                console.log(`El producto ${nombreCorregido} ya existe en la base de datos.`);
            }
        }

        fs.unlinkSync(archivoPDF.path);

        if (productos.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos en el PDF o todos los productos ya existían." });
        }

        res.status(200).json({ message: "Productos cargados correctamente", productos });
    } catch (err) {
        console.error("Error al procesar el archivo PDF:", err.message);
        res.status(500).json({ message: "Error al procesar el archivo PDF." });
    }
};
