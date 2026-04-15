/**
 * Utilidades para respuestas JSON estandarizadas
 * Garantiza un formato consistente en todas las rutas
 */

/**
 * Respuesta exitosa
 */
const successResponse = (res, data = null, message = 'Operación exitosa', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        data,
        timestamp: new Date().toISOString()
    });
};

/**
 * Respuesta con error
 */
const errorResponse = (res, message = 'Error en la operación', statusCode = 500, error = null) => {
    console.error('❌ Error:', message, error?.message || '');
    
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        error: process.env.NODE_ENV === 'development' ? error?.message : undefined,
        timestamp: new Date().toISOString()
    });
};

/**
 * Respuesta paginada
 */
const paginatedResponse = (res, data = [], total = 0, page = 1, limit = 10, message = 'Items obtenidos') => {
    const totalPages = Math.ceil(total / limit);
    
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message,
        data,
        pagination: {
            total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        },
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    successResponse,
    errorResponse,
    paginatedResponse
};
