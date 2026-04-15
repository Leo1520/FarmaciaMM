/**
 * Script de Login - Controlador de Vistas
 * Gestiona los eventos y la lógica de presentación del login
 */

const authController = new AuthController();

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageContainer = document.getElementById('messageContainer');

    // Redirigir si ya está autenticado
    if (authController.estaAutenticado()) {
        window.location.href = 'dashboard.html';
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validar campos
        if (!Validaciones.esEmailValido(email)) {
            mostrarMensaje('Email inválido', 'error');
            return;
        }

        if (!Validaciones.noEstaVacio(password)) {
            mostrarMensaje('La contraseña es requerida', 'error');
            return;
        }

        // Realizar login
        const resultado = authController.login(email, password);

        if (resultado.success) {
            mostrarMensaje('¡Bienvenido! Redirigiendo...', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            mostrarMensaje(resultado.error, 'error');
        }
    });

    /**
     * Muestra un mensaje en la interfaz
     */
    function mostrarMensaje(mensaje, tipo = 'info') {
        messageContainer.innerHTML = `<div class="alert alert-${tipo}">${mensaje}</div>`;
        messageContainer.style.display = 'block';

        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 5000);
    }
});
