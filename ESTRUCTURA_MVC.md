# 🏥 Farmacia MM - Estructura Modelo-Vista-Controlador (MVC)

## Descripción General

Este proyecto sigue la arquitectura **Modelo-Vista-Controlador (MVC)**, que es un patrón de diseño que separa la aplicación en tres capas principales:

- **Modelo (M)**: Gestiona los datos y la lógica de negocio
- **Vista (V)**: Presenta la interfaz al usuario
- **Controlador (C)**: Coordina la interacción entre Modelo y Vista

## 📁 Estructura de Directorios

```
FarmaciaMM/
│
├── 📄 index.html                      # Punto de entrada (redirecciona según autenticación)
│
├── 📂 src/                            # Código fuente
│   ├── 📂 models/                     # Modelos de datos
│   │   ├── User.js                    # Modelo de Usuario
│   │   └── Medicamento.js             # Modelo de Medicamento
│   │
│   ├── 📂 controllers/                # Controladores de lógica
│   │   ├── AuthController.js          # Gestiona autenticación
│   │   └── MedicamentoController.js   # Gestiona medicamentos
│   │
│   ├── 📂 views/                      # Vistas (archivos HTML)
│   │   ├── login.html                 # Página de login
│   │   ├── registro.html              # Página de registro
│   │   ├── dashboard.html             # Panel principal
│   │   ├── medicamentos.html          # Lista de medicamentos
│   │   └── registroMedicamento.html   # Formulario de medicamento
│   │
│   └── 📂 utils/                      # Funciones utilitarias
│       ├── localStorage.js            # Utilidades para almacenamiento
│       └── validaciones.js            # Funciones de validación
│
├── 📂 public/                         # Archivos públicos/estáticos
│   ├── 📂 css/                        # Hojas de estilo
│   │   ├── styles.css                 # Estilos globales
│   │   ├── login.css                  # Estilos de login
│   │   ├── registro.css               # Estilos de registro
│   │   ├── dashboard.css              # Estilos del dashboard
│   │   ├── medicamentos.css           # Estilos de medicamentos
│   │   └── registroMedicamento.css    # Estilos del formulario
│   │
│   └── 📂 js/                         # Scripts de las vistas (controladores)
│       ├── login.js                   # Lógica de la vista login
│       ├── registro.js                # Lógica de la vista registro
│       ├── dashboard.js               # Lógica del dashboard
│       ├── medicamentos.js            # Lógica de medicamentos
│       └── registroMedicamento.js     # Lógica del formulario medicamento
│
├── 📂 img/                            # Imágenes de la aplicación
│
├── 📂 login/                          # Archivos del sistema anterior (deprecados)
│
└── 📄 README.md                       # Este archivo

```

## 🎯 Arquitectura MVC Explicada

### 1. **Modelos** (`src/models/`)
Los modelos representan los datos y la lógica de negocio:

```javascript
// User.js
class User {
    constructor(id, nombre, email, contraseña, rol) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
        this.rol = rol;
    }
    
    validar() {
        // Lógica de validación
    }
}
```

### 2. **Controladores** (`src/controllers/`)
Los controladores manejan la lógica de negocio y las operaciones CRUD:

```javascript
// MedicamentoController.js
class MedicamentoController {
    obtenerTodos() { /* ... */ }
    crear(datos) { /* ... */ }
    actualizar(id, datos) { /* ... */ }
    eliminar(id) { /* ... */ }
}
```

### 3. **Vistas** (`src/views/`)
Las vistas son archivos HTML que presentan la interfaz al usuario:

```html
<!-- medicamentos.html -->
<div id="medicamentosContainer">
    <!-- Contenido dinámico aquí -->
</div>
```

### 4. **Controladores de Vista** (`public/js/`)
Scripts que coordinan la interacción entre Vista y Controlador:

```javascript
// medicamentos.js
const medicamentoController = new MedicamentoController();

document.addEventListener('DOMContentLoaded', function() {
    cargarMedicamentos();
});

function cargarMedicamentos() {
    const medicamentos = medicamentoController.obtenerTodos();
    mostrarMedicamentos(medicamentos);
}
```

## 🔄 Flujo de Datos

```
Usuario interactúa con la Vista (HTML)
        ↓
Evento capturado en Script de Vista (public/js/)
        ↓
Script llama al Controlador (src/controllers/)
        ↓
Controlador procesa con el Modelo (src/models/)
        ↓
Datos guardados en localStorage
        ↓
Script actualiza la Vista con los nuevos datos
```

## 📝 Ejemplo: Crear un Medicamento

### 1. Usuario completa el formulario (Vista)
```html
<form id="formMedicamento">
    <input id="nombre" placeholder="Nombre">
    <input id="precio" placeholder="Precio">
</form>
```

### 2. Script captura el evento (Controlador de Vista)
```javascript
// public/js/registroMedicamento.js
formMedicamento.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    
    const resultado = medicamentoController.crear(nombre, precio);
});
```

### 3. Controlador procesa la lógica (Controlador)
```javascript
// src/controllers/MedicamentoController.js
crear(nombre, precio) {
    const medicamento = new Medicamento(nombre, precio);
    medicamento.validar();
    this.medicamentos.push(medicamento);
    this.guardarMedicamentos();
}
```

### 4. Datos se guardan en localStorage (Modelo)
```javascript
guardarMedicamentos() {
    localStorage.setItem('medicamentos', JSON.stringify(this.medicamentos));
}
```

## 🛠️ Características Implementadas

### Autenticación
- Login de usuarios
- Registro de nuevos usuarios
- Control de sesiones
- Logout

### Gestión de Medicamentos
- Listar medicamentos
- Crear medicamentos
- Editar medicamentos
- Eliminar medicamentos
- Buscar medicamentos
- Filtrar por categoría
- Ver stock disponible

### Dashboard
- Estadísticas de medicamentos
- Alertas de stock bajo
- Total de usuarios
- Categorías disponibles

## 🔐 Autenticación

La aplicación usa `localStorage` para simular autenticación:

```javascript
// LOGIN
localStorage.setItem('usuarioActual', JSON.stringify(usuario));
localStorage.setItem('token', 'token_' + Date.now());

// VERIFICACIÓN
if (localStorage.getItem('usuarioActual') && localStorage.getItem('token')) {
    // Usuario autenticado
}

// LOGOUT
localStorage.removeItem('usuarioActual');
localStorage.removeItem('token');
```

## 🎨 Estilos

- **Global** (`public/css/styles.css`): Estilos compartidos, botones, formularios
- **Específicos**: Cada vista tiene su propio archivo CSS para estilos personalizados

Variables CSS predefinidas:
```css
--primary-color: #2c3e50
--secondary-color: #3498db
--success-color: #27ae60
--danger-color: #e74c3c
```

## 🚀 Cómo Usar

### Iniciar la aplicación
1. Abre `index.html` en tu navegador
2. Si no estás autenticado, serás redirigido a `login.html`
3. Usa las credenciales de prueba o registra un nuevo usuario

### Crear un usuario de prueba
```javascript
// En la consola del navegador
const auth = new AuthController();
auth.registro('Juan Pérez', 'juan@example.com', '123456');
```

### Agregar medicamentos de prueba
```javascript
// En la consola del navegador
const med = new MedicamentoController();
med.crear('Paracetamol', 'Analgésico', 5.99, 50, 'Analgésicos');
```

## 📌 Notas Importantes

1. **Almacenamiento**: Los datos se guardan en `localStorage`, por lo que se pierden al limpiar datos del navegador
2. **Seguridad**: Para producción, implementar un backend seguro con autenticación real
3. **Validación**: Se usa la clase `Validaciones` para validar datos en el cliente
4. **Responsabilidad Simple**: Cada controlador se encarga de su dominio específico

## 🔄 Integración Futura

Para conectar un backend:

1. Reemplazar `localStorage` con llamadas a API
2. Cambiar `fetch` en lugar de operaciones locales
3. Implementar JWT o sessiones de servidor
4. Mover lógica de negocio al backend

```javascript
// Ejemplo futuro
async crear(nombre, precio) {
    const response = await fetch('/api/medicamentos', {
        method: 'POST',
        body: JSON.stringify({ nombre, precio })
    });
    return await response.json();
}
```

## 📚 Ventajas del Patrón MVC

✅ **Separación de Responsabilidades**: Cada parte tiene un rol claro
✅ **Mantenibilidad**: Fácil de entender y modificar
✅ **Reutilización**: Los controladores pueden usarse con diferentes vistas
✅ **Testing**: Más fácil de probar cada componente
✅ **Escalabilidad**: Fácil agregar nuevas características

---

**Versión**: 1.0  
**Última actualización**: Abril 2026  
**Autor**: Farmacia MM Development Team
