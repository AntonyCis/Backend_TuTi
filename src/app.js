const express = require('express');
const cors = require('cors');
const { dbConnect, sequelize } = require('./config/db'); // Para la conexion con la base
const verificarToken = require('./middleware/authMiddleware'); // Middleware de autenticacion
const productoRoutes = require('./routes/productoRoutes'); // Rutas de productos
const clienteRoutes = require('./routes/clienteRoutes'); // Rutas de clientes
const pedidoRoutes = require('./routes/pedidoRoutes'); // Rutas de pedidos
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Sirve para el uso de JSON en el backend

// Conexion a la base de datos y sincronizacion de modelos
dbConnect();
sequelize.sync({ force: false, alter: false }) // El force es para que no se borren los datos a lo que se reinicie
  .then(() => console.log("Modelos sincronizados con la DB"))
  .catch(err => console.error("Error al sincronizar modelos:", err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de TuTi Funcionando');
});

// Ruta de prueba protegida con el middleware de autenticacion
app.get('/api/prueba-protegida', verificarToken, (req, res) => {
    res.json({
        mensaje: "¡Felicidades! El Middleware funciona.",
        usuarioAutenticado: req.usuario // Aquí verás tu ID y Nombre del Token
    });
});

// Rutas
const authRoutes = require('./routes/authRoutes');
// Uso de rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/pedidos', pedidoRoutes);

//Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});