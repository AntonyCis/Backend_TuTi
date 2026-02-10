const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // 1. Obtener el token del header de autorización
    const authHeader = req.headers['authorization'];

    // El formato suele ser: "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Acceso Denegado. No se proporciono el token' });
    }

    try {
        // 2. Verificar el token
        const verificado = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Guardar los datos del usuario en el objeto de solicitud para su uso posterior
        req.usuario = verificado;

        // 4. Dar permiso para continuar con la siguiente función de middleware o ruta
        next();
    }catch (error) {
        return res.status(401).json({ message: 'Token no valido' });
    }
}

module.exports = verificarToken;