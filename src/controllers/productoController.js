const Producto = require('../models/Producto');

const productoController = {
    // Listar todos los productos
    obtenerTodos: async (req, res) => {
        try {
            const productos = await Producto.findAll();
            res.json({
                mensaje: `Catalogo gestionado por: ${req.usuario.nombre}`,
                total: productos.length,
                data: productos
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener productos', error: error.message });
        }
    },

    obtenerPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const producto = await Producto.findByPk(id);
            
            if (!producto) {
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }
            
            res.json(producto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo producto
    crear: async (req, res) => {
        try {
            const nuevoProducto = await Producto.create(req.body);
            res.status(201).json({
                mensaje: "Producto creado exitosamente",
                producto: nuevoProducto
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear producto', error: error.message });
        }
    },
    
    actualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const [actualizado] = await Producto.update(req.body, { where: { id } });
            if (!actualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
            res.json({ mensaje: 'Producto actualizado con éxito' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    eliminar: async (req, res) => {
        try {
            const { id } = req.params;
            const borrado = await Producto.destroy({ where: { id } });
            if (!borrado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
            res.json({ mensaje: 'Producto eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = productoController;