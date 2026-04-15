/**
 * Utilidades para validaciones
 * Proporciona funciones para validar diferentes tipos de datos
 */
const Validaciones = {
    /**
     * Valida un email
     */
    esEmailValido(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    /**
     * Valida que una cadena no esté vacía
     */
    noEstaVacio(texto) {
        return texto && texto.trim().length > 0;
    },

    /**
     * Valida que un número sea positivo
     */
    esPositivo(numero) {
        return !isNaN(numero) && numero > 0;
    },

    /**
     * Valida la longitud de una cadena
     */
    validarLongitud(texto, minimo, maximo = null) {
        const longitud = texto.length;
        if (longitud < minimo) return false;
        if (maximo && longitud > maximo) return false;
        return true;
    },

    /**
     * Valida una contraseña fuerte
     */
    esContraseñaFuerte(contraseña) {
        // Mínimo 8 caracteres, debe incluir mayúscula, minúscula, número
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(contraseña);
    },

    /**
     * Valida un teléfono
     */
    esTelefonoValido(telefono) {
        const regex = /^[\d\s\-\+\(\)]{7,}$/;
        return regex.test(telefono);
    }
};
