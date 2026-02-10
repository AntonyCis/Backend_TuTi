const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, clienteController.obtenerTodos);
router.post('/', authMiddleware, clienteController.crear);

module.exports = router;