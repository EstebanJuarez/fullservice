// importamos la connecion a la bd

import db from "../database/db.js";

import { DataTypes } from "sequelize";

const ProdCatalogo = db.define('prod_catalogos', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    costo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    iva: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    ficha_tecnica: {
        type: DataTypes.TEXT, // Para almacenar la descripción o ficha técnica
        allowNull: true,
    },
    img_url: {
        type: DataTypes.STRING, // Para almacenar la descripción o ficha técnica
        allowNull: true,
    },

});


export default ProdCatalogo
