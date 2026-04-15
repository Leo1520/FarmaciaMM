/**
 * Middleware para manejo de CORS y headers
 * Permite comunicación AJAX desde el frontend
 */

const cors = require('cors');
const helmet = require('helmet');

/**
 * Configurar CORS para AJAX
 */
const corsOptions = {
    origin: process.env.CORS_ORIGIN?.split(',') || [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

/**
 * Headers de seguridad
 */
const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            fontSrc: ["'self'", 'data:'],
            connectSrc: ["'self'", 'https://firebase.google.com', 'https://firestore.googleapis.com']
        }
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' }
});

/**
 * Middleware personalizado para headers AJAX
 */
const ajaxHeaders = (req, res, next) => {
    // Indica que aceptamos respuestas JSON
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    // Evita cacheo de respuestas dinámicas
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // Headers para AJAX
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    
    next();
};

module.exports = {
    corsOptions,
    securityHeaders,
    ajaxHeaders,
    cors
};
