// importamos la connecion a la bd

import db from "../database/db.js";

import { DataTypes } from "sequelize";
import Producto from "./productoModel.js";

const ImagenProducto = db.define('img_productos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_producto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ruta: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }


});

ImagenProducto.belongsTo(Producto, { foreignKey: 'id_producto' });
Producto.hasMany(ImagenProducto, {
    foreignKey: 'id_producto',
    onDelete: 'CASCADE',
});
export default ImagenProducto
