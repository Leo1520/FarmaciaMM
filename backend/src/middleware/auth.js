/**
 * Middleware para validación de JWT y autenticación
 */

const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');

/**
 * Verificar token JWT
 */
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return errorResponse(res, 'Token no proporcionado', 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return errorResponse(res, 'Token inválido o expirado', 401, error);
    }
};

/**
 * Verificar rol del usuario
 */
const verifyRole = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return errorResponse(res, 'Usuario no autenticado', 401);
        }

        if (!allowedRoles.includes(req.user.rol)) {
            return errorResponse(res, 'No tienes permisos para esta acción', 403);
        }

        next();
    };
};

/**
 * Middleware opcional: si hay token, decodificar; si no, dejar pasar
 */
const optionalAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        }
        
        next();
    } catch (error) {
        // Si el token es inválido pero no es requerido, simplemente continuar
        next();
    }
};

module.exports = {
    verifyToken,
    verifyRole,
    optionalAuth
};
