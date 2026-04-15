# 📚 ÍNDICE DE DOCUMENTACIÓN - FARMACIA MM

## 🎯 INICIO RÁPIDO (Tienes 5 minutos)

Empieza aquí si es tu primer día:

1. Lee: **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** (5 minutos)
2. Ejecuta: `cd backend && npm install` (2 minutos)
3. Configura Firebase (5 minutos)
4. Prueba: `npm run dev` (1 minuto)

**Total: ~15-20 minutos para que funcione todo**

---

## 📖 DOCUMENTACIÓN POR TEMA

### 🚀 CONFIGURACIÓN E INSTALACIÓN

| Documento | Descripción | Cuándo Leer | Tiempo |
|-----------|-------------|----------|--------|
| **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** | Setup en 5 minutos | Primera vez | 5 min |
| **[SETUP_FASE_0.md](SETUP_FASE_0.md)** | Guía completa + troubleshooting | Si hay problemas | 30 min |
| **[ESTRUCTURA_FINAL_FASE0.md](ESTRUCTURA_FINAL_FASE0.md)** | Qué archivos se crearon | Para entender estructura | 10 min |

### 🏗️ ARQUITECTURA Y DISEÑO

| Documento | Descripción | Cuándo Leer | Tiempo |
|-----------|-------------|----------|--------|
| **[ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md)** | Diagramas + flujos técnicos | Antes de Fase 1 | 20 min |
| **[PLAN_FASES.md](PLAN_FASES.md)** | Roadmap completo del proyecto | Para planificar | 15 min |
| **[DASHBOARD_PROGRESO.md](DASHBOARD_PROGRESO.md)** | Timeline + checklist | Cada inicio de fase | 10 min |

### 💻 CÓDIGO Y EJEMPLOS

| Documento | Descripción | Cuándo Leer | Tiempo |
|-----------|-------------|----------|--------|
| **[EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js)** | Código listo para copiar/pegar | Implementando features | 10 min |
| **backend/src/config/firebase.js** | Config Firebase Admin SDK | Modificar credenciales | 5 min |
| **public/js/ajax.js** | Sistema AJAX completo | Entender cómo funciona | 20 min |

### 📊 SEGUIMIENTO Y PROGRESO

| Documento | Descripción | Cuándo Leer | Tiempo |
|-----------|-------------|----------|--------|
| **[DASHBOARD_PROGRESO.md](DASHBOARD_PROGRESO.md)** | Estado del proyecto + checklist | Cada fase | 5 min |
| **[PLAN_FASES.md](PLAN_FASES.md)** | Detalles de 7 fases | Planificación | 15 min |

---

## 🔍 BUSCA LO QUE NECESITAS

### ❓ "¿Cómo hago XYZ?"

**¿Cómo instalo**
- Las dependencias? → [INICIO_RAPIDO.md](INICIO_RAPIDO.md) Paso 2
- Firebase? → [SETUP_FASE_0.md](SETUP_FASE_0.md) Sección "Firebase Setup"
- Node.js? → [SETUP_FASE_0.md](SETUP_FASE_0.md) Sección "Requisitos"

**¿Cómo uso**
- AJAX en HTML? → [EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js) Primeros 100 líneas
- AJAX.post? → [EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js) línea ~50-75
- Notificaciones? → [EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js) línea ~200-250
- Loaders? → [ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md) Sección "CACHÉ"

**¿Cómo creo**
- Una ruta en Express? → [ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md) Sección "FLUJO"
- Un controller? → [PLAN_FASES.md](PLAN_FASES.md) Fase 1 - Detalles
- Un endpoint? → [EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js) Sección "Backend"

**¿Cómo configuro**
- Firebase credenciales? → [SETUP_FASE_0.md](SETUP_FASE_0.md) Sección "Firebase"
- JWT secret? → [INICIO_RAPIDO.md](INICIO_RAPIDO.md) Sección "Configuración Essential"
- CORS origin? → [ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md) Sección "Headers Middleware"

### ⚠️ "Tengo un error..."

**Error: Cannot find module**
- Solución: [SETUP_FASE_0.md](SETUP_FASE_0.md) Troubleshooting #1
- Qué hacer: `npm install` en carpeta backend/

**Error: CORS error**
- Solución: [SETUP_FASE_0.md](SETUP_FASE_0.md) Troubleshooting #2
- Qué hacer: Verificar CORS_ORIGIN en .env

**Error: Firebase credentials not found**
- Solución: [SETUP_FASE_0.md](SETUP_FASE_0.md) Troubleshooting #3
- Qué hacer: Descargar JSON de Firebase Console

**Error: Token invalid/expired**
- Solución: [ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md) "Manejo de Errores"
- Qué hacer: AJAX automáticamente redirige a login

**Error: 404 Not Found**
- Solución: [ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md) Sección "Errors"
- Qué hacer: Verificar URL del endpoint es correcta

### 📅 "¿Cuándo es la Fase X?"

- **Fase 0:** Ahora (COMPLETADA) ✅
- **Fase 1:** Próxima (2-3 días) → Ver [DASHBOARD_PROGRESO.md](DASHBOARD_PROGRESO.md)
- **Fase 2-7:** Consulta [PLAN_FASES.md](PLAN_FASES.md) para timeline completo

---

## 📚 LECTURA RECOMENDADA POR PERFIL

### 👶 Generar Usuario (Primer día)
1. [INICIO_RAPIDO.md](INICIO_RAPIDO.md) - 5 minutos
2. Ejecutar setup - 10 minutos
3. Leer [EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js) primeras 100 líneas - 10 minutos

**Resultado:** Tendrá servidor corriendo y entenderá AJAX básico

### 👨‍💻 Developer Experimentado
1. [ESTRUCTURA_FINAL_FASE0.md](ESTRUCTURA_FINAL_FASE0.md) - 5 minutos
2. [ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md) - 15 minutos
3. Revisar código:
   - public/js/ajax.js
   - backend/server.js
   - backend/src/middleware/

**Resultado:** Entenderá arquitectura completa y podrá continuar con Fase 1

### 🛠️ DevOps/Deployment
1. [SETUP_FASE_0.md](SETUP_FASE_0.md) - 20 minutos
2. [PLAN_FASES.md](PLAN_FASES.md) Fase 7 - 10 minutos
3. Configurar .env para producción

**Resultado:** Sabrá cómo deployar a Vercel/Heroku

### 📊 Project Manager
1. [PLAN_FASES.md](PLAN_FASES.md) - 15 minutos
2. [DASHBOARD_PROGRESO.md](DASHBOARD_PROGRESO.md) - 10 minutos
3. Mantenimiento de checklist

**Resultado:** Tendrá timeline y podrá trackear progreso

---

## 🎓 FLUJO DE APRENDIZAJE SUGERIDO

### Día 1 (Setup)
- [ ] Leer [INICIO_RAPIDO.md](INICIO_RAPIDO.md)
- [ ] Instalar Node.js y npm
- [ ] Clonar/descargar proyecto
- [ ] Ejecutar `npm install`
- [ ] Configurar Firebase
- [ ] Verificar que `npm run dev` funciona

### Día 2 (Comprensión)
- [ ] Leer [ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md)
- [ ] Revisar código en `public/js/ajax.js`
- [ ] Revisar `backend/server.js`
- [ ] Entender flujo completo

### Día 3+ (Implementación)
- [ ] Leer [EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js)
- [ ] Comenzar Fase 1 (Autenticación)
- [ ] Usar documentación como referencia
- [ ] Implementar endpoints
- [ ] Testear con Postman/curl

---

## 🎯 DOCUMENTACIÓN POR FASE

### ✅ FASE 0: Setup (COMPLETADA)
- Leer: [INICIO_RAPIDO.md](INICIO_RAPIDO.md)
- Referencia: [SETUP_FASE_0.md](SETUP_FASE_0.md)
- Estructura: [ESTRUCTURA_FINAL_FASE0.md](ESTRUCTURA_FINAL_FASE0.md)
- Progreso: [DASHBOARD_PROGRESO.md](DASHBOARD_PROGRESO.md) Fase 0

### 🟡 FASE 1: Autenticación (PRÓXIMA)
- Leer: [PLAN_FASES.md](PLAN_FASES.md) Fase 1
- Ejemplos: [EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js) líneas 1-75
- Arquitectura: [ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md) Sección "Autenticación"
- Progreso: [DASHBOARD_PROGRESO.md](DASHBOARD_PROGRESO.md) Fase 1

### ⚪ FASE 2: Medicamentos CRUD
- Leer: [PLAN_FASES.md](PLAN_FASES.md) Fase 2
- Ejemplos: [EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js) líneas 100-200
- Arquitectura: [ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md) Sección "CRUD"

### ⚪ FASE 3: Alertas
- Leer: [PLAN_FASES.md](PLAN_FASES.md) Fase 3
- Ejemplos: [EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js)

### ⚪ FASE 4: Reportes
- Leer: [PLAN_FASES.md](PLAN_FASES.md) Fase 4
- Ejemplos: [EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js) líneas 350+

### ⚪ FASE 5: Usuarios
- Leer: [PLAN_FASES.md](PLAN_FASES.md) Fase 5

### ⚪ FASE 6: Testing
- Leer: [PLAN_FASES.md](PLAN_FASES.md) Fase 6

### ⚪ FASE 7: Deployment
- Leer: [PLAN_FASES.md](PLAN_FASES.md) Fase 7
- Setup: [SETUP_FASE_0.md](SETUP_FASE_0.md) Sección "Deployment"

---

## 🔗 REFERENCIAS RÁPIDAS

### Métodos AJAX
```javascript
// Ver en: public/js/ajax.js
AJAX.get(url, options)
AJAX.post(url, data)
AJAX.put(url, data)
AJAX.delete(url)
AJAX.patch(url, data)
AJAX.uploadFile(url, file, onProgress)
```

### Notificaciones
```javascript
// Ver ejemplos en: EJEMPLOS_AJAX.js
NOTIFY.success(message)
NOTIFY.error(message)
NOTIFY.info(message)
```

### Loaders
```javascript
// Ver ejemplos en: EJEMPLOS_AJAX.js
SCREEN.showLoading()
SCREEN.hideLoading()
SCREEN.showSkeleton(selector)
SCREEN.hideSkeleton()
```

### Endpoints implementados
```
GET  /api/health         ← Prueba que servidor funciona
GET  /api/version        ← Versión del API
```

### Endpoints por crear
```
Fase 1: /api/auth/*
Fase 2: /api/medicamentos/*
Fase 3: /api/alertas/*
Fase 4: /api/reportes/*
Fase 5: /api/users/*
```

---

## 💬 COMANDOS ÚTILES

### Iniciar desarrollo
```bash
cd backend
npm run dev
```

### Instalar dependencias
```bash
npm install
```

### Test de API
```bash
curl http://localhost:3000/api/health
```

### Tree de carpetas (Windows)
```bash
tree /F backend\
```

---

## 🆘 SOPORTE Y AYUDA

| Problema | Dónde Buscar |
|----------|-------------|
| No funciona setup | [SETUP_FASE_0.md](SETUP_FASE_0.md) Troubleshooting |
| Error CORS | [ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md) Headers Middleware |
| No entiende AJAX | [EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js) primeras 50 líneas |
| Estructura del proyecto | [ESTRUCTURA_FINAL_FASE0.md](ESTRUCTURA_FINAL_FASE0.md) |
| Cuándo es la próxima fase | [DASHBOARD_PROGRESO.md](DASHBOARD_PROGRESO.md) |

---

## 📝 CHECKLIST DE LECTURA

### Debo leer ANTES de tocar código
- [ ] [INICIO_RAPIDO.md](INICIO_RAPIDO.md)
- [ ] [ESTRUCTURA_FINAL_FASE0.md](ESTRUCTURA_FINAL_FASE0.md)

### Debo leer ANTES de Fase 1
- [ ] [EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js)
- [ ] [ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md)
- [ ] [PLAN_FASES.md](PLAN_FASES.md) Fase 1

### Debo leer cuando tenga problemas
- [ ] [SETUP_FASE_0.md](SETUP_FASE_0.md) Troubleshooting
- [ ] [ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md) Manejo de Errores

### Debo leer regularmente
- [ ] [DASHBOARD_PROGRESO.md](DASHBOARD_PROGRESO.md) (cada fase)

---

## ⏱️ TIEMPO DE LECTURA ESTIMADO

```
MÍNIMO (just setup):              15 minutos
BÁSICO (setup + ejemplos):        45 minutos
COMPLETO (todo):                   2 horas
PROFUNDO (incluye análisis):       4 horas
```

---

## 🚀 ¿POR DÓNDE EMPIEZO?

### Si es tu PRIMERA VEZ:
👉 Comienza con **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)**

### Si ya hiciste el setup:
👉 Continúa con **[EJEMPLOS_AJAX.js](EJEMPLOS_AJAX.js)**

### Si quieres entender todo:
👉 Lee **[ARQUITECTURA_AJAX.md](ARQUITECTURA_AJAX.md)**

### Si necesitas un plan:
👉 Consulta **[PLAN_FASES.md](PLAN_FASES.md)**

### Si tienes problemas:
👉 Revisa **[SETUP_FASE_0.md](SETUP_FASE_0.md)** Troubleshooting

---

## ✨ DOCUMENTACIÓN ESPECIAL

| Archivo | Tipo | Uso |
|---------|------|-----|
| **INICIO_RAPIDO.md** | 📄 Guía | Primer contacto |
| **SETUP_FASE_0.md** | 📘 Manual | Completo y detallado |
| **ARQUITECTURA_AJAX.md** | 🏗️ Diagramas | Entender sistema |
| **EJEMPLOS_AJAX.js** | 💻 Código | Copiar/adaptar |
| **PLAN_FASES.md** | 📊 Roadmap | Planificar proyecto |
| **DASHBOARD_PROGRESO.md** | 📈 Progreso | Trackear avance |
| **ESTRUCTURA_FINAL_FASE0.md** | 📂 Índice | Archivos creados |
| **INDICE_DOCUMENTACION.md** | 🗺️ Mapa | **Eres acá** |

---

## 🎉 ¡LISTO PARA EMPEZAR!

**Próximo paso:**
1. Lee [INICIO_RAPIDO.md](INICIO_RAPIDO.md) (5 minutos)
2. Ejecuta `npm install` (2 minutos)
3. Inicia servidor: `npm run dev` (1 minuto)

**¡Listo! Habrás completado toda la Fase 0.** ✅

---

**Última actualización:** 2026-04-15
**Estado:** Fase 0 Completada ✅ | Próxima: Fase 1 🟡
**Preguntas?** Consulta la documentación o el troubleshooting.

---

Hecho con ❤️ para Farmacia MM
