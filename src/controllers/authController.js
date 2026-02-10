const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    //Registro de usuario (Para crear la cuenta inicial)
    registro: async (req, res) => {
        try {
            console.log("Datos recibidos en el backend:", req.body);
            const { nombre, username, password } = req.body;

            // Encriptar la contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const nuevoUsuario = await Usuario.create({
                nombre,
                username,
                password: hashedPassword
            });

            res.status(201).json({ message: 'Usuario registrado exitosamente', id: nuevoUsuario.id });
        }catch (error) {
        console.error("ERROR DETALLADO:", error); // <--- ESTO ES CLAVE
        res.status(500).json({ 
            mensaje: 'Error al registrar', 
            detalle: error.message 
        });
        }
    },

    // Login del usuario
    login: async(req, res) => {
        try {
            const { username, password } = req.body;

            //1. Buscar si el usuario existe en la fucking base
            const usuario = await Usuario.findOne({ where: {username }});
            if (!usuario) {
                return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            }

            //2. Verificar la contraseña
            const esValida = await bcrypt.compare(password, usuario.password);
            if (!esValida) {
                return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            }

            //3. Generar un token JWT
            const token = jwt.sign(
                { id: usuario.id, nombre: usuario.nombre },
                process.env.JWT_SECRET,
                { expiresIn: '8h' } // El token expira en 8 horitas
            );

            res.json({
                mensaje: 'Login exitoso',
                token,
                usuario: { nombre: usuario.nombre, username: usuario.username }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    }
};

module.exports = authController;