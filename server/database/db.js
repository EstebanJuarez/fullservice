import { Sequelize } from "sequelize";

const db = new Sequelize('fullservice','root','database@',{
    host:'127.0.0.1',
    dialect:'mysql',
    pool: {
        max: 10, // Ajusta este valor según tus necesidades
    }
})

export default db