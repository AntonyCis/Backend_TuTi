const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Cliente = require('./Cliente');
const Producto = require('./Producto');

const Pedido = sequelize.define('Pedido', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : { model: Cliente, key: 'id' }
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : { model: Producto, key: 'id' }
    },
    cantidad : { type: DataTypes.INTEGER, allowNull: false },
    fecha_pedido: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    total: { type: DataTypes.DECIMAL(10, 2) }
}, {
    tableName: 'pedidos',
    timestamps: false
});

// Definir relaciones
Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id' });
Pedido.belongsTo(Producto, { foreignKey: 'producto_id' });

module.exports = Pedido;