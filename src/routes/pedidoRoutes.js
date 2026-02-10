const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const verificarToken = require('../middleware/authMiddleware');

router.post('/', verificarToken, pedidoController.crear);
router.get('/', verificarToken, pedidoController.obtenerTodos);

module.exports = router;