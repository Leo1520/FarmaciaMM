/**
 * EJEMPLO: Cómo usar AJAX en tus vistas
 * Este archivo muestra patrones de uso para las principales funcionalidades
 */

// ════════════════════════════════════════════════════════════
// 1. LOGIN CON AJAX (SIN RECARGA DE PÁGINA)
// ════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Elemento: el formulario de login
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Obtener datos del formulario
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validar (opcional)
            if (!email || !password) {
                NOTIFY.error('Email y contraseña son requeridos');
                return;
            }
            
            try {
                // Hacer login vía AJAX
                // El loader se muestra automáticamente
                const response = await AJAX.post('/auth/login', {
                    email,
                    password
                });
                
                if (response.success) {
                    // Guardar token y usuario
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    
                    // Mostrar notificación
                    NOTIFY.success(`¡Bienvenido, ${response.data.user.nombre}!`);
                    
                    // Redirigir con transición suave
                    await SCREEN.transition(
                        () => {
                            window.location.href = '/src/views/dashboard.html';
                        },
                        500
                    );
                }
            } catch (error) {
                console.error('Error de login:', error);
                // El error se maneja automáticamente en AJAX.handleError
            }
        });
    }
});


// ════════════════════════════════════════════════════════════
// 2. LISTADO DE MEDICAMENTOS CON AJAX
// ════════════════════════════════════════════════════════════

class MedicamentosUI {
    constructor() {
        this.container = document.getElementById('medicamentosContainer');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.filterSelect = document.getElementById('categoryFilter');
        this.medicamentos = [];
    }

    init() {
        this.cargarMedicamentos();
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => this.buscar());
        }
        
        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.buscar();
            });
        }
        
        if (this.filterSelect) {
            this.filterSelect.addEventListener('change', () => this.filtrar());
        }
    }

    /**
     * Cargar medicamentos desde el servidor
     * Sin esto: Las medicinas nunca se actualizarían
     * Con AJAX: Se actualiza en tiempo real
     */
    async cargarMedicamentos() {
        try {
            // Mostrar skeleton loader
            this.mostrarSkeleton();
            
            // Obtener con caché de 5 minutos (más rápido en buscar repetidas)
            const response = await AJAX.get('/medicamentos', { cache: true });
            
            if (response.success) {
                this.medicamentos = response.data;
                this.renderizar(this.medicamentos);
            }
        } catch (error) {
            this.mostrarError('Error cargando medicamentos');
        }
    }

    /**
     * Buscar medicamentos por nombre o código
     * El servidor busca y AJAX retorna sin recargar
     */
    async buscar() {
        const termino = this.searchInput?.value.trim();
        
        if (!termino) {
            this.cargarMedicamentos();
            return;
        }

        try {
            SCREEN.showLoading();
            
            // Buscar en servidor
            const response = await AJAX.get(
                `/medicamentos/buscar?q=${encodeURIComponent(termino)}`
            );
            
            if (response.success) {
                this.medicamentos = response.data;
                this.renderizar(this.medicamentos);
            }
        } catch (error) {
            this.mostrarError('Error en búsqueda');
        } finally {
            SCREEN.hideLoading();
        }
    }

    /**
     * Filtrar por categoría
     */
    async filtrar() {
        const categoria = this.filterSelect?.value;
        
        if (!categoria) {
            this.cargarMedicamentos();
            return;
        }

        try {
            const response = await AJAX.get(
                `/medicamentos/categoria/${categoria}`
            );
            
            if (response.success) {
                this.medicamentos = response.data;
                this.renderizar(this.medicamentos);
            }
        } catch (error) {
            this.mostrarError('Error filtrando');
        }
    }

    /**
     * Renderizar medicamentos en la tabla/grid
     */
    renderizar(items) {
        if (!this.container) return;

        if (items.length === 0) {
            this.container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📦</div>
                    <div class="empty-state-title">No hay medicamentos</div>
                    <div class="empty-state-text">
                        Intenta otra búsqueda o crea un nuevo medicamento
                    </div>
                </div>
            `;
            return;
        }

        this.container.innerHTML = items.map(med => `
            <div class="medicamento-card" onclick="medicamentosUI.editarMedicamento(${med.id})">
                <h3>${med.nombre}</h3>
                <p class="codigo">Código: ${med.codigo}</p>
                <p class="precio">$${med.precio.toFixed(2)}</p>
                <p class="vence">Vence: ${new Date(med.fechaVencimiento).toLocaleDateString()}</p>
                <div class="card-actions">
                    <button onclick="event.stopPropagation(); medicamentosUI.editarMedicamento(${med.id})" 
                            class="btn btn-sm btn-primary">
                        Editar
                    </button>
                    <button onclick="event.stopPropagation(); medicamentosUI.eliminarMedicamento(${med.id})" 
                            class="btn btn-sm btn-danger">
                        Eliminar
                    </button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Editar medicamento
     */
    async editarMedicamento(id) {
        const medicamento = this.medicamentos.find(m => m.id === id);
        if (!medicamento) return;

        // Llenar formulario modal
        document.getElementById('editNombre').value = medicamento.nombre;
        document.getElementById('editCodigo').value = medicamento.codigo;
        document.getElementById('editPrecio').value = medicamento.precio;

        // Mostrar modal
        const modal = document.getElementById('editModal');
        if (modal) modal.style.display = 'block';

        // Guardar cambios
        document.getElementById('editForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();

            const datosActualizados = {
                nombre: document.getElementById('editNombre').value,
                codigo: document.getElementById('editCodigo').value,
                precio: parseFloat(document.getElementById('editPrecio').value)
            };

            try {
                // Actualizar en servidor vía AJAX
                const response = await AJAX.put(
                    `/medicamentos/${id}`,
                    datosActualizados
                );

                if (response.success) {
                    NOTIFY.success('✅ Medicamento actualizado');
                    modal.style.display = 'none';
                    
                    // Limpiar caché para refrescar lista
                    AJAX.cache.invalidatePattern('/medicamentos');
                    
                    // Recargar lista sin refrescar página
                    this.cargarMedicamentos();
                }
            } catch (error) {
                NOTIFY.error('Error actualizando medicamento');
            }
        });
    }

    /**
     * Eliminar medicamento
     */
    async eliminarMedicamento(id) {
        try {
            // AJAX.delete pide confirmación automáticamente
            const response = await AJAX.delete(`/medicamentos/${id}`);

            if (response.success) {
                NOTIFY.success('✅ Medicamento eliminado');
                
                // Limpiar medicamento de array local
                this.medicamentos = this.medicamentos.filter(m => m.id !== id);
                
                // Limpiar caché y refrescar
                AJAX.cache.invalidatePattern('/medicamentos');
                this.renderizar(this.medicamentos);
            }
        } catch (error) {
            NOTIFY.error('Error eliminando medicamento');
        }
    }

    mostrarSkeleton() {
        if (!this.container) return;
        this.container.innerHTML = `
            <div class="skeleton-card">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
            </div>
            <div class="skeleton-card">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
            </div>
            <div class="skeleton-card">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
            </div>
        `;
    }

    mostrarError(mensaje) {
        if (!this.container) return;
        this.container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <div class="empty-state-title">Error</div>
                <div class="empty-state-text">${mensaje}</div>
            </div>
        `;
    }
}

// Inicializar cuando el DOM esté listo
let medicamentosUI;
document.addEventListener('DOMContentLoaded', () => {
    medicamentosUI = new MedicamentosUI();
    medicamentosUI.init();
});


// ════════════════════════════════════════════════════════════
// 3. CREAR NUEVO MEDICAMENTO
// ════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    const formNuevoMedicamento = document.getElementById('formNuevoMedicamento');
    
    if (formNuevoMedicamento) {
        formNuevoMedicamento.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Obtener datos del formulario
            const formData = new FormData(formNuevoMedicamento);
            const nuevoMedicamento = Object.fromEntries(formData);

            try {
                // Crear vía AJAX (POST)
                const response = await AJAX.post('/medicamentos', nuevoMedicamento);

                if (response.success) {
                    NOTIFY.success('✅ Medicamento creado exitosamente');
                    formNuevoMedicamento.reset();
                    
                    // Limpiar caché y refrescar lista
                    AJAX.cache.invalidatePattern('/medicamentos');
                    
                    // Cerrar modal (si existe)
                    const modal = document.getElementById('nuevoMedicamentoModal');
                    if (modal) modal.style.display = 'none';
                    
                    // Refrescar lista
                    if (medicamentosUI) {
                        medicamentosUI.cargarMedicamentos();
                    }
                }
            } catch (error) {
                NOTIFY.error('Error creando medicamento');
            }
        });
    }
});


// ════════════════════════════════════════════════════════════
// 4. BÚSQUEDA POR VOZ (BONUS)
// ════════════════════════════════════════════════════════════

class VoiceSearch {
    constructor() {
        this.btn = document.getElementById('voiceSearchBtn');
        this.input = document.getElementById('searchInput');
        this.recognition = this.initSpeechRecognition();
        this.isListening = false;
    }

    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('Speech Recognition no soportado en este navegador');
            return null;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        
        recognition.onstart = () => {
            this.isListening = true;
            if (this.btn) this.btn.classList.add('listening');
        };

        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            
            // Mostrar en input
            if (this.input) this.input.value = transcript;
            
            // Buscar automáticamente
            if (medicamentosUI) medicamentosUI.buscar();
        };

        recognition.onend = () => {
            this.isListening = false;
            if (this.btn) this.btn.classList.remove('listening');
        };

        recognition.onerror = (error) => {
            NOTIFY.error(`Error de voz: ${error.error}`);
        };

        return recognition;
    }

    toggle() {
        if (!this.recognition) {
            NOTIFY.error('Búsqueda por voz no disponible');
            return;
        }

        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    }
}

// Inicializar búsqueda por voz
let voiceSearch;
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('voiceSearchBtn');
    if (btn) {
        voiceSearch = new VoiceSearch();
        btn.addEventListener('click', () => voiceSearch.toggle());
    }
});


// ════════════════════════════════════════════════════════════
// 5. EXPORTAR A EXCEL
// ════════════════════════════════════════════════════════════

async function exportarExcel() {
    try {
        SCREEN.showLoading();
        
        // Descargar reporte Excel desde servidor
        const response = await fetch('/api/reportes/excel', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) throw new Error('Error descargando archivo');

        // Crear blob y descargar
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `medicamentos_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        NOTIFY.success('✅ Archivo descargado');
    } catch (error) {
        NOTIFY.error('Error descargando archivo');
    } finally {
        SCREEN.hideLoading();
    }
}


/**
 * RESUMEN
 * 
 * Este archivo muestra cómo usar AJAX para:
 * 1. ✅ Login sin recargar página
 * 2. ✅ Cargar medicamentos en tiempo real
 * 3. ✅ Buscar sin recargar
 * 4. ✅ Editar medicamentos
 * 5. ✅ Eliminar medicamentos
 * 6. ✅ Búsqueda por voz
 * 7. ✅ Exportar a Excel
 * 
 * TODO ESTO EN TIEMPO REAL, SIN RECARGAR LA PÁGINA
 */
