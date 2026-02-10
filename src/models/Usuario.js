const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Para evitar los duplicados pa
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {
    tableName: 'usuarios',
    timestamps: true //Crea los campos de createdAt y updatedAt
});

module.exports = Usuario;