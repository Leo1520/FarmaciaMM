/**
 * Modelo de Medicamento
 * Gestiona los datos y lógica relacionada con medicamentos
 */
class Medicamento {
    constructor(id = null, nombre = '', descripcion = '', precio = 0, stock = 0, categoria = '') {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.fechaCreacion = new Date();
    }

    /**
     * Valida los datos del medicamento
     */
    validar() {
        if (!this.nombre || this.nombre.trim() === '') {
            throw new Error('El nombre del medicamento es requerido');
        }
        if (this.precio <= 0) {
            throw new Error('El precio debe ser mayor a 0');
        }
        if (this.stock < 0) {
            throw new Error('El stock no puede ser negativo');
        }
        return true;
    }

    /**
     * Verifica si hay stock disponible
     */
    hayStock(cantidad = 1) {
        return this.stock >= cantidad;
    }

    /**
     * Reduce el stock
     */
    reducirStock(cantidad = 1) {
        if (this.hayStock(cantidad)) {
            this.stock -= cantidad;
            return true;
        }
        return false;
    }

    /**
     * Aumenta el stock
     */
    aumentarStock(cantidad = 1) {
        this.stock += cantidad;
    }

    /**
     * Convierte a JSON
     */
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            stock: this.stock,
            categoria: this.categoria,
            fechaCreacion: this.fechaCreacion
        };
    }
}
