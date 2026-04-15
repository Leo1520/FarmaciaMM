/**
 * Configuración de Firebase Admin SDK
 * Conecta con Firestore y Authentication
 */

const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

// Verificar si estamos en desarrollo o producción
const isDevelopment = process.env.NODE_ENV === 'development';

let firebaseConfig = {};

if (isDevelopment) {
    // En desarrollo: usar archivo de credenciales
    const serviceAccountPath = process.env.FIREBASE_ADMIN_SDK_KEY || 
        path.join(__dirname, '../../firebase-credentials.json');
    
    try {
        firebaseConfig = require(serviceAccountPath);
    } catch (error) {
        console.warn('⚠️ Archivo de credenciales Firebase no encontrado');
        console.warn('Para desarrollo local: descarga firebase-credentials.json desde Firebase Console');
        console.warn('Path esperado:', serviceAccountPath);
    }
} else {
    // En producción: usar variables de entorno
    firebaseConfig = {
        type: 'service_account',
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs'
    };
}

// Inicializar Firebase Admin
if (Object.keys(firebaseConfig).length > 0 || process.env.FIREBASE_PROJECT_ID) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig),
            projectId: firebaseConfig.project_id || process.env.FIREBASE_PROJECT_ID
        });
        console.log('✅ Firebase Admin SDK inicializado correctamente');
    } catch (error) {
        console.error('❌ Error inicializando Firebase:', error.message);
    }
} else {
    console.warn('⚠️ Firebase no está configurado. Algunas funcionalidades estarán limitadas.');
}

// Exportar instancias
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

module.exports = {
    admin,
    db,
    auth,
    storage,
    firebaseConfig
};
