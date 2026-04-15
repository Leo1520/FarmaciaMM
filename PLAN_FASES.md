# 📋 PLAN ESTRATÉGICO - FARMACIA MM
**Control de Inventario de Medicamentos con Búsqueda por Voz**

---

## 📊 RESUMEN EJECUTIVO

| Aspecto | Especificación |
|---------|----------------|
| **Proyecto** | Sistema de Control de Medicamentos |
| **Base de Datos** | Firebase (Firestore) + LocalStorage |
| **Backend** | Node.js + Express (Vercel compatible) |
| **Frontend** | JavaScript Vanilla + PWA |
| **Roles** | Admin, Trabajador, Invitado |
| **Duración Estimada** | 6-8 semanas |
| **Prioridad** | MVP en 3-4 semanas |

---

## 🎯 CARACTERÍSTICAS PRINCIPALES

### ✅ Núcleo del Sistema
- [x] Listado de medicamentos (pantalla principal)
- [x] Búsqueda por nombre y código
- [x] Búsqueda por voz (con botón)
- [x] CRUD completo (Crear, Leer, Actualizar, Eliminar)
- [x] Sistema de autenticación con roles
- [x] Alertas de stock bajo
- [x] Control de lotes y fechas de vencimiento
- [x] Reportes/Exportación a Excel
- [x] Pantallas de carga en puntos estratégicos
- [x] Responsive design

---

## 📅 FASES DEL PROYECTO

### **FASE 0: SETUP Y PREPARACIÓN (Semana 1)**

#### Tareas:
- [ ] Configurar Firebase (Firestore + Authentication)
- [ ] Configurar repositorio Git
- [ ] Crear estructura de carpetas mejorada
- [ ] Instalar dependencias (Express, dotenv, etc.)
- [ ] Crear archivo `.env` con configuración

```
Deliverable:
✓ Firebase proyecto creado
✓ Backend Node.js inicializado
✓ Estructura completa de carpetas
✓ Repo Git configurado
```

**Estimación:** 5-7 días

---

### **FASE 1: AUTENTICACIÓN Y ROLES (Semana 1-2)**

#### Subtareas:

**1.1 - Sistema de Roles**
```
Roles a implementar:
├── ADMIN
│   └── Puede: crear usuarios, editar todo, ver reportes, eliminar
├── TRABAJADOR
│   └── Puede: crear medicamentos, editar, buscar, no eliminar
└── INVITADO
    └── Puede: solo buscar y ver
```

**1.2 - Firebase Authentication**
```javascript
// Implementar:
• signUp(email, password, nombre, rol)
• signIn(email, password)
• signOut()
• getCurrentUser()
• verifyRole(requiredRole)
```

**1.3 - Actualizar Login.html**
```
Funcionalidad:
✓ Validar email y contraseña
✓ Guardar token en localStorage
✓ Guardar rol del usuario
✓ Redirigir según rol
✓ Recordar sesión
```

**1.4 - Crear Dashboard por Rol**
```
Admin:
├── Panel con estadísticas completas
├── Gestión de usuarios
├── Reportes
└── Configuración

Trabajador:
├── Listado de medicamentos
├── Búsqueda
├── CRUD (excepto eliminar)
└── Alertas de vencimiento

Invitado:
├── Solo listado
├── Solo búsqueda
└── Ver detalles
```

**Deliverable:**
```
✓ Login con validación conectado a Firebase
✓ 3 tipos de usuarios creados en Firebase
✓ Dashboard diferenciado por rol
✓ Protección de rutas según rol
✓ Sesión persistente
```

**Estimación:** 8-10 días

---

### **FASE 2: MODELO DE DATOS Y API (Semana 2-3)**

#### 2.1 - Estructura de Firestore

```javascript
firestore/
├── users/
│   ├── uid
│   ├── email
│   ├── nombre
│   ├── rol
│   ├── activo
│   └── fechaCreacion
│
├── medicamentos/
│   ├── id (generado)
│   ├── nombre
│   ├── codigo (único)
│   ├── descripcion
│   ├── precio
│   ├── stock
│   ├── stockMinimo
│   ├── categoria
│   ├── proveedor
│   ├── lotes/
│   │   ├── loteId
│   │   ├── cantidad
│   │   ├── fechaVencimiento
│   │   └── fechaIngreso
│   ├── creadoPor (uid)
│   ├── fechaCreacion
│   ├── ultimaActualizacion
│   ├── ultimoActualizadoPor
│   └── foto (URL)
│
├── historialCambios/
│   ├── medicamentoId
│   ├── tipo (crear/editar/eliminar)
│   ├── usuarioId
│   ├── cambios (objeto)
│   ├── timestamp
│   └── detalles
│
└── alertas/
    ├── medicamentoId
    ├── tipo (vencimiento/stock bajo)
    ├── fechaAlerta
    └── resuelta
```

#### 2.2 - Backend API (Node.js + Express)

```
Endpoints:

AUTENTICACIÓN:
POST   /api/auth/register    → Registrar usuario
POST   /api/auth/login       → Login
POST   /api/auth/logout      → Logout
GET    /api/auth/me          → Usuario actual

MEDICAMENTOS (CRUD):
GET    /api/medicamentos           → Listar todos (con filtros)
GET    /api/medicamentos/:id       → Obtener uno
POST   /api/medicamentos           → Crear (requiere TRABAJADOR+)
PUT    /api/medicamentos/:id       → Actualizar (requiere TRABAJADOR+)
DELETE /api/medicamentos/:id       → Eliminar (requiere ADMIN)
GET    /api/medicamentos/buscar    → Búsqueda (nombre/código)

LOTES:
POST   /api/medicamentos/:id/lotes       → Agregar lote
PUT    /api/medicamentos/:id/lotes/:lote → Actualizar lote
DELETE /api/medicamentos/:id/lotes/:lote → Eliminar lote

BÚSQUEDA:
GET    /api/buscar?q=termino&tipo=nombre|codigo

ALERTAS:
GET    /api/alertas                      → Ver alertas
GET    /api/alertas/stock-bajo           → Stock bajo
GET    /api/alertas/vencimiento          → Por vencer
PUT    /api/alertas/:id/resolver         → Marcar como resuelta

REPORTES:
GET    /api/reportes/medicamentos        → Reporte general
GET    /api/reportes/vencimientos        → Por vencer
GET    /api/reportes/excel               → Descargar Excel
GET    /api/reportes/historial           → Historial de cambios

USUARIOS (Admin):
GET    /api/usuarios                     → Listar usuarios
POST   /api/usuarios                     → Crear usuario
PUT    /api/usuarios/:id                 → Actualizar
DELETE /api/usuarios/:id                 → Desactivar
```

#### 2.3 - Modelos MongoDB/Firestore

```javascript
// Medicamento
class Medicamento {
  id: string
  nombre: string
  codigo: string (único)
  descripcion: string
  precio: number
  stock: number
  stockMinimo: number
  categoria: string
  proveedor: string
  foto: string (URL)
  lotes: Lote[]
  creadoPor: string (uid)
  fechaCreacion: timestamp
  ultimaActualizacion: timestamp
  ultimoActualizadoPor: string (uid)
  activo: boolean
}

// Lote
class Lote {
  loteId: string
  cantidad: number
  fechaVencimiento: timestamp
  fechaIngreso: timestamp
  estado: 'vigente' | 'vencido' | 'parcial'
}

// Usuario
class Usuario {
  uid: string
  email: string
  nombre: string
  rol: 'ADMIN' | 'TRABAJADOR' | 'INVITADO'
  telefono: string
  activo: boolean
  fechaCreacion: timestamp
  ultimoLogin: timestamp
}

// HistorialCambios
class HistorialCambios {
  id: string
  medicamentoId: string
  tipo: 'crear' | 'editar' | 'eliminar'
  usuarioId: string
  cambios: object
  timestamp: timestamp
  detalles: string
}

// Alerta
class Alerta {
  id: string
  medicamentoId: string
  tipo: 'vencimiento' | 'stock_bajo' | 'sin_lote'
  descripcion: string
  fechaAlerta: timestamp
  resuelta: boolean
  prioridad: 'baja' | 'media' | 'alta' | 'crítica'
}
```

**Deliverable:**
```
✓ Firestore con colecciones correctas
✓ Backend API completamente funcional
✓ Validaciones en servidor
✓ Gestión de errores
✓ Middlewares de autenticación/autorización
```

**Estimación:** 8-10 días

---

### **FASE 3: INTERFAZ DE USUARIO (Semana 3-4)**

#### 3.1 - Pantalla Principal (Listado)

```html
Layout:
┌─────────────────────────────────────┐
│ HEADER                              │
│ Logo | Búsqueda | Voz | Usuario    │
├─────────────────────────────────────┤
│ BARRA DE BÚSQUEDA                   │
│ ┌──────────────────────────────┐    │
│ │ 🔍 Buscar por nombre/código  │ 🎤 │
│ └──────────────────────────────┘    │
│ [Filtros] [Categorías]              │
├─────────────────────────────────────┤
│ TABLA/GRID DE MEDICAMENTOS          │
│ Nombre | Código | Precio | Vence    │
│ ─────────────────────────────────   │
│ Medicamento 1                       │
│ Medicamento 2                       │
│ Medicamento 3                       │
│ ...                                 │
├─────────────────────────────────────┤
│ Pagina 1 de 10 [Prev] [1] [2] [Next]│
└─────────────────────────────────────┘

FAB (Floating Action Button):
📌 Agregar medicamento (si es TRABAJADOR/ADMIN)
```

#### 3.2 - Búsqueda por Voz

```
Funcionalidad:
┌─────────────────────────────┐
│ 🔍 | [Buscar...] | 🎤 ESCUCHANDO
└─────────────────────────────┘

Flujo:
1. Usuario presiona 🎤
2. Botón cambia a "ESCUCHANDO"
3. Web Speech API captura voz
4. Muestra transcripción en tiempo real
5. Usuario presiona 🛑 para detener
6. Busca automáticamente
7. Limpia entrada si presiona ✕
```

#### 3.3 - CRUD Medicamentos

**Vista de Crear/Editar:**
```
Modal/Página:
┌────────────────────────────────────┐
│ REGISTRAR MEDICAMENTO              │
├────────────────────────────────────┤
│ Nombre:              [_________]    │
│ Código:              [_________]    │
│ Descripción:         [_________]    │
│ Categoría:           [Dropdown]     │
│ Precio:              [_________]    │
│ Stock:               [_________]    │
│ Stock Mínimo:        [_________]    │
│ Proveedor:           [_________]    │
│ Foto:                [📸 Subir]     │
│                                     │
│ LOTES:                              │
│ ┌─────────────────────────────────┐│
│ │ Lote | Cantidad | Vencimiento  ││
│ ├─────────────────────────────────┤│
│ │ L001 | 50      | 2024-12-31     ││
│ │ [+ Agregar Lote]                ││
│ └─────────────────────────────────┘│
│                                     │
│ [Cancelar] [Guardar]               │
└────────────────────────────────────┘
```

**Vista de Detalles:**
```
Card/Modal:
┌────────────────────────────────────┐
│ [X]                                │
│ PARACETAMOL 500MG                  │
│                                    │
│ Código: MED-001                    │
│ Precio: $5.99                      │
│ Stock: 45 unidades                 │
│ Vence: 2024-12-31                  │
│                                    │
│ Categoría: Analgésicos             │
│ Proveedor: Pharma Corp             │
│                                    │
│ LOTES:                             │
│ • Lote L001: 30 unid. (2024-12-31) │
│ • Lote L002: 15 unid. (2025-01-15) │
│                                    │
│ Creado: 2024-01-15 por Juan        │
│ Última edición: 2024-02-20         │
│                                    │
│ [Editar] [Eliminar] [Cerrar]      │
└────────────────────────────────────┘
```

#### 3.4 - Pantalla de Carga (Skeleton Loading)

```
Mostrar en:
✓ Cambio de pantalla principal
✓ Al obtener datos de Firestore
✓ Al buscar
✓ Máximo 2-3 segundos

No mostrar en:
✗ Botones pequeños
✗ Búsqueda rápida
✗ Acciones instantáneas

Diseño:
┌────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓            │
│ ▓▓▓▓▓▓▓▓▓▓▓▓                      │
│                                  │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓            │
│ ▓▓▓▓▓▓▓▓▓▓▓▓                      │
│                                  │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓            │
│ ▓▓▓▓▓▓▓▓▓▓▓▓                      │
└────────────────────────────────────┘
```

**Deliverable:**
```
✓ Listado funcional con API
✓ Búsqueda por nombre/código funcionando
✓ Búsqueda por voz operacional
✓ CRUD completo
✓ Pantallas de carga estratégicas
✓ Responsive en mobile/desktop
✓ Sistema de alertas visual
```

**Estimación:** 10-12 días

---

### **FASE 4: ALERTAS Y FUNCIONALIDADES AVANZADAS (Semana 4-5)**

#### 4.1 - Sistema de Alertas

```javascript
Tipos de Alertas:
1. STOCK BAJO
   - Si stock < stockMinimo
   - Frecuencia: Verificar cada vez que se carga
   - Nivel: Crítica (roja)

2. VENCIMIENTO PRÓXIMO
   - Si fechaVencimiento - hoy <= 30 días
   - Nivel: Alta (naranja)

3. VENCIDO
   - Si fechaVencimiento < hoy
   - Nivel: Crítica (roja)

4. SIN LOTE
   - Si medicamento tiene stock pero sin lotes asignados
   - Nivel: Media (amarilla)

UI:
┌─────────────────────────────────┐
│ 🔴 2 ALERTAS CRÍTICAS          │
│ 🟠 1 ALERTA ALTA               │
│ 🟡 3 ADVERTENCIAS              │
└─────────────────────────────────┘

Sidebar de Alertas:
├─ 🔴 CRÍTICAS (2)
│  ├─ Paracetamol: Vencido
│  └─ Ibuprofeno: Stock bajo
├─ 🟠 ALTAS (1)
│  └─ Amoxicilina: Vence en 15 días
└─ 🟡 MEDIAS (3)
   └─ ...
```

#### 4.2 - Control de Lotes y Vencimiento

```
FIFO (First In, First Out):
├── Automático: Mostrar primero lote más antiguo
├── Manual: Opción de seleccionar lote específico
└── Reporte: Medicamentos vencidos por categoría

Gestión de Lotes:
✓ Agregar lote a medicamento existente
✓ Editar cantidad de lote
✓ Cambiar fecha de vencimiento
✓ Marcar como vencido
✓ Historial de movimientos por lote
```

#### 4.3 - Reportes y Exportación Excel

```
Reportes disponibles:
1. INVENTARIO ACTUAL
   - Todos los medicamentos
   - Stock, precio, categoría
   - Excel + PDF

2. MEDICAMENTOS POR VENCER
   - Próximos 30/60/90 días
   - Agrupado por fecha
   - Acción recomendada

3. STOCK BAJO
   - Medicamentos bajo mínimo
   - Cantidad a reponer
   - Proveedor contacto

4. HISTORIAL DE CAMBIOS
   - Quién cambió qué
   - Cuándo
   - Qué valores
   - Filtrable por fecha/usuario

Formato Excel:
├─ Hoja 1: Inventario Completo
├─ Hoja 2: Medicamentos Vencidos
├─ Hoja 3: Stock Bajo
└─ Hoja 4: Resumen Ejecutivo
```

**Deliverable:**
```
✓ Sistema de alertas en tiempo real
✓ Control de lotes FIFO
✓ Reportes en Excel descargables
✓ Historial de cambios auditables
✓ Notificaciones visuales
```

**Estimación:** 7-8 días

---

### **FASE 5: GESTIÓN DE USUARIOS (Semana 5)**

#### 5.1 - Panel Admin

```
Admin puede:
✓ Ver lista de usuarios
✓ Crear nuevos usuarios
✓ Editar datos de usuario
✓ Cambiar roles
✓ Desactivar/Activar usuarios
✓ Ver último login
✓ Resetear contraseña

Tabla de Usuarios:
┌──────────────────────────────────────┐
│ Nombre | Email | Rol | Activo | Acciones │
├──────────────────────────────────────┤
│ Juan   | j@ex | ADMIN | ✓ | ... │
│ María  | m@ex | TRABAJADOR | ✓ | ... │
│ Pedro  | p@ex | TRABAJADOR | ✗ | ... │
└──────────────────────────────────────┘
```

#### 5.2 - Seguridad

```
Implementar:
✓ Validación de permisos en cada endpoint
✓ Rate limiting
✓ Hashing de contraseñas (bcrypt)
✓ Tokens JWT con expiración
✓ CORS configurado
✓ Sanitización de inputs
✓ Logs de acciones críticas
```

**Deliverable:**
```
✓ Panel de gestión de usuarios
✓ Seguridad en nivel de backend
✓ Auditoría de acciones
```

**Estimación:** 5 días

---

### **FASE 6: TESTING Y OPTIMIZACIÓN (Semana 6)**

#### 6.1 - Testing

```
Unit Tests:
✓ Modelos de datos
✓ Funciones de filtrado/búsqueda
✓ Validaciones
✓ Cálculos de alertas

Integration Tests:
✓ Login/Logout
✓ CRUD completo
✓ Búsqueda
✓ Generación de reportes

E2E Tests:
✓ Flujo principal (login → buscar → crear → editar → eliminar)
✓ Flujo de búsqueda por voz
✓ Generación de reportes
```

#### 6.2 - Optimización

```
Performance:
✓ Lazy loading de datos
✓ Caché de búsquedas
✓ Compresión de imágenes
✓ Minificación de JS/CSS
✓ Service Worker para PWA

UX:
✓ Transiciones suaves
✓ Feedback visual claro
✓ Mensajes de error útiles
✓ Teclado accesible
✓ Modo oscuro (opcional)
```

**Deliverable:**
```
✓ Tests unitarios y E2E
✓ Cobertura > 80%
✓ Performance Score > 90
✓ Aplicación lista para producción
```

**Estimación:** 5-7 días

---

### **FASE 7: DEPLOYMENT Y MANTENIMIENTO (Semana 7-8)**

#### 7.1 - Deployment

```
Frontend:
✓ Vercel o Netlify
✓ Build optimizado
✓ Dominio custom (opcional)

Backend:
✓ Vercel Serverless Functions
✓ O Railway/Render
✓ Variables de entorno seguros

Base de datos:
✓ Firebase Firestore en producción
✓ Backups automáticos
✓ Índices optimizados
```

#### 7.2 - Documentación

```
Crear:
✓ README con instrucciones
✓ Documentación de API (Swagger)
✓ Manual de usuario
✓ Guía de administrador
✓ Troubleshooting
```

**Deliverable:**
```
✓ Aplicación en producción
✓ Documentación completa
✓ Pipeline CI/CD
```

**Estimación:** 5-7 días

---

## 📊 CRONOGRAMA COMPLETO

```
SEMANA 1:     Setup (Fase 0) + Autenticación (Fase 1)
SEMANA 2:     Autenticación completa (Fase 1) + Datos (Fase 2)
SEMANA 3:     API completa (Fase 2) + UI Principal (Fase 3)
SEMANA 4:     UI CRUD (Fase 3) + Alertas (Fase 4)
SEMANA 5:     Alertas (Fase 4) + Usuarios (Fase 5)
SEMANA 6:     Testing (Fase 6)
SEMANA 7-8:   Deploy (Fase 7)
```

---

## 🎯 HITOS PRINCIPALES (MVP)

**Hito 1 - Semana 2:** Login funcional ✅ Deploy Testing
**Hito 2 - Semana 3:** Listado + Búsqueda funcionando ✅
**Hito 3 - Semana 4:** CRUD completo ✅
**Hito 4 - Semana 6:** Reportes + Alertas ✅
**Hito 5 - Semana 8:** Producción ✅ 🚀

---

## 💻 STACK TECNOLÓGICO FINAL

```
FRONTEND:
├── HTML5 + CSS3 (Responsive)
├── JavaScript Vanilla (ES6+)
├── Web Speech API (búsqueda por voz)
├── PWA (Service Worker)
└── Firebase SDK

BACKEND:
├── Node.js + Express
├── Firebase Admin SDK
├── middlewares (auth, validation)
└── Winston (logging)

DATABASE:
├── Firebase Firestore (producción)
└── LocalStorage (caché local)

DEPLOYMENT:
├── Vercel (Frontend + API)
├── Firebase (Database + Auth)
└── GitHub Actions (CI/CD)

LIBRERÍAS:
├── express-validador
├── jsonwebtoken
├── helmet (seguridad)
├── xlsx (Excel)
└── cors
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Fase 0
- [ ] Firebase proyecto creado
- [ ] Backend Node.js inicializado
- [ ] git configurado
- [ ] .env template creado

### Fase 1
- [ ] Firebase Auth configurado
- [ ] Roles implementados
- [ ] Login completamente funcional
- [ ] Protected routes
- [ ] Persistent session

### Fase 2
- [ ] Firestore estructura creada
- [ ] API endpoints 80% completos
- [ ] Validaciones en servidor
- [ ] Error handling

### Fase 3
- [ ] Listado responsive
- [ ] Búsqueda por nombre/código
- [ ] Búsqueda por voz funcionando
- [ ] Modal CRUD
- [ ] Pantallas de carga

### Fase 4
- [ ] Alertas en tiempo real
- [ ] Control de lotes
- [ ] Reportes Excel
- [ ] Historial auditado

### Fase 5
- [ ] Panel de usuarios (Admin)
- [ ] Seguridad en endpoints
- [ ] Logs de auditoría

### Fase 6
- [ ] Tests unitarios > 80%
- [ ] E2E tests
- [ ] Performance optimizado

### Fase 7
- [ ] Deploy en Vercel
- [ ] Docs completas
- [ ] Manual de usuario

---

## 🚀 NEXT STEPS INMEDIATOS

1. **Elección de Base de Datos:** Firebase Firestore ✅
2. **Setup Proyecto Node.js:** Crear solo con Express
3. **GitHub Repo:** Crear y configurar
4. **Firebase Admin:** Configurar credenciales
5. **Primera API:** Endpoints básicos de medicamentos

¿Empezamos con la **Fase 0 (Setup)**?
