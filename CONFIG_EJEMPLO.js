/**
 * ARCHIVO DE CONFIGURACIÓN DE EJEMPLO
 * Este archivo muestra cómo se inicializa la aplicación
 */

// ============================================
// 1. INICIALIZAR LA APLICACIÓN
// ============================================

// Crear instancias de los controladores
const authController = new AuthController();
const medicamentoController = new MedicamentoController();

// ============================================
// 2. DATOS INICIALES DE PRUEBA
// ============================================

// Crear usuarios de prueba
function inicializarDatosDemo() {
    // Verificar si ya existen datos
    if (localStorage.getItem('medicamentos')) {
        return; // Ya están inicializados
    }

    // Medicamentos de ejemplo
    const medicamentos = [
        {
            id: 1,
            nombre: 'Paracetamol 500mg',
            descripcion: 'Analgésico y antipirético, reduce dolor y fiebre',
            precio: 5.99,
            stock: 50,
            categoria: 'Analgésicos',
            fechaCreacion: new Date()
        },
        {
            id: 2,
            nombre: 'Ibuprofeno 400mg',
            descripcion: 'Antiinflamatorio, reduces dolor e inflamación',
            precio: 7.99,
            stock: 30,
            categoria: 'Antiinflamatorios',
            fechaCreacion: new Date()
        },
        {
            id: 3,
            nombre: 'Amoxicilina 500mg',
            descripcion: 'Antibiótico para infecciones bacterianas',
            precio: 12.99,
            stock: 20,
            categoria: 'Antibióticos',
            fechaCreacion: new Date()
        },
        {
            id: 4,
            nombre: 'Vitamina C 1000mg',
            descripcion: 'Suplemento para reforzar el sistema inmunológico',
            precio: 8.99,
            stock: 100,
            categoria: 'Vitaminas',
            fechaCreacion: new Date()
        },
        {
            id: 5,
            nombre: 'Cough Sirup',
            descripcion: 'Jarabe para la tos, alivia síntomas respiratorios',
            precio: 6.99,
            stock: 5,
            categoria: 'Antitusivos',
            fechaCreacion: new Date()
        }
    ];

    // Usuarios de ejemplo
    const usuarios = [
        {
            id: 1,
            nombre: 'Admin Farmacia',
            email: 'admin@farmacia.com',
            contraseña: 'admin123',
            rol: 'admin',
            fechaCreacion: new Date()
        },
        {
            id: 2,
            nombre: 'Usuario Prueba',
            email: 'usuario@example.com',
            contraseña: '123456',
            rol: 'usuario',
            fechaCreacion: new Date()
        }
    ];

    // Guardar en localStorage
    localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    console.log('✅ Datos de demostración inicializados');
}

// ============================================
// 3. FUNCIONES DE UTILIDAD
// ============================================

/**
 * Simula un delay asincrónico
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Formatea una fecha
 */
function formatearFecha(fecha) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', options);
}

/**
 * Formatea precio en moneda
 */
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD'
    }).format(precio);
}

/**
 * Logger personalizado
 */
const Logger = {
    info: (mensaje) => console.log('ℹ️ ', mensaje),
    success: (mensaje) => console.log('✅', mensaje),
    warning: (mensaje) => console.warn('⚠️ ', mensaje),
    error: (mensaje) => console.error('❌', mensaje)
};

// ============================================
// 4. EJEMPLOS DE USO EN CONSOLA
// ============================================

/*
// Login
const resultadoLogin = authController.login('admin@farmacia.com', 'admin123');
console.log(resultadoLogin);

// Obtener medicamentos
const medicamentos = medicamentoController.obtenerTodos();
console.log('Medicamentos:', medicamentos);

// Buscar medicamento
const resultadoBusqueda = medicamentoController.buscar('paracetamol');
console.log('Resultados:', resultadoBusqueda);

// Crear medicamento
const nuevoMedicamento = medicamentoController.crear(
    'Dipirona 500mg',
    'Analgésico potente',
    10.99,
    15,
    'Analgésicos'
);
console.log('Creado:', nuevoMedicamento);

// Validaciones
console.log(Validaciones.esEmailValido('admin@farmacia.com')); // true
console.log(Validaciones.esPositivo(100)); // true
console.log(Validaciones.esPasswordFuerte('Admin@123')); // true

// localStorage
StorageUtil.set('mi_clave', { nombre: 'test', valor: 123 });
const dato = StorageUtil.get('mi_clave');
console.log('Dato recuperado:', dato);
*/

// ============================================
// 5. INICIALIZAR AL CARGAR LA APP
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar datos de demostración
    inicializarDatosDemo();

    // Verificar autenticación
    const estaAutenticado = authController.estaAutenticado();
    console.log('Autenticado:', estaAutenticado);

    if (estaAutenticado) {
        const usuario = authController.obtenerUsuarioActual();
        console.log('Usuario actual:', usuario);
    }
});

// Exportar para uso en otros archivos (si se usa modularización)
// module.exports = { authController, medicamentoController, Logger };
