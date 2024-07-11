import { Sequelize } from "sequelize";

const db = new Sequelize('fullservice','root','',{
    host:'localhost',
    dialect:'mysql'
})

export default db