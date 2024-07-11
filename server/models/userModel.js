// importamos la connecion a la bd

import db from "../database/db.js";

import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt'


const User = db.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },


    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true // cambiar en prod


    }
});




User.beforeCreate(async (user) => {
    if (user.role !== 'guest') {
        return await bcrypt.hash(user.password, 10).then((password) => {
            user.password = password;
        });
    }
});

export default User
