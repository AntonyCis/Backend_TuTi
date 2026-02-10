const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cedula: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING(15),
    },
    direccion: {
        type: DataTypes.TEXT,
    }
}, {
    tableName: 'clientes',
    timestamps: false //Crea los campos de createdAt y updatedAt
});

module.exports = Cliente;