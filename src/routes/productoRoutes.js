const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const verificarToken = require('../middleware/authMiddleware'); // Middleware de autenticacion

// Rutas pasadas por verificarToken para protegerlas
router.get('/', verificarToken, productoController.obtenerTodos);
router.get('/:id', verificarToken, productoController.obtenerPorId);
router.post('/', verificarToken, productoController.crear);
router.put('/:id', verificarToken, productoController.actualizar);
router.delete('/:id', verificarToken, productoController.eliminar);

module.exports = router;