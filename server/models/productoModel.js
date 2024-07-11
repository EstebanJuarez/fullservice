// importamos la connecion a la bd

import db from "../database/db.js";
import { DataTypes } from "sequelize";

const Producto = db.define('productos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detalles: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

});








export default Producto
