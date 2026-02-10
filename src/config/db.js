const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configracion de la conexion usando las variables del archivo .env
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // Desactiva los logs de Sequelize
    }
);

const dbConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexion Exitosa');
    } catch (error) {
        console.error("Error conectando a la base de datos:", error);
    }
};

module.exports = { sequelize, dbConnect };