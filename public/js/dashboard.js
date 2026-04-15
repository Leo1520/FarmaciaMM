/**
 * Script de Dashboard - Controlador de Vistas
 * Gestiona la página principal del dashboard
 */

const authController = new AuthController();
const medicamentoController = new MedicamentoController();

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!authController.estaAutenticado()) {
        window.location.href = 'login.html';
        return;
    }

    const usuario = authController.obtenerUsuarioActual();
    const logoutBtn = document.getElementById('logoutBtn');

    // Mostrar nombre del usuario
    if (usuario) {
        document.getElementById('userName').textContent = usuario.nombre;
    }

    logoutBtn.addEventListener('click', cerrarSesion);

    // Cargar estadísticas
    cargarEstadisticas();
    cargarMedicamentosStockBajo();

    /**
     * Carga las estadísticas del dashboard
     */
    function cargarEstadisticas() {
        const medicamentos = medicamentoController.obtenerTodos();
        const usuarios = authController.obtenerUsuarios();
        const medicamentosStockBajo = medicamentoController.obtenerStockBajo();

        // Calcular categorías únicas
        const categorias = new Set(medicamentos.map(m => m.categoria));

        // Actualizar DOM
        document.getElementById('totalMedicamentos').textContent = medicamentos.length;
        document.getElementById('stockBajo').textContent = medicamentosStockBajo.length;
        document.getElementById('totalUsuarios').textContent = usuarios.length;
        document.getElementById('totalCategorias').textContent = categorias.size;
    }

    /**
     * Carga los medicamentos con stock bajo
     */
    function cargarMedicamentosStockBajo() {
        const medicamentosStockBajo = medicamentoController.obtenerStockBajo();
        const container = document.getElementById('stockBajoContainer');

        if (medicamentosStockBajo.length === 0) {
            container.innerHTML = '<p>No hay medicamentos con stock bajo</p>';
            return;
        }

        container.innerHTML = medicamentosStockBajo.map(med => `
            <div class="medicamento-item">
                <h4>${med.nombre}</h4>
                <p>Stock actual: <strong class="alert">${med.stock}</strong></p>
                <a href="medicamentos.html" class="btn btn-sm">Ver detalles</a>
            </div>
        `).join('');
    }

    /**
     * Cierra la sesión
     */
    function cerrarSesion() {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            authController.logout();
            window.location.href = 'login.html';
        }
    }
});
