# 🎯 Guía Rápida de la Estructura MVC

## Estructura de Archivos Reorganizada

```
📦 FarmaciaMM/
│
├── 📄 index.html (PUNTO DE ENTRADA)
│   └─→ Redirige según autenticación
│
├── 📂 src/ (CÓDIGO FUENTE - LÓGICA)
│   ├── 📂 models/ (DATOS Y VALIDACIONES)
│   │   ├── User.js (Modelo de usuario)
│   │   └── Medicamento.js (Modelo de medicamento)
│   │
│   ├── 📂 controllers/ (LÓGICA DE NEGOCIO)
│   │   ├── AuthController.js (Login/Registro)
│   │   └── MedicamentoController.js (CRUD medicamentos)
│   │
│   ├── 📂 views/ (INTERFAZ - HTML)
│   │   ├── login.html
│   │   ├── registro.html
│   │   ├── dashboard.html
│   │   ├── medicamentos.html
│   │   └── registroMedicamento.html
│   │
│   └── 📂 utils/ (UTILIDADES COMPARTIDAS)
│       ├── localStorage.js (Gestión de datos locales)
│       └── validaciones.js (Funciones de validación)
│
└── 📂 public/ (ARCHIVOS PÚBLICOS - ESTILOS Y SCRIPTS DE VISTA)
    ├── 📂 css/ (HOJAS DE ESTILO)
    │   ├── styles.css (Estilos globales)
    │   ├── login.css
    │   ├── registro.css
    │   ├── dashboard.css
    │   ├── medicamentos.css
    │   └── registroMedicamento.css
    │
    └── 📂 js/ (SCRIPTS DE PRESENTACIÓN - CONTROLADORES DE VISTA)
        ├── login.js (Lógica interactiva)
        ├── registro.js
        ├── dashboard.js
        ├── medicamentos.js
        └── registroMedicamento.js
```

## 🔗 Flujo de Datos

```
┌─────────────────────────────────────────────────────────┐
│              VISTA (HTML + CSS)                         │
│         (src/views/*.html)                              │
│   - Formularios                                         │
│   - Botones                                             │
│   - Elementos visuales                                  │
└────────────┬────────────────────────────────────────────┘
             │ El usuario interactúa
             ↓
┌─────────────────────────────────────────────────────────┐
│      CONTROLADOR DE VISTA (JavaScript)                  │
│         (public/js/*.js)                                │
│   - Captura eventos (click, submit, etc)               │
│   - Valida entrada del usuario                         │
│   - Llama a los controladores                          │
└────────────┬────────────────────────────────────────────┘
             │ Solicita lógica de negocio
             ↓
┌─────────────────────────────────────────────────────────┐
│      CONTROLADOR (Business Logic)                       │
│    (src/controllers/*.js)                               │
│   - AuthController (Autenticación)                     │
│   - MedicamentoController (Operaciones CRUD)           │
│   - Procesa reglas de negocio                          │
└────────────┬────────────────────────────────────────────┘
             │ Usa objetos de datos
             ↓
┌─────────────────────────────────────────────────────────┐
│    MODELO (Data & Validation)                           │
│    (src/models/*.js)                                    │
│   - User (Estructura de usuario)                       │
│   - Medicamento (Estructura de medicamento)            │
│   - Métodos de validación                              │
└────────────┬────────────────────────────────────────────┘
             │ Accede a almacenamiento
             ↓
┌─────────────────────────────────────────────────────────┐
│      ALMACENAMIENTO (localStorage)                      │
│         (Datos persistentes)                            │
│   - usuarios                                            │
│   - medicamentos                                        │
│   - usuarioActual (sesión)                             │
│   - token (sesión)                                     │
└─────────────────────────────────────────────────────────┘
```

## 📋 Mapeo de Funcionalidades

### Login (login.html)
```
Archivo HTML:       src/views/login.html
Script:             public/js/login.js
Controlador:        src/controllers/AuthController.js
Modelo:             src/models/User.js
Estilos:            public/css/login.css
Funciones:          login(), logout()
```

### Registro (registro.html)
```
Archivo HTML:       src/views/registro.html
Script:             public/js/registro.js
Controlador:        src/controllers/AuthController.js
Modelo:             src/models/User.js
Estilos:            public/css/registro.css
Funciones:          registro(), validarContraseña()
```

### Dashboard (dashboard.html)
```
Archivo HTML:       src/views/dashboard.html
Script:             public/js/dashboard.js
Controlador:        src/controllers/MedicamentoController.js
Modelo:             src/models/Medicamento.js
Estilos:            public/css/dashboard.css
Funciones:          cargarEstadísticas(), mostrarStockBajo()
```

### Lista de Medicamentos (medicamentos.html)
```
Archivo HTML:       src/views/medicamentos.html
Script:             public/js/medicamentos.js
Controlador:        src/controllers/MedicamentoController.js
Modelo:             src/models/Medicamento.js
Estilos:            public/css/medicamentos.css
Funciones:          obtenerTodos(), buscar(), filtrar()
```

### Crear Medicamento (registroMedicamento.html)
```
Archivo HTML:       src/views/registroMedicamento.html
Script:             public/js/registroMedicamento.js
Controlador:        src/controllers/MedicamentoController.js
Modelo:             src/models/Medicamento.js
Estilos:            public/css/registroMedicamento.css
Funciones:          crear(), guardarMedicamentos()
```

## 🚀 Cómo Añadir una Nueva Funcionalidad

### Ejemplo: Agregar "Editar Medicamento"

1. **Modelo** (`src/models/Medicamento.js`)
   ```javascript
   actualizar(datos) {
       // Validar y actualizar propiedades
   }
   ```

2. **Controlador** (`src/controllers/MedicamentoController.js`)
   ```javascript
   actualizar(id, datos) {
       const medicamento = this.obtenerPorId(id);
       medicamento.actualizar(datos);
       this.guardarMedicamentos();
   }
   ```

3. **Vista** (`src/views/medicamentos.html`)
   ```html
   <button onclick="editarMedicamento(${med.id})">Editar</button>
   ```

4. **Controlador de Vista** (`public/js/medicamentos.js`)
   ```javascript
   function editarMedicamento(id) {
       const medicamento = medicamentoController.obtenerPorId(id);
       // Mostrar formulario de edición
       medicamentoController.actualizar(id, nuevosDatos);
   }
   ```

## 🔌 Integración con Backend

Para conectar con un servidor:

```javascript
// ANTES (localStorage)
obtenerMedicamentos() {
    return JSON.parse(localStorage.getItem('medicamentos') || '[]');
}

// DESPUÉS (API)
async obtenerMedicamentos() {
    const response = await fetch('/api/medicamentos');
    return await response.json();
}
```

## 📚 Archivos de Referencia

- **ESTRUCTURA_MVC.md** - Guía completa del proyecto
- **FIREBASE_CONFIG.md** - Configuración de Firebase (si aplica)
- **.git/** - Control de versiones

## ✅ Checklist de Desarrollo

- [ ] Crear Modelo (definir estructura de datos)
- [ ] Crear Controlador (implementar lógica)
- [ ] Crear Vista HTML (diseñar interfaz)
- [ ] Crear Script JS (conectar vista con controlador)
- [ ] Crear CSS (estilizar)
- [ ] Probar funcionalidad completa
- [ ] Documentar cambios

---

**💡 Tip**: Mantén cada archivo simple y enfocado en una sola responsabilidad.
