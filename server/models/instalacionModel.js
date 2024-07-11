// importamos la connecion a la bd

import db from "../database/db.js";
import { DataTypes } from "sequelize";

const Instalacion = db.define('instalaciones_precios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    instalacion_3000: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instalacion_4500: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instalacion_6000: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    metro_caño_3000: {
        type: DataTypes.STRING,
        allowNull: false
    },
    metro_caño_4500: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    metro_caño_6000: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    altura: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pase_viga: {
        type: DataTypes.STRING,
        allowNull: true,
    },



});








export default Instalacion
