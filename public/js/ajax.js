/**
 * Sistema mejorado de AJAX con tiempo real
 * Reemplaza fetch tradicional de REST con llamadas asincrónicas
 * 
 * USO:
 * const response = await AJAX.get('/api/medicamentos');
 * const data = await AJAX.post('/api/medicamentos', { nombre: 'Paracetamol' });
 * await AJAX.put('/api/medicamentos/1', { precio: 5.99 });
 * await AJAX.delete('/api/medicamentos/1');
 */

const AJAX = {
    /**
     * Configuración base
     */
    baseURL: process.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 30000, // 30 segundos
    
    /**
     * Obtener token JWT del localStorage
     */
    getToken: () => {
        return localStorage.getItem('token') || null;
    },

    /**
     * Headers por defecto con autenticación
     */
    getHeaders: (custom = {}) => {
        const headers = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        };

        const token = AJAX.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return { ...headers, ...custom };
    },

    /**
     * GET - Obtener datos (con caché opcional)
     */
    get: async (endpoint, options = {}) => {
        try {
            const url = `${AJAX.baseURL}${endpoint}`;
            
            // Verificar caché
            if (options.cache && AJAX.cache.has(endpoint)) {
                console.log(`📦 Caché: ${endpoint}`);
                return AJAX.cache.get(endpoint);
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: AJAX.getHeaders(),
                timeout: options.timeout || AJAX.timeout,
                ...options
            });

            return AJAX.handleResponse(response, endpoint);
        } catch (error) {
            AJAX.handleError(error, endpoint);
        }
    },

    /**
     * POST - Crear datos (con loading automático)
     */
    post: async (endpoint, data = {}, options = {}) => {
        try {
            const url = `${AJAX.baseURL}${endpoint}`;
            
            // Mostrar loading
            if (options.showLoading !== false) {
                SCREEN.showLoading();
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: AJAX.getHeaders(),
                body: JSON.stringify(data),
                timeout: options.timeout || AJAX.timeout
            });

            const result = await AJAX.handleResponse(response, endpoint);
            
            // Ocultar loading
            if (options.showLoading !== false) {
                SCREEN.hideLoading();
            }

            return result;
        } catch (error) {
            SCREEN.hideLoading();
            AJAX.handleError(error, endpoint);
        }
    },

    /**
     * PUT - Actualizar datos (con loading automático)
     */
    put: async (endpoint, data = {}, options = {}) => {
        try {
            const url = `${AJAX.baseURL}${endpoint}`;
            
            if (options.showLoading !== false) {
                SCREEN.showLoading();
            }

            const response = await fetch(url, {
                method: 'PUT',
                headers: AJAX.getHeaders(),
                body: JSON.stringify(data),
                timeout: options.timeout || AJAX.timeout
            });

            const result = await AJAX.handleResponse(response, endpoint);
            
            if (options.showLoading !== false) {
                SCREEN.hideLoading();
            }

            return result;
        } catch (error) {
            SCREEN.hideLoading();
            AJAX.handleError(error, endpoint);
        }
    },

    /**
     * DELETE - Eliminar datos (con confirmación)
     */
    delete: async (endpoint, options = {}) => {
        try {
            // Pedir confirmación
            if (options.confirm !== false) {
                if (!confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
                    return null;
                }
            }

            const url = `${AJAX.baseURL}${endpoint}`;
            
            SCREEN.showLoading();

            const response = await fetch(url, {
                method: 'DELETE',
                headers: AJAX.getHeaders(),
                timeout: options.timeout || AJAX.timeout
            });

            const result = await AJAX.handleResponse(response, endpoint);
            SCREEN.hideLoading();

            return result;
        } catch (error) {
            SCREEN.hideLoading();
            AJAX.handleError(error, endpoint);
        }
    },

    /**
     * PATCH - Actualización parcial
     */
    patch: async (endpoint, data = {}, options = {}) => {
        try {
            const url = `${AJAX.baseURL}${endpoint}`;
            
            const response = await fetch(url, {
                method: 'PATCH',
                headers: AJAX.getHeaders(),
                body: JSON.stringify(data),
                timeout: options.timeout || AJAX.timeout
            });

            return AJAX.handleResponse(response, endpoint);
        } catch (error) {
            AJAX.handleError(error, endpoint);
        }
    },

    /**
     * Procesar respuesta del servidor
     */
    handleResponse: async (response, endpoint) => {
        const data = await response.json();

        if (!response.ok) {
            // Error del servidor
            const error = new Error(data.message || `Error ${response.status}`);
            error.status = response.status;
            error.data = data;
            throw error;
        }

        // Éxito: guardar en caché si es GET
        if (response.status === 200 && AJAX.cache) {
            console.log(`💾 Caché guardado: ${endpoint}`);
            AJAX.cache.set(endpoint, data, 5 * 60 * 1000); // 5 minutos
        }

        return data;
    },

    /**
     * Procesar errores
     */
    handleError: (error, endpoint) => {
        console.error(`❌ Error en ${endpoint}:`, error.message);

        // 401 - No autenticado
        if (error.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/src/views/login.html';
            return;
        }

        // 403 - No autorizado
        if (error.status === 403) {
            NOTIFY.error('No tienes permisos para hacer esto');
            return;
        }

        // 404 - No encontrado
        if (error.status === 404) {
            NOTIFY.error('El recurso no fue encontrado');
            return;
        }

        // Otros errores
        NOTIFY.error(error.message || 'Ocurrió un error en la solicitud');
        throw error;
    },

    /**
     * Sistema de caché en memoria
     */
    cache: {
        store: new Map(),
        timers: new Map(),

        set: (key, value, ttl = 5 * 60 * 1000) => {
            // Limpiar timer anterior
            if (AJAX.cache.timers.has(key)) {
                clearTimeout(AJAX.cache.timers.get(key));
            }

            // Guardar valor
            AJAX.cache.store.set(key, value);

            // Auto-limpiar después de TTL
            const timer = setTimeout(() => {
                AJAX.cache.store.delete(key);
                AJAX.cache.timers.delete(key);
            }, ttl);

            AJAX.cache.timers.set(key, timer);
        },

        get: (key) => {
            return AJAX.cache.store.get(key) || null;
        },

        has: (key) => {
            return AJAX.cache.store.has(key);
        },

        clear: () => {
            AJAX.cache.store.clear();
            AJAX.cache.timers.forEach(timer => clearTimeout(timer));
            AJAX.cache.timers.clear();
        },

        // Invalidar un endpoint específico
        invalidate: (endpoint) => {
            AJAX.cache.store.delete(endpoint);
            if (AJAX.cache.timers.has(endpoint)) {
                clearTimeout(AJAX.cache.timers.get(endpoint));
                AJAX.cache.timers.delete(endpoint);
            }
        },

        // Invalidar todos los que coincidan con patrón
        invalidatePattern: (pattern) => {
            const regex = new RegExp(pattern);
            for (const [key] of AJAX.cache.store) {
                if (regex.test(key)) {
                    AJAX.cache.invalidate(key);
                }
            }
        }
    },

    /**
     * Upload de archivos (fotos, documentos)
     */
    uploadFile: async (endpoint, file, onProgress = null) => {
        try {
            SCREEN.showLoading();

            const formData = new FormData();
            formData.append('file', file);

            const xhr = new XMLHttpRequest();

            // Progress
            if (onProgress) {
                xhr.upload.addEventListener('progress', (e) => {
                    if (e.lengthComputable) {
                        const percentComplete = (e.loaded / e.total) * 100;
                        onProgress(percentComplete);
                    }
                });
            }

            return new Promise((resolve, reject) => {
                xhr.addEventListener('load', () => {
                    SCREEN.hideLoading();
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(new Error(`Error ${xhr.status}`));
                    }
                });

                xhr.addEventListener('error', () => {
                    SCREEN.hideLoading();
                    reject(new Error('Error en upload'));
                });

                xhr.open('POST', `${AJAX.baseURL}${endpoint}`);
                xhr.setRequestHeader('Authorization', `Bearer ${AJAX.getToken()}`);
                xhr.send(formData);
            });
        } catch (error) {
            SCREEN.hideLoading();
            AJAX.handleError(error, endpoint);
        }
    }
};

/**
 * Sistema de notificaciones
 */
const NOTIFY = {
    show: (message, type = 'info', duration = 3000) => {
        const container = document.getElementById('notificationsContainer') || 
                         NOTIFY.createContainer();

        const notification = document.createElement('div');
        notification.className = `notification alert-${type} show`;
        notification.innerHTML = `
            <div class="notification-content">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'} 
                ${message}
            </div>
        `;

        container.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    },

    success: (message) => NOTIFY.show(message, 'success', 3000),
    error: (message) => NOTIFY.show(message, 'error', 5000),
    info: (message) => NOTIFY.show(message, 'info', 3000),

    createContainer: () => {
        const container = document.createElement('div');
        container.id = 'notificationsContainer';
        container.className = 'notifications-container';
        document.body.appendChild(container);
        return container;
    }
};

/**
 * Control de pantallas de carga y transiciones
 */
const SCREEN = {
    showLoading: () => {
        let loader = document.getElementById('mainLoader');
        if (!loader) {
            loader = SCREEN.createLoader();
        }
        loader.classList.add('active');
    },

    hideLoading: () => {
        const loader = document.getElementById('mainLoader');
        if (loader) {
            loader.classList.remove('active');
        }
    },

    createLoader: () => {
        const loader = document.createElement('div');
        loader.id = 'mainLoader';
        loader.className = 'loader-overlay';
        loader.innerHTML = `
            <div class="loader-spinner">
                <div class="spinner"></div>
                <p>Cargando...</p>
            </div>
        `;
        document.body.appendChild(loader);
        return loader;
    },

    // Transición suave entre páginas
    transition: async (callback, duration = 300) => {
        SCREEN.showLoading();
        await new Promise(resolve => setTimeout(resolve, duration));
        await callback();
        SCREEN.hideLoading();
    }
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AJAX, NOTIFY, SCREEN };
}
