import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


const miClave = process.env.MI_CLAVE;

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

    

        const user = await User.findOne({ where: {   
            email 
     //       role: { [Op.or]: ['proveedor', 'admin'] } // Agregar condición del rol

        } });
        console.log(user);
        if (!user) {
            return res.status(401).send({ error: 'Usuario o contraseña incorrectos' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
    
            return res.status(401).send({ error: 'Usuario o contraseña incorrectos' });
        }

        // console.log("iniciado")
        // res.status(200).send({ message: 'Inicio de sesión exitoso' });
        const payload = {
            user: {
                nombre:user.nombre,
                apellido: user.apellido,
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            miClave,
            {
                expiresIn:86400
            },
            (err, token) => {
                if (err) throw err;

                res.json({ token });
          
            }
        );
    } catch (error) {
        console.log("error " + error)
        return res.status(401).send({ error: 'Error en la bd' + error });

    }

};


