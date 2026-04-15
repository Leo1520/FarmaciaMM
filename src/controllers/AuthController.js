/**
 * Controlador de Autenticación
 * Gestiona la lógica de login y registro de usuarios
 */
class AuthController {
    constructor() {
        this.usuarioActual = localStorage.getItem('usuarioActual') 
            ? JSON.parse(localStorage.getItem('usuarioActual')) 
            : null;
    }

    /**
     * Realiza el login del usuario
     */
    login(email, contraseña) {
        try {
            // Simular búsqueda en base de datos
            const usuarios = this.obtenerUsuarios();
            const usuario = usuarios.find(u => u.email === email && u.contraseña === contraseña);

            if (!usuario) {
                throw new Error('Email o contraseña incorrectos');
            }

            this.usuarioActual = usuario;
            localStorage.setItem('usuarioActual', JSON.stringify(usuario));
            localStorage.setItem('token', 'token_' + Date.now());

            return { success: true, usuario: usuario };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Realiza el registro de un nuevo usuario
     */
    registro(nombre, email, contraseña) {
        try {
            const usuario = new User(Date.now(), nombre, email, contraseña, 'usuario');
            usuario.validar();

            const usuarios = this.obtenerUsuarios();
            if (usuarios.some(u => u.email === email)) {
                throw new Error('El email ya está registrado');
            }

            usuarios.push(usuario.toJSON());
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            return { success: true, mensaje: 'Usuario registrado correctamente' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Cierra la sesión del usuario
     */
    logout() {
        this.usuarioActual = null;
        localStorage.removeItem('usuarioActual');
        localStorage.removeItem('token');
        return { success: true, mensaje: 'Sesión cerrada' };
    }

    /**
     * Obtiene el usuario actual
     */
    obtenerUsuarioActual() {
        return this.usuarioActual;
    }

    /**
     * Verifica si hay usuario autenticado
     */
    estaAutenticado() {
        return this.usuarioActual !== null && localStorage.getItem('token') !== null;
    }

    /**
     * Obtiene todos los usuarios (simulado)
     */
    obtenerUsuarios() {
        return JSON.parse(localStorage.getItem('usuarios') || '[]');
    }
}
