/**
 * Script de Registro de Medicamento - Controlador de Vistas
 * Gestiona la creación de nuevos medicamentos
 */

const authController = new AuthController();
const medicamentoController = new MedicamentoController();

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!authController.estaAutenticado()) {
        window.location.href = 'login.html';
        return;
    }

    const formMedicamento = document.getElementById('formMedicamento');
    const messageContainer = document.getElementById('messageContainer');
    const logoutBtn = document.getElementById('logoutBtn');

    formMedicamento.addEventListener('submit', guardarMedicamento);
    logoutBtn.addEventListener('click', cerrarSesion);

    /**
     * Guarda un nuevo medicamento
     */
    function guardarMedicamento(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const stock = parseInt(document.getElementById('stock').value);
        const categoria = document.getElementById('categoria').value;

        // Validaciones
        if (!Validaciones.noEstaVacio(nombre)) {
            mostrarMensaje('El nombre del medicamento es requerido', 'error');
            return;
        }

        if (!Validaciones.noEstaVacio(descripcion)) {
            mostrarMensaje('La descripción es requerida', 'error');
            return;
        }

        if (!Validaciones.esPositivo(precio)) {
            mostrarMensaje('El precio debe ser mayor a 0', 'error');
            return;
        }

        if (stock < 0) {
            mostrarMensaje('El stock no puede ser negativo', 'error');
            return;
        }

        if (!Validaciones.noEstaVacio(categoria)) {
            mostrarMensaje('Debes seleccionar una categoría', 'error');
            return;
        }

        // Crear medicamento
        const resultado = medicamentoController.crear(nombre, descripcion, precio, stock, categoria);

        if (resultado.success) {
            mostrarMensaje('¡Medicamento creado correctamente!', 'success');
            formMedicamento.reset();

            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = 'medicamentos.html';
            }, 2000);
        } else {
            mostrarMensaje('Error: ' + resultado.error, 'error');
        }
    }

    /**
     * Muestra un mensaje en la interfaz
     */
    function mostrarMensaje(mensaje, tipo = 'info') {
        messageContainer.innerHTML = `<div class="alert alert-${tipo}">${mensaje}</div>`;
        messageContainer.style.display = 'block';

        if (tipo === 'error') {
            setTimeout(() => {
                messageContainer.style.display = 'none';
            }, 5000);
        }
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
