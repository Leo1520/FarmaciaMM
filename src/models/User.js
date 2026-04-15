/**
 * Modelo de Usuario
 * Gestiona los datos y lógica relacionada con usuarios
 */
class User {
    constructor(id = null, nombre = '', email = '', contraseña = '', rol = 'usuario') {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
        this.rol = rol; // 'admin' o 'usuario'
        this.fechaCreacion = new Date();
    }

    /**
     * Valida los datos del usuario
     */
    validar() {
        if (!this.nombre || this.nombre.trim() === '') {
            throw new Error('El nombre es requerido');
        }
        if (!this.email || !this.email.includes('@')) {
            throw new Error('El email es inválido');
        }
        if (!this.contraseña || this.contraseña.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }
        return true;
    }

    /**
     * Convierte a JSON
     */
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            rol: this.rol,
            fechaCreacion: this.fechaCreacion
        };
    }
}
