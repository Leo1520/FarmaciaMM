/**
 * Script de Medicamentos - Controlador de Vistas
 * Gestiona la lista de medicamentos
 */

const authController = new AuthController();
const medicamentoController = new MedicamentoController();
let medicamentoActual = null;

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!authController.estaAutenticado()) {
        window.location.href = 'login.html';
        return;
    }

    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const logoutBtn = document.getElementById('logoutBtn');
    const modal = document.getElementById('detalleModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Event listeners
    searchBtn.addEventListener('click', realizarBusqueda);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') realizarBusqueda();
    });

    categoryFilter.addEventListener('change', filtrarPorCategoria);
    logoutBtn.addEventListener('click', cerrarSesion);
    closeModalBtn.addEventListener('click', cerrarModal);

    // Cargar medicamentos
    cargarMedicamentos();

    /**
     * Carga y muestra todos los medicamentos
     */
    function cargarMedicamentos() {
        const medicamentos = medicamentoController.obtenerTodos();
        mostrarMedicamentos(medicamentos);
    }

    /**
     * Muestra los medicamentos en el DOM
     */
    function mostrarMedicamentos(medicamentos) {
        const container = document.getElementById('medicamentosContainer');
        
        if (medicamentos.length === 0) {
            container.innerHTML = '<p class="no-results">No hay medicamentos disponibles</p>';
            return;
        }

        container.innerHTML = medicamentos.map(med => `
            <div class="medicamento-card" onclick="verDetalle(${med.id})">
                <h3>${med.nombre}</h3>
                <p class="categoria">${med.categoria}</p>
                <p class="precio">$${med.precio.toFixed(2)}</p>
                <p class="stock">Stock: ${med.stock}</p>
            </div>
        `).join('');
    }

    /**
     * Realiza búsqueda de medicamentos
     */
    function realizarBusqueda() {
        const termino = searchInput.value.trim();
        if (!termino) {
            cargarMedicamentos();
            return;
        }

        const resultados = medicamentoController.buscar(termino);
        mostrarMedicamentos(resultados);
    }

    /**
     * Filtra por categoría
     */
    function filtrarPorCategoria() {
        const categoria = categoryFilter.value;
        if (!categoria) {
            cargarMedicamentos();
            return;
        }

        const resultados = medicamentoController.obtenerPorCategoria(categoria);
        mostrarMedicamentos(resultados);
    }

    /**
     * Ver detalles del medicamento
     */
    window.verDetalle = function(id) {
        medicamentoActual = medicamentoController.obtenerPorId(id);
        
        if (!medicamentoActual) {
            alert('Medicamento no encontrado');
            return;
        }

        document.getElementById('modalTitle').textContent = medicamentoActual.nombre;
        document.getElementById('modalDescription').textContent = medicamentoActual.descripcion;
        document.getElementById('modalPrice').textContent = medicamentoActual.precio.toFixed(2);
        document.getElementById('modalStock').textContent = medicamentoActual.stock;
        document.getElementById('modalCategory').textContent = medicamentoActual.categoria;

        // Configurar botones
        document.getElementById('editBtn').onclick = editarMedicamento;
        document.getElementById('deleteBtn').onclick = eliminarMedicamento;

        modal.style.display = 'block';
    };

    /**
     * Cierra el modal
     */
    function cerrarModal() {
        modal.style.display = 'none';
        medicamentoActual = null;
    }

    /**
     * Edita el medicamento
     */
    function editarMedicamento() {
        if (!medicamentoActual) return;
        // Aquí iría la lógica de edición
        alert('Función de edición en desarrollo');
    }

    /**
     * Elimina el medicamento
     */
    function eliminarMedicamento() {
        if (!medicamentoActual) return;

        if (confirm(`¿Estás seguro de que deseas eliminar "${medicamentoActual.nombre}"?`)) {
            const resultado = medicamentoController.eliminar(medicamentoActual.id);
            
            if (resultado.success) {
                alert('Medicamento eliminado correctamente');
                cerrarModal();
                cargarMedicamentos();
            } else {
                alert('Error: ' + resultado.error);
            }
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

    // Permitir cerrar modal al hacer clic en el fondo
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });
});
