# 🚀 Guía de Setup - Fase 0 (Backend)

## ¿Qué hemos creado?

Una estructura completa de backend con:
- ✅ Express.js server
- ✅ Firebase integration
- ✅ AJAX middleware (CORS, headers, autenticación)
- ✅ Sistema de notificaciones y loaders
- ✅ Estructura para rutas y controladores

---

## 📋 REQUISITOS PREVIOS

### 1. Node.js y NPM
```bash
# Verificar versión (debe ser 18+)
node --version
npm --version
```

Si no tienes instalado:
- **Windows**: Descarga desde https://nodejs.org/en/
- **Mac**: `brew install node`
- **Linux**: `sudo apt-get install nodejs npm`

### 2. Cuenta Firebase
- Ir a https://console.firebase.google.com
- Crear un nuevo proyecto
- Habilitar Firestore Database
- Habilitar Authentication (email/password)
- Crear una App Web
- Descargar las credenciales

---

## ⚙️ INSTALACIÓN Y CONFIGURACIÓN

### Paso 1: Instalar dependencias del backend

```bash
cd backend
npm install
```

Esto instalará:
- express (servidor web)
- firebase-admin (conexión a Firebase)
- cors (permitir requests desde el frontend)
- dotenv (variables de entorno)
- helmet (seguridad)
- jwt (autenticación con tokens)
- xlsx (exportación a Excel)
- y más...

### Paso 2: Configurar Firebase

#### Opción A: Desarrollo Local (Recomendado)

1. Ve a Firebase Console → Tu proyecto
2. Configuración → Cuentas de servicio
3. Genera una nueva clave privada (JSON)
4. Guarda el archivo como `firebase-credentials.json` en la carpeta `backend/`

```
backend/
├── firebase-credentials.json  ← Archivo descargado
├── server.js
└── ...
```

#### Opción B: Variables de Entorno (Para Producción)

```bash
# backend/.env
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_PRIVATE_KEY=tu-private-key
FIREBASE_CLIENT_EMAIL=tu-email@proyecto.iam.gserviceaccount.com
FIREBASE_ADMIN_SDK_KEY=path/or/json
```

### Paso 3: Crear archivo .env

```bash
# Copiar el template
cp .env.example .env

# Editar .env con tus valores
```

**backend/.env** (Ejemplo):
```
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
JWT_SECRET=tu-secreto-super-seguro-cambiar-en-produccion
FIREBASE_ADMIN_SDK_KEY=./firebase-credentials.json
```

### Paso 4: Iniciar el servidor

```bash
# Opción 1: Desarrollo (con auto-reload)
npm run dev

# Opción 2: Producción
npm start
```

Deberías ver:
```
╔═══════════════════════════════════════════╗
║     🏥 FARMACIA MM API - INICIADO 🏥    ║
╚═══════════════════════════════════════════╝

🚀 Servidor corriendo en: http://localhost:3000
📝 Ambiente: development
🔧 versión: 1.0.0
```

### Verificar que funciona

```bash
# En otra terminal, ejecutar:
curl http://localhost:3000/api/health

# Deberías obtener respuesta JSON
```

---

## 🖥️ SETUP DEL FRONTEND CON AJAX

### Paso 1: Incluir archivos AJAX

En tus archivos HTML principales (login.html, etc):

```html
<head>
    <!-- ... otros scripts ... -->
    
    <!-- AJAX System -->
    <script src="/public/js/ajax.js"></script>
    <link rel="stylesheet" href="/public/css/ajax-loader.css">
</head>
<body>
    <!-- ... contenido ... -->
</body>
</html>
```

### Paso 2: Usar AJAX en tu código

Antes (Sin AJAX - recarga página):
```javascript
// ❌ Antiguo: Form tradicional
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.submit(); // Recarga la página ❌
});
```

Ahora (Con AJAX - sin recarga):
```javascript
// ✅ Nuevo: AJAX sin recarga
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Enviar con AJAX
    const response = await AJAX.post('/medicamentos', data);
    
    if (response.success) {
        NOTIFY.success('Medicamento creado!');
        form.reset();
        cargarMedicamentos(); // Refrescar lista sin recargar
    }
});
```

---

## 📝 EJEMPLOS DE USO AJAX

### GET - Obtener lista de medicamentos

```javascript
// Con caché de 5 minutos
const medicamentos = await AJAX.get('/medicamentos', { cache: true });
console.log(medicamentos.data);
```

### POST - Crear medicamento

```javascript
const nuevoMedicamento = {
    nombre: 'Paracetamol',
    codigo: 'MED-001',
    precio: 5.99,
    stock: 100
};

const response = await AJAX.post('/medicamentos', nuevoMedicamento);

if (response.success) {
    NOTIFY.success('✅ Medicamento creado!');
}
```

### PUT - Actualizar medicamento

```javascript
const datosActualizados = {
    precio: 6.99,
    stock: 150
};

const response = await AJAX.put('/medicamentos/1', datosActualizados);

if (response.success) {
    NOTIFY.success('✅ Actualizado!');
}
```

### DELETE - Eliminar medicamento

```javascript
// Pide confirmación automáticamente
const response = await AJAX.delete('/medicamentos/1');

if (response.success) {
    NOTIFY.success('✅ Eliminado!');
    // Refrescar lista
    cargarMedicamentos();
}
```

### Búsqueda

```javascript
// Búsqueda con query parameter
const resultados = await AJAX.get('/medicamentos/buscar?q=paracetamol');
console.log(resultados.data);
```

---

## 🔐 AUTENTICACIÓN CON JWT

### Login y guardar token

```javascript
const response = await AJAX.post('/auth/login', {
    email: 'usuario@example.com',
    password: 'contraseña'
});

if (response.success) {
    // Guardar token
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    // El token se envía automáticamente en próximas requests
    const medicamentos = await AJAX.get('/medicamentos');
}
```

### Logout

```javascript
localStorage.removeItem('token');
localStorage.removeItem('user');
window.location.href = '/src/views/login.html';
```

---

## 🎨 NOTIFICACIONES EN TIEMPO REAL

```javascript
// Éxito
NOTIFY.success('¡Operación completada!');

// Error
NOTIFY.error('Hubo un error en la solicitud');

// Info
NOTIFY.info('Información importante');

// Duración personalizada
NOTIFY.show('Mensaje personalizado', 'success', 5000);
```

---

## ⏳ LOADERS AUTOMÁTICOS

El sistema AJAX muestra loaders automáticamente:

```javascript
// Esto mostrará el loader automáticamente
const response = await AJAX.post('/medicamentos', data);
// El loader se oculta automáticamente cuando termina

// Si quieres desactivarlo:
const response = await AJAX.post(
    '/medicamentos', 
    data, 
    { showLoading: false }
);
```

---

## 📋 ESTRUCTURA DE CARPETAS ACTUAL

```
FarmaciaMM/
├── backend/                    ← NUEVO: Backend
│   ├── server.js              ← Punto de entrada
│   ├── package.json           ← Dependencias
│   ├── .env                   ← Variables de entorno (privado)
│   ├── .env.example           ← Plantilla (público)
│   ├── firebase-credentials.json ← Credenciales (privado)
│   ├── src/
│   │   ├── config/
│   │   │   └── firebase.js    ← Configuración de Firebase
│   │   ├── middleware/
│   │   │   ├── auth.js        ← Autenticación JWT
│   │   │   └── headers.js     ← CORS y headers
│   │   ├── routes/            ← Rutas (por crear)
│   │   ├── controllers/       ← Controladores (por crear)
│   │   ├── models/            ← Modelos (por crear)
│   │   └── utils/
│   │       └── response.js    ← Respuestas estandarizadas
│   └── logs/                  ← Logs de la aplicación
│
├── public/
│   ├── css/
│   │   └── ajax-loader.css    ← NUEVO: Estilos para AJAX
│   └── js/
│       └── ajax.js            ← NUEVO: Sistema AJAX
│
└── src/
    ├── views/
    │   ├── login.html         ← Actualizar con AJAX
    │   ├── medicamentos.html  ← Actualizar con AJAX
    │   └── ...
    └── ...
```

---

## ✅ CHECKLIST PARA VERIFICAR QUE FUNCIONA

- [ ] `npm install` en backend/ sin errores
- [ ] `npm run dev` inicia servidor en puerto 3000
- [ ] `curl http://localhost:3000/api/health` retorna JSON
- [ ] Firebase credenciales configuradas
- [ ] `ajax.js` cargado en HTML
- [ ] `ajax-loader.css` vinculado
- [ ] Primer AJAX call funciona en navegador (verificar en Network tab)

---

## 🔗 PRÓXIMOS PASOS (Fase 1)

1. Crear rutas de autenticación (`/api/auth/register`, `/api/auth/login`)
2. Crear controlador de autenticación con Firebase
3. Actualizar login.html para usar AJAX
4. Crear rutas de medicamentos (`/api/medicamentos`)
5. Actualizar lista de medicamentos para cargar vía AJAX

---

## 🆘 TROUBLESHOOTING

### Error: Cannot find module 'express'
```bash
cd backend
npm install
```

### Error: CORS error en navegador
Verifica que `CORS_ORIGIN` incluya tu frontend URL en `.env`:
```
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### Error: Firebase credentials not found
```bash
# Descarga firebase-credentials.json desde Firebase Console
# Colócalo en: backend/firebase-credentials.json
```

### El servidor no inicia
```bash
# Verifica que el puerto 3000 esté libre
# O cambia el puerto en .env:
PORT=3001
```

---

## 📚 DOCUMENTACIÓN ÚTIL

- Express.js: https://expressjs.com/
- Firebase Admin SDK: https://firebase.google.com/docs/database/admin/start
- CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- Postman (para testear API): https://www.postman.com/

---

## 💾 ARCHIVOS A GITIGNORE

Nunca commits estos archivos:
```
.env
firebase-credentials.json
node_modules/
logs/
uploads/
```

---

**¿Listo para pasar a la Fase 1 (Autenticación)?** 🚀
