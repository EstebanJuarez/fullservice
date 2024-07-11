// importamos la connecion a la bd

import db from "../database/db.js";
import { DataTypes } from "sequelize";

const Reparacion = db.define('reparaciones_precios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    electrico_desde: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    electrico_hasta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    gas_3000: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    nitro_3000: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    gas_4500: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    nitro_4500: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    gas_6000: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    nitro_6000: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
});





export default Reparacion
