# 🔄 DIAGRAMA DE ARQUITECTURA - AJAX EN TIEMPO REAL

## TOPOLOGÍA DEL SISTEMA

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                         USUARIO (Navegador Web)                           ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │                      FRONTEND (HTML/JS/CSS)                         │ ║
║  │                                                                     │ ║
║  │  • login.html          ← Formularios sin submit tradicional       │ ║
║  │  • medicamentos.html   ← Tabla dinámica actualizada en vivo       │ ║
║  │  • dashboard.html      ← Gráficos e información real-time         │ ║
║  │                                                                     │ ║
║  │  ┌───────────────────────────────────────────────────────────┐    │ ║
║  │  │          SISTEMA AJAX (public/js/ajax.js)                │    │ ║
║  │  │                                                           │    │ ║
║  │  │  AJAX.get()    → GET con caché inteligente              │    │ ║
║  │  │  AJAX.post()   → POST con loader automático             │    │ ║
║  │  │  AJAX.put()    → PUT con confirmación                   │    │ ║
║  │  │  AJAX.delete() → DELETE con prompt                      │    │ ║
║  │  │                                                           │    │ ║
║  │  │  NOTIFY.success() → Toast notifications green           │    │ ║
║  │  │  NOTIFY.error()   → Toast notifications red             │    │ ║
║  │  │  NOTIFY.info()    → Toast notifications blue            │    │ ║
║  │  │                                                           │    │ ║
║  │  │  SCREEN.showLoading()  → Spinner overlay                │    │ ║
║  │  │  SCREEN.hideLoading()  → Oculta spinner                 │    │ ║
║  │  └───────────────────────────────────────────────────────────┘    │ ║
║  │                           ↓ HTTP/HTTPS                             │ ║
║  │                    (Fetch API + JWT)                               │ ║
║  │                                                                     │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
╚═════════════════════════════════════════════════════════════════════════════╝
                                     ↓
                              INTERNET / RED
                                     ↓
╔═════════════════════════════════════════════════════════════════════════════╗
║                    BACKEND (Node.js + Express) :3000                        ║
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │                      EXPRESS SERVER                                 │   ║
║  │                                                                     │   ║
║  │  ┌──────────────────────────────────────────────────────────────┐  │   ║
║  │  │ MIDDLEWARE STACK (Procesa cada request)                     │  │   ║
║  │  │                                                              │  │   ║
║  │  │ 1. body-parser        → Parsea JSON                        │  │   ║
║  │  │ 2. helmet             → Headers de seguridad               │  │   ║
║  │  │ 3. cors               → Valida origen(whitelist)           │  │   ║
║  │  │ 4. customLogger       → Registra requests                  │  │   ║
║  │  │ 5. auth (opcional)    → Verifica JWT token                 │  │   ║
║  │  │ 6. routes             → Atiende endpoint específico         │  │   ║
║  │  │                                                              │  │   ║
║  │  └──────────────────────────────────────────────────────────────┘  │   ║
║  │                                                                     │   ║
║  │  ┌──────────────────────────────────────────────────────────────┐  │   ║
║  │  │ RUTAS API (Routes)                                          │  │   ║
║  │  │                                                              │  │   ║
║  │  │ POST   /api/auth/login       → AuthController.login()      │  │   ║
║  │  │ POST   /api/auth/register    → AuthController.register()   │  │   ║
║  │  │ GET    /api/medicamentos     → MediController.getAll()     │  │   ║
║  │  │ POST   /api/medicamentos     → MediController.create()     │  │   ║
║  │  │ PUT    /api/medicamentos/:id → MediController.update()     │  │   ║
║  │  │ DELETE /api/medicamentos/:id → MediController.delete()     │  │   ║
║  │  │                                                              │  │   ║
║  │  └──────────────────────────────────────────────────────────────┘  │   ║
║  │                           ↓ Controllers                              │   ║
║  │  ┌──────────────────────────────────────────────────────────────┐  │   ║
║  │  │ CONTROLLERS (Lógica de negocio)                             │  │   ║
║  │  │                                                              │  │   ║
║  │  │ • Valida datos recibidos                                    │  │   ║
║  │  │ • Aplica reglas de negocio                                  │  │   ║
║  │  │ • Llama a modelos/datos                                     │  │   ║
║  │  │ • Formatea respuesta standard                               │  │   ║
║  │  │                                                              │  │   ║
║  │  └──────────────────────────────────────────────────────────────┘  │   ║
║  │                           ↓ Query/Insert/Update/Delete              │   ║
║  │                                                                     │   ║
║  │  ┌──────────────────────────────────────────────────────────────┐  │   ║
║  │  │ FIREBASE (Backend como Servicio)                            │  │   ║
║  │  │                                                              │  │   ║
║  │  │ ┌──────────────────────────────────────────────────────┐   │  │   ║
║  │  │ │ FIRESTORE (Base de Datos)                          │   │  │   ║
║  │  │ │  • Usuarios (email, contraseña, rol)              │   │  │   ║
║  │  │ │  • Medicamentos (nombre, precio, stock)           │   │  │   ║
║  │  │ │  • Alertas (producto, cantidad mínima)            │   │  │   ║
║  │  │ │  • Logs (auditoría de cambios)                    │   │  │   ║
║  │  │ └──────────────────────────────────────────────────────┘   │  │   ║
║  │  │                                                              │  │   ║
║  │  │ ┌──────────────────────────────────────────────────────┐   │  │   ║
║  │  │ │ FIREBASE AUTH (Autenticación)                      │   │  │   ║
║  │  │ │  • Valida email/contraseña                         │   │  │   ║
║  │  │ │  • Genera ID tokens                                │   │  │   ║
║  │  │ │  • Maneja sesiones de usuario                      │   │  │   ║
║  │  │ └──────────────────────────────────────────────────────┘   │  │   ║
║  │  │                                                              │  │   ║
║  │  │ ┌──────────────────────────────────────────────────────┐   │  │   ║
║  │  │ │ STORAGE (Almacenamiento de archivos)               │   │  │   ║
║  │  │ │  • Imágenes de medicamentos                         │   │  │   ║
║  │  │ │  • Reportes en Excel                               │   │  │   ║
║  │  │ │  • Documentos y PDFs                               │   │  │   ║
║  │  │ └──────────────────────────────────────────────────────┘   │  │   ║
║  │  │                                                              │  │   ║
║  │  └──────────────────────────────────────────────────────────────┘  │   ║
║  │                                                                     │   ║
║  └─────────────────────────────────────────────────────────────────────┘   ║
║                                                                             ║
╚═════════════════════════════════════════════════════════════════════════════╝
```

---

## FLUJO DE UN EJEMPLO: CREAR MEDICAMENTO

### 1️⃣ FRONTEND → Usuario hace clic en "Agregar Medicamento"

```javascript
// En medicamentos.html
document.getElementById('btnAgregar').addEventListener('click', async () => {
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    
    // 2️⃣ Usuario vuelve a hacer clic (todavía no envía)
});
```

### 2️⃣ AJAX obtiene información

```javascript
const response = await AJAX.post('/api/medicamentos', {
    nombre: 'Ibuprofeno',
    precio: 5.99
});

// ⚙️ AJAX.post() internamente:
// 1. Valida que nombre y precio no sean vacíos
// 2. Obtiene JWT token de localStorage
// 3. Prepara headers con Content-Type: application/json
// 4. Agrega Authorization: Bearer <token>
// 5. Muestra SCREEN (loader overlay gris)
// 6. Hace fetch POST con los datos
```

### 3️⃣ BACKEND recibe request

```
POST /api/medicamentos HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Origin: http://localhost:5173

{
    "nombre": "Ibuprofeno",
    "precio": 5.99
}
```

### 4️⃣ MIDDLEWARE (Orden de ejecución)

```
┌─ 1. body-parser
│   └─ Parsea JSON → { nombre: 'Ibuprofeno', precio: 5.99 }
│
├─ 2. helmet
│   └─ Agrega headers: X-Content-Type-Options: nosniff, etc.
│
├─ 3. cors
│   └─ Valida: ¿Origin = http://localhost:5173? ✅ Permitido
│
├─ 4. customLogger
│   └─ Log: "POST /api/medicamentos - 2026-04-15 10:30:00"
│
├─ 5. auth (si está protegida)
│   └─ Verifica: ¿Token válido y no expirado? ✅ OK
│       └─ Extrae: { userId: '123', rol: 'admin' } → req.user
│
└─ 6. Route handler
    └─ POST /api/medicamentos → Llama MediController.create()
```

### 5️⃣ CONTROLLER (Lógica)

```javascript
// backend/src/controllers/mediController.js

async function create(req, res) {
    try {
        // Validación
        const { nombre, precio } = req.body;
        if (!nombre || !precio) {
            return res.status(400).json({
                success: false,
                message: 'Nombre y precio son requeridos'
            });
        }
        
        // Verificar permisos
        if (req.user.rol !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para crear medicamentos'
            });
        }
        
        // Guardar en Firebase
        const docRef = await db.collection('medicamentos').add({
            nombre,
            precio,
            createdAt: new Date(),
            createdBy: req.user.userId
        });
        
        // Respuesta estandarizada
        res.status(201).json({
            success: true,
            message: 'Medicamento creado correctamente',
            data: {
                id: docRef.id,
                nombre,
                precio
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear medicamento: ' + error.message
        });
    }
}
```

### 6️⃣ FIREBASE (Persist)

```
Firestore Document:
┌─────────────────────────────────────┐
│ Collection: medicamentos            │
├─────────────────────────────────────┤
│ Document ID: A1B2C3D4E5F6G7H8I9J0K │
├─────────────────────────────────────┤
│ {                                   │
│   nombre: "Ibuprofeno"             │
│   precio: 5.99                      │
│   createdAt: 2026-04-15 10:30:00   │
│   createdBy: "user123"             │
│ }                                   │
└─────────────────────────────────────┘
```

### 7️⃣ BACKEND → FRONTEND (Respuesta)

```
HTTP/1.1 201 Created
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:5173

{
    "success": true,
    "message": "Medicamento creado correctamente",
    "data": {
        "id": "A1B2C3D4E5F6G7H8I9J0K",
        "nombre": "Ibuprofeno",
        "precio": 5.99
    }
}
```

### 8️⃣ AJAX procesa respuesta

```javascript
// AJAX automáticamente:
// 1. Verifica status === 201 ✅ OK
// 2. Parsea JSON response
// 3. Oculta SCREEN (loader)
// 4. Invalida caché de /api/medicamentos
// 5. Retorna objeto { success, message, data }
```

### 9️⃣ FRONTEND renderiza

```javascript
// En medicamentos.html continúa:
if (response.success) {
    // ✅ Mostrar notificación
    NOTIFY.success(response.message);
    
    // ✅ Agregar fila a tabla
    const tabla = document.getElementById('tbMedicamentos');
    const fila = tabla.insertRow();
    fila.innerHTML = `
        <td>${response.data.id}</td>
        <td>${response.data.nombre}</td>
        <td>$${response.data.precio}</td>
        <td><button onclick="editarMedicamento('${response.data.id}')">Editar</button></td>
        <td><button onclick="eliminarMedicamento('${response.data.id}')">Eliminar</button></td>
    `;
    
    // ✅ Limpiar formulario
    document.getElementById('mediForm').reset();
} else {
    // ❌ Mostrar error
    NOTIFY.error(response.message);
}
```

### 🔟 VISUALMENTE EN NAVEGADOR

```
┌─────────────────────────────────────────┐
│ 🔄 Cargando...            [Spinner]     │
└─────────────────────────────────────────┘
                    ↓
         (0.5 segundos después)
                    ↓
┌─────────────────────────────────────────┐
│  ✅ Medicamento creado correctamente    │
│  (toast notificación verde arriba-dcha) │
└─────────────────────────────────────────┘
                    ↓
         (Tabla se actualiza automáticamente)
                    ↓
┌───────────────────────────────────────────────┐
│ ID          Medicina      Precio    Acciones  │
├───────────────────────────────────────────────┤
│ A1B2C3...   Ibuprofeno    $5.99     Editar ×  │  ← NUEVO
│ B2C3D4...   Paracetamol   $3.99     Editar ×  │
│ C3D4E5...   Amoxicilina   $7.50     Editar ×  │
└───────────────────────────────────────────────┘
```

---

## CACHÉ INTELIGENTE

```
AJAX.get('/api/medicamentos', { cache: true })

┌──────────────────────────────────────────────┐
│ Primer llamado (0 segundos)                  │
│  → No está en caché                          │
│  → Hace fetch real a servidor                │
│  → Guarda respuesta en memoria               │
│  → Retorna datos                             │
│  ⏱️ Tiempo: 200ms                             │
└──────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────┐
│ Segundo llamado (2 segundos después)         │
│  → Revisa caché (TTL=5 min)                  │
│  → Datos encontrados y no expirados ✅       │
│  → Retorna datos de caché ✨                 │
│  ⏱️ Tiempo: <1ms (instantáneo)                │
└──────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────┐
│ Tercer llamado (5 min 10 seg después)        │
│  → Revisa caché (TTL expirado) ⏰            │
│  → Hace nuevo fetch a servidor               │
│  → Actualiza caché                           │
│  → Retorna datos frescos                     │
│  ⏱️ Tiempo: 200ms (nueva búsqueda)            │
└──────────────────────────────────────────────┘
```

---

## MANEJO DE ERRORES

### Caso: Token expirado (401)

```
AJAX.post('/api/medicamentos', data)
         ↓
[BACKEND retorna 401 Unauthorized]
         ↓
[AJAX detecta status 401]
         ↓
[AJAX.js línea xxx:]
if (status === 401) {
    localStorage.removeItem('authToken');
    NOTIFY.error('Sesión expirada. Inicia sesión nuevamente');
    window.location.href = '/login/';
}
```

### Caso: Permiso denegado (403)

```
AJAX.delete('/api/medicamentos/123')
         ↓
[BACKEND retorna 403 Forbidden - No es admin]
         ↓
[AJAX detecta status 403]
         ↓
[AJAX.js línea xxx:]
if (status === 403) {
    NOTIFY.error('No tienes permiso para hacer esto');
    // Usuario sigue en la página actual
}
```

### Caso: Recurso no encontrado (404)

```
AJAX.put('/api/medicamentos/NOEXISTE', data)
         ↓
[BACKEND retorna 404 Not Found]
         ↓
[AJAX detecta status 404]
         ↓
[AJAX.js línea xxx:]
if (status === 404) {
    NOTIFY.error('El medicamento no existe');
}
```

### Caso: Error del servidor (500)

```
AJAX.get('/api/medicamentos')
         ↓
[BACKEND lanza excepción → retorna 500]
         ↓
[AJAX detecta status 500]
         ↓
[AJAX.js línea xxx:]
if (status >= 500) {
    NOTIFY.error('Error del servidor. Intenta más tarde');
    console.error('Error:', response);
}
```

---

## FLUJO DE AUTENTICACIÓN

```
┌─────────────────────────────────────────────────────┐
│                 LOGIN (Fase 1)                      │
└─────────────────────────────────────────────────────┘

1. Usuario ingresa email + contraseña en login.html
               ↓
2. AJAX.post('/api/auth/login', { email, password })
               ↓
3. Backend → Firebase Auth API valida credenciales
               ↓
4. Si OK → Generar JWT token con 7 días expiry
               ↓
5. Retornar: { success: true, token, user: {...} }
               ↓
6. Frontend guarda en localStorage['authToken'] = token
               ↓
7. Redirige a dashboard.html (sin recargar)
               ↓
8. Dashboard.html valida token localmente
               ↓
9. Token incluido en TODOS los AJAX headers
               ↓
10. Backend verifica token => req.user disponible


┌─────────────────────────────────────────────────────┐
│              AUTENTICACIÓN EN HEADERS               │
└─────────────────────────────────────────────────────┘

AJAX.get('/api/medicamentos')

Headers enviados:
{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-cache'
}

Backend procesa:
1. Middleware auth.js extrae: token = header['Authorization']
2. Verifica signature con JWT_SECRET
3. Decodifica → { userId, email, rol, exp }
4. Valida que exp > Date.now()
5. Attach a req.user = { userId, email, rol }
6. Controllers acceden via req.user
```

---

## RESPUESTAS ESTANDARIZADAS

```javascript
// ✅ ÉXITO (200, 201, 204)
{
    "success": true,
    "message": "Medicamento creado correctamente",
    "data": {
        "id": "A1B2C3",
        "nombre": "Ibuprofeno",
        "precio": 5.99
    }
}

// ✅ ÉXITO CON PAGINACIÓN (200)
{
    "success": true,
    "message": "Medicamentos obtenidos",
    "data": [
        { "id": "A1", "nombre": "Ibu", "precio": 5.99 },
        { "id": "A2", "nombre": "Para", "precio": 3.99 }
    ],
    "pagination": {
        "total": 50,
        "page": 1,
        "pageSize": 2,
        "pages": 25
    }
}

// ❌ ERROR 400 (Bad Request)
{
    "success": false,
    "message": "Nombre y precio son requeridos",
    "errors": {
        "nombre": "Este campo es requerido",
        "precio": "Debe ser un número positivo"
    }
}

// ❌ ERROR 401 (No autenticado)
{
    "success": false,
    "message": "Sesión expirada. Por favor inicia sesión nuevamente"
}

// ❌ ERROR 403 (No autorizado)
{
    "success": false,
    "message": "No tienes permiso para hacer esto",
    "requiredRole": "admin",
    "yourRole": "usuario"
}

// ❌ ERROR 500 (Servidor)
{
    "success": false,
    "message": "Error interno del servidor",
    "error": "TypeError: Cannot read property 'nombre' of undefined"
}
```

---

## CICLO DE VIDA DE UN COMPONENTE

```
medicamentos.html CARGA
        ↓
1. Script carga AJAX.js ✅
2. Script carga ajax-loader.css ✅
3. DOMContentLoaded event dispara:
        ↓
   // Obtener lista inicial
   AJAX.get('/api/medicamentos', { cache: true })
        ↓
   // Mostrar skeleton while loading
   SCREEN.showSkeleton('.medicamentos-list')
        ↓
   // Ocultar skeleton, mostrar datos
   SCREEN.hideSkeleton()
   renderMedicamentos(data)
        ↓
   // Usuario hace clic en un botón
        ↓
AJAX.post() / AJAX.put() / AJAX.delete()
        ↓
// Actualizar tabla
renderMedicamentos(newData)
        ↓
// Notificar al usuario
NOTIFY.success('Acción realizada')
        ↓
[Vuelve al paso: Usuario hace clic en un botón]
```

---

**Este diagrama muestra cómo TODO está interconectado sin recargar la página.** ✨

¿Preguntas sobre cómo funciona alguna parte específica?
