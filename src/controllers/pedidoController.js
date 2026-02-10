const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');
const { sequelize } = require('../config/db');

const pedidoController = {
    crear: async (req, res) => {
        // Iniciamos la transacción
        const t = await sequelize.transaction();

        try {
            const { cliente_id, producto_id, cantidad } = req.body;

            // 1. Buscar el producto (dentro de la transacción)
            const producto = await Producto.findByPk(producto_id, { transaction: t });
            
            if (!producto) {
                await t.rollback();
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }

            // 2. Manejo de Stock Negativo (Validación estricta)
            if (producto.stock < cantidad) {
                await t.rollback();
                return res.status(400).json({ 
                    mensaje: 'Stock insuficiente', 
                    detalles: `Solo quedan ${producto.stock} unidades de ${producto.nombre_producto}` 
                });
            }

            // 3. Calcular el total
            const totalCalculado = producto.precio * cantidad;

            // 4. Crear el pedido
            const nuevoPedido = await Pedido.create({
                cliente_id,
                producto_id,
                cantidad,
                total: totalCalculado
            }, { transaction: t });

            // 5. Descontar stock (Actualización atómica)
            await producto.update({ 
                stock: producto.stock - cantidad 
            }, { transaction: t });

            // SI TODO SALIÓ BIEN, HACEMOS EL COMMIT
            await t.commit();

            res.status(201).json({
                mensaje: 'Pedido generado con éxito',
                data: nuevoPedido
            });

        } catch (error) {
            // SI ALGO FALLA, DESHACEMOS TODO
            if (t) await t.rollback();
            console.error("Error en Pedido:", error);
            res.status(500).json({ mensaje: 'Error al crear el pedido', error: error.message });
        }
    },

    obtenerTodos: async (req, res) => {
        try {
            const pedidos = await Pedido.findAll({
                include: [
                    { model: Cliente, attributes: ['nombre', 'apellido'] },
                    { model: Producto, attributes: ['nombre_producto', 'precio'] }
                ]
            });
            res.json(pedidos);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener los pedidos', error: error.message });
        }
    },

    pedidosPorCliente: async (req, res) => {
        try {
            const { clienteId } = req.params;
            const pedidos = await Pedido.findAll({
                where: { cliente_id: clienteId },
                include: [{ model: Producto, attributes: ['nombre_producto', 'precio'] }]
            });
            res.json({
                cliente: clienteId,
                historial: pedidos
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = pedidoController;