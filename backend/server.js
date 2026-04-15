/**
 * SERVIDOR PRINCIPAL - Express + Firebase
 * API para Sistema de Control de Medicamentos
 */

const express = require('express');
const path = require('path');
require('dotenv').config();

// Importar middleware
const { cors, corsOptions, securityHeaders, ajaxHeaders } = require('./src/middleware/headers');
const { verifyToken, verifyRole } = require('./src/middleware/auth');

// Importar rutas (se crearán después)
// const authRoutes = require('./src/routes/auth');
// const medicamentosRoutes = require('./src/routes/medicamentos');
// const usuariosRoutes = require('./src/routes/usuarios');
// const alertasRoutes = require('./src/routes/alertas');
// const reportesRoutes = require('./src/routes/reportes');

const app = express();
const PORT = process.env.PORT || 3000;

// ═══════════════════════════════════════════════════════════
// MIDDLEWARE GLOBAL
// ═══════════════════════════════════════════════════════════

// Seguridad
app.use(securityHeaders);
app.use(cors(corsOptions));

// Parsing de datos
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Headers personalizados para AJAX
app.use(ajaxHeaders);

// Logging de requests
app.use((req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        const method = req.method;
        const url = req.originalUrl;
        const status = res.statusCode;
        
        const color = status >= 400 ? '\x1b[31m' : '\x1b[32m'; // Rojo si error, verde si ok
        const reset = '\x1b[0m';
        
        console.log(`${color}[${method}] ${url} - ${status} (${duration}ms)${reset}`);
    });
    
    next();
});

// ═══════════════════════════════════════════════════════════
// SALUD DEL SERVIDOR
// ═══════════════════════════════════════════════════════════

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: '✅ Servidor está funcionando correctamente',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV
    });
});

app.get('/api/version', (req, res) => {
    res.status(200).json({
        success: true,
        version: '1.0.0',
        api: 'Farmacia MM API',
        timestamp: new Date().toISOString()
    });
});

// ═══════════════════════════════════════════════════════════
// RUTAS (Activar cuando estén creadas)
// ═══════════════════════════════════════════════════════════

// app.use('/api/auth', authRoutes);
// app.use('/api/medicamentos', medicamentosRoutes);
// app.use('/api/usuarios', verifyToken, verifyRole(['ADMIN']), usuariosRoutes);
// app.use('/api/alertas', verifyToken, alertasRoutes);
// app.use('/api/reportes', verifyToken, reportesRoutes);

// ═══════════════════════════════════════════════════════════
// RUTA RAÍZ (para Vercel)
// ═══════════════════════════════════════════════════════════

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: '🏥 Bienvenido a Farmacia MM API',
        endpoints: {
            health: '/api/health',
            version: '/api/version',
            auth: '/api/auth',
            medicamentos: '/api/medicamentos',
            usuarios: '/api/usuarios',
            alertas: '/api/alertas',
            reportes: '/api/reportes'
        }
    });
});

// ═══════════════════════════════════════════════════════════
// MANEJO DE ERRORES 404
// ═══════════════════════════════════════════════════════════

app.use((req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Ruta no encontrada',
        path: req.originalUrl,
        method: req.method
    });
});

// ═══════════════════════════════════════════════════════════
// MANEJO GLOBAL DE ERRORES
// ═══════════════════════════════════════════════════════════

app.use((err, req, res, next) => {
    console.error('❌ Error no controlado:', err);
    
    res.status(err.statusCode || 500).json({
        success: false,
        statusCode: err.statusCode || 500,
        message: err.message || 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// ═══════════════════════════════════════════════════════════
// INICIAR SERVIDOR
// ═══════════════════════════════════════════════════════════

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════╗
║     🏥 FARMACIA MM API - INICIADO 🏥    ║
╚═══════════════════════════════════════════╝

🚀 Servidor corriendo en: http://localhost:${PORT}
📝 Ambiente: ${process.env.NODE_ENV || 'development'}
🔧 versión: 1.0.0

Endpoints disponibles:
  GET  /api/health        → Estado del servidor
  GET  /api/version       → Versión de la API
  GET  /              → Información de endpoints

Próximamente:
  POST /api/auth/register
  POST /api/auth/login
  GET  /api/medicamentos
  POST /api/medicamentos
  ...y más

Documentación Swagger: /api/docs (próximamente)
    `);
});

// Exportar para testing o serverless
module.exports = app;
