# 🎬 PHASE 0 COMPLETE - QUICK START

## ✅ ¿QUÉ HEMOS COMPLETADO?

### Backend
- ✅ Estructura de carpetas Express
- ✅ Configuración de Firebase
- ✅ Middleware de autenticación (JWT)
- ✅ Middleware CORS y headers (para AJAX)
- ✅ Utilidades de respuesta estandarizadas
- ✅ Server.js listo para arrancar

### Frontend - Sistema AJAX
- ✅ `ajax.js` - Cliente HTTP con caché automático
- ✅ `ajax-loader.css` - Estilos de loaders y notificaciones
- ✅ Sistema de notificaciones (NOTIFY)
- ✅ Loaders y pantallas de carga (SCREEN)
- ✅ Manejo de errores automático
- ✅ Soporte para upload de archivos

### Documentación
- ✅ SETUP_FASE_0.md - Guía completa de instalación
- ✅ EJEMPLOS_AJAX.js - Ejemplos de código listo para usar
- ✅ Este archivo de inicio rápido

---

## 🚀 INICIO RÁPIDO (5 MINUTOS)

### 1. Clonar/Descargar proyecto
```bash
cd c:\laragon\www\FarmaciaMM
```

### 2. Instalar dependencias backend
```bash
cd backend
npm install
```

### 3. Configurar Firebase
```bash
# Descargar credenciales desde Firebase Console
# Guardar como: backend/firebase-credentials.json

# O crear .env con variables
cp .env.example .env
# Editar .env con tus credenciales
```

### 4. Iniciar servidor
```bash
npm run dev
```

Deberías ver:
```
🚀 Servidor corriendo en: http://localhost:3000
```

### 5. Abrir navegador
```
http://localhost:3000/api/health
```

Deberías obtener respuesta JSON:
```json
{
  "success": true,
  "message": "✅ Servidor está funcionando correctamente",
  "timestamp": "2026-04-15T10:30:00Z"
}
```

---

## 📁 NUEVA ESTRUCTURA DE CARPETAS

```
FarmaciaMM/
├── backend/                          ← NUEVO: Server Node.js
│   ├── server.js                    ← Inicia aquí
│   ├── package.json                 ← npm install
│   ├── .env                         ← Configurar
│   ├── firebase-credentials.json    ← Descargar de Firebase
│   └── src/
│       ├── config/firebase.js       ← Conexión a Firebase
│       ├── middleware/
│       │   ├── auth.js              ← JWT + Roles
│       │   └── headers.js           ← CORS para AJAX
│       └── utils/response.js        ← Respuestas JSON
│
├── public/
│   ├── js/
│   │   └── ajax.js                  ← NUEVO: AJAX sin jQuery
│   └── css/
│       └── ajax-loader.css          ← NUEVO: Estilos
│
├── src/views/                       ← Actualizar con AJAX
│   ├── login.html                  ← Usar AJAX
│   ├── medicamentos.html           ← Usar AJAX
│   └── ...
│
├── SETUP_FASE_0.md                  ← Guía completa
├── EJEMPLOS_AJAX.js                 ← Código listo
│
└── PLAN_FASES.md                    ← Plan original
```

---

## 💻 PRÓXIMOS 3 PASOS (Fase 1)

### Paso 1: Crear ruta de login
```javascript
// backend/src/routes/auth.js
router.post('/login', (req, res) => {
    // Validar credenciales con Firebase Auth
    // Generar JWT token
    // Retornar usuario + token
});
```

### Paso 2: Actualizar login.html
```html
<!-- Agregar AJAX -->
<script src="/public/js/ajax.js"></script>
<link rel="stylesheet" href="/public/css/ajax-loader.css">

<!-- Usar en formulario -->
<form id="loginForm">
    <input id="email" type="email" placeholder="Email">
    <input id="password" type="password" placeholder="Contraseña">
    <button type="submit">Ingresar</button>
</form>

<script>
// Ver EJEMPLOS_AJAX.js línea 1-75
</script>
```

### Paso 3: Crear ruta de medicamentos
```javascript
// backend/src/routes/medicamentos.js
router.get('/', (req, res) => {
    // Obtener de Firestore
    // Retornar JSON
});

router.post('/', (req, res) => {
    // Crear en Firestore
    // Retornar JSON con ID
});
```

---

## 🎯 CARACTERÍSTICAS DE AJAX IMPLEMENTADAS

### ✅ GET - Obtener datos
```javascript
const data = await AJAX.get('/medicamentos', { cache: true });
// Automáticamente cachea por 5 minutos
```

### ✅ POST - Crear datos
```javascript
const response = await AJAX.post('/medicamentos', {
    nombre: 'Paracetamol',
    precio: 5.99
});
// Muestra loader automáticamente
```

### ✅ PUT - Actualizar datos
```javascript
await AJAX.put('/medicamentos/1', { precio: 6.99 });
```

### ✅ DELETE - Eliminar datos
```javascript
await AJAX.delete('/medicamentos/1');
// Pide confirmación automáticamente
```

### ✅ Notificaciones en tiempo real
```javascript
NOTIFY.success('¡Listo!');
NOTIFY.error('Error detectado');
NOTIFY.info('Información');
```

### ✅ Loaders automáticos
```javascript
SCREEN.showLoading();   // Mostrar spinner
SCREEN.hideLoading();   // Ocultar spinner
```

### ✅ Upload de archivos
```javascript
await AJAX.uploadFile('/upload', file, (progress) => {
    console.log(`${progress}%`);
});
```

---

## 📝 CONFIGURACIÓN ESSENTIAL

### backend/.env
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=tu-secret-key-aqui
FIREBASE_ADMIN_SDK_KEY=./firebase-credentials.json
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### index.html
```html
<!-- AGREGAR ANTES DE CERRAR </body> -->
<script src="/public/js/ajax.js"></script>
<link rel="stylesheet" href="/public/css/ajax-loader.css">
```

---

## ✨ VENTAJAS DEL SETUP ACTUAL

🚀 **Sin jQuery** - Vanilla JavaScript
⚡ **Caché automático** - Búsquedas más rápidas
🔄 **Tiempo real** - Sin recargar página
🎨 **Notificaciones** - Feedback visual
📊 **Loaders automáticos** - UX mejorada
🔐 **Autenticación** - JWT + Firebase
🌐 **CORS configurado** - Listo para producción
📱 **Responsive** - Mobile + Desktop

---

## 🔗 FLUJO COMPLETO

```
[Usuario escribe en HTML]
           ↓
[AJAX.post() captura datos]
           ↓
[Muestra loader automáticamente]
           ↓
[Envía POST a /api/medicamentos]
           ↓
[Backend valida con Firebase]
           ↓
[Retorna JSON con respuesta]
           ↓
[AJAX parsea respuesta]
           ↓
[Muestra notificación]
           ↓
[Renderiza UI actualizado]
           ↓
[Sin recargar página ✅]
```

---

## 🆘 COMANDOS ÚTILES

```bash
# En carpeta backend/

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start

# Test (cuando agregues)
npm test

# Desplegar a Vercel
npm run deploy
```

---

## 🎓 PRÓXIMA LECTURA

1. **SETUP_FASE_0.md** - Guía completa y troubleshooting
2. **EJEMPLOS_AJAX.js** - Código para copiar/pegar
3. **PLAN_FASES.md** - Hoja de ruta completa

---

## ✅ CHECKLIST ANTES DE FASE 1

- [ ] Backend instalado (`npm install`)
- [ ] Firebase credenciales descargadas
- [ ] `npm run dev` funciona
- [ ] `/api/health` retorna JSON
- [ ] `ajax.js` en HTML
- [ ] `ajax-loader.css` vinculado
- [ ] Primer AJAX call funciona

Cuando todo esté ✅, avanzamos a **Fase 1: Autenticación** 🚀

---

## 📞 ¿PREGUNTAS?

Consulta:
- SETUP_FASE_0.md sección "Troubleshooting"
- EJEMPLOS_AJAX.js para patrones de código
- Documentación de Express.js (https://expressjs.com/)

---

**¡Excelente! Fase 0 está completa. Listo para Fase 1?** 🎉

Para empezar Fase 1 (Autenticación), ejecuta:
```bash
cd backend
npm run dev
```

Y manda mensajes cuando tengas listo el próximo step! 🚀
