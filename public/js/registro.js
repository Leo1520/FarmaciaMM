/**
 * Script de Registro - Controlador de Vistas
 * Gestiona los eventos y la lógica de presentación del registro
 */

const authController = new AuthController();

document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    const messageContainer = document.getElementById('messageContainer');

    // Redirigir si ya está autenticado
    if (authController.estaAutenticado()) {
        window.location.href = 'dashboard.html';
    }

    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validaciones
        if (!Validaciones.noEstaVacio(nombre)) {
            mostrarMensaje('El nombre es requerido', 'error');
            return;
        }

        if (!Validaciones.esEmailValido(email)) {
            mostrarMensaje('Email inválido', 'error');
            return;
        }

        if (!Validaciones.validarLongitud(password, 6)) {
            mostrarMensaje('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        if (password !== confirmPassword) {
            mostrarMensaje('Las contraseñas no coinciden', 'error');
            return;
        }

        // Realizar registro
        const resultado = authController.registro(nombre, email, password);

        if (resultado.success) {
            mostrarMensaje('¡Registro exitoso! Redirigiendo al login...', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
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

        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 5000);
    }
});
