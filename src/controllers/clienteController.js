const Cliente = require('../models/Cliente');

const clienteController = {
    obtenerTodos: async (req, res) => {
        try {
            const clientes = await Cliente.findAll();
            res.json({
                mensaje: `Consulta realizada por: ${req.usuario.nombre}`,
                total: clientes.length,
                data: clientes
            });
        }catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener clientes', error: error.message });
        }
    },

    crear: async (req, res) => {
        try {
            // Sequelize mapeara automáticamente los campos del cuerpo de la solicitud a los campos del modelo Cliente
            const nuevoCliente = await Cliente.create(req.body);
            res.status(201).json({
                mensaje: `Cliente registrado con exito`,
                data: nuevoCliente
            });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ mensaje: 'La cédula ya está registrada' });
            }
            res.status(500).json({ mensaje: 'Error al crear cliente', error: error.message });
        }
    }
};

module.exports = clienteController;