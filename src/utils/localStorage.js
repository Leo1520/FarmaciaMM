/**
 * Utilidades para localStorage
 * Proporciona funciones auxiliares para trabajar con almacenamiento local
 */
const StorageUtil = {
    /**
     * Guarda un objeto en localStorage
     */
    set(clave, valor) {
        try {
            localStorage.setItem(clave, typeof valor === 'string' ? valor : JSON.stringify(valor));
            return true;
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
            return false;
        }
    },

    /**
     * Obtiene un valor de localStorage
     */
    get(clave, esJSON = true) {
        try {
            const valor = localStorage.getItem(clave);
            return esJSON && valor ? JSON.parse(valor) : valor;
        } catch (error) {
            console.error('Error leyendo de localStorage:', error);
            return null;
        }
    },

    /**
     * Elimina un valor de localStorage
     */
    remove(clave) {
        try {
            localStorage.removeItem(clave);
            return true;
        } catch (error) {
            console.error('Error eliminando de localStorage:', error);
            return false;
        }
    },

    /**
     * Limpia todo localStorage
     */
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error limpiando localStorage:', error);
            return false;
        }
    },

    /**
     * Verifica si existe una clave
     */
    exists(clave) {
        return localStorage.getItem(clave) !== null;
    }
};
