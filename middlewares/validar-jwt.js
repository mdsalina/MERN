const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res=response, next) => {
    // x-token headers
    const token = req.header('x-token');
    
    // Si no hay token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    // Verificar el token
    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;
    }
    // Si el token no es válido
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
    next();
}

module.exports = {
    validarJWT
} //Exportar la función para que pueda ser utilizada en otro archivo