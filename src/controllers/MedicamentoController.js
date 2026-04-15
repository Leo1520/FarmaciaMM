/**
 * Controlador de Medicamentos
 * Gestiona la lógica de medicamentos (CRUD)
 */
class MedicamentoController {
    constructor() {
        this.medicamentos = this.obtenerMedicamentos();
    }

    /**
     * Obtiene todos los medicamentos
     */
    obtenerTodos() {
        return this.medicamentos;
    }

    /**
     * Obtiene un medicamento por ID
     */
    obtenerPorId(id) {
        return this.medicamentos.find(m => m.id === id);
    }

    /**
     * Busca medicamentos por nombre o categoría
     */
    buscar(termino, campo = 'nombre') {
        return this.medicamentos.filter(m => 
            m[campo].toLowerCase().includes(termino.toLowerCase())
        );
    }

    /**
     * Crea un nuevo medicamento
     */
    crear(nombre, descripcion, precio, stock, categoria) {
        try {
            const medicamento = new Medicamento(
                Date.now(),
                nombre,
                descripcion,
                precio,
                stock,
                categoria
            );
            medicamento.validar();

            this.medicamentos.push(medicamento.toJSON());
            this.guardarMedicamentos();

            return { success: true, medicamento: medicamento.toJSON() };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Actualiza un medicamento
     */
    actualizar(id, datos) {
        try {
            const index = this.medicamentos.findIndex(m => m.id === id);
            if (index === -1) {
                throw new Error('Medicamento no encontrado');
            }

            this.medicamentos[index] = { ...this.medicamentos[index], ...datos };
            this.guardarMedicamentos();

            return { success: true, medicamento: this.medicamentos[index] };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Elimina un medicamento
     */
    eliminar(id) {
        try {
            const index = this.medicamentos.findIndex(m => m.id === id);
            if (index === -1) {
                throw new Error('Medicamento no encontrado');
            }

            const eliminado = this.medicamentos.splice(index, 1);
            this.guardarMedicamentos();

            return { success: true, medicamento: eliminado[0] };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Obtiene medicamentos por categoría
     */
    obtenerPorCategoria(categoria) {
        return this.medicamentos.filter(m => m.categoria === categoria);
    }

    /**
     * Obtiene medicamentos con stock bajo
     */
    obtenerStockBajo(limite = 10) {
        return this.medicamentos.filter(m => m.stock < limite);
    }

    /**
     * Guarda medicamentos en localStorage
     */
    guardarMedicamentos() {
        localStorage.setItem('medicamentos', JSON.stringify(this.medicamentos));
    }

    /**
     * Obtiene medicamentos de localStorage
     */
    obtenerMedicamentos() {
        const data = localStorage.getItem('medicamentos');
        return data ? JSON.parse(data) : this.datosIniciales();
    }

    /**
     * Datos iniciales de prueba
     */
    datosIniciales() {
        const medicamentos = [
            { id: 1, nombre: 'Paracetamol', descripcion: 'Analgésico y antipirético', precio: 5.99, stock: 50, categoria: 'Analgésicos' },
            { id: 2, nombre: 'Ibuprofeno', descripcion: 'Antiinflamatorio', precio: 7.99, stock: 30, categoria: 'Antiinflamatorios' },
            { id: 3, nombre: 'Amoxicilina', descripcion: 'Antibiótico', precio: 12.99, stock: 20, categoria: 'Antibióticos' }
        ];
        localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
        return medicamentos;
    }
}
