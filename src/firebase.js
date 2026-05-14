// ============================================================
// FIREBASE CONFIG — F&A RELOJES
// ============================================================
// INSTRUCCIONES PARA CONFIGURAR (5 minutos):
//
// 1. Ir a https://console.firebase.google.com
// 2. Click en "Agregar proyecto" → nombre: "fya-relojes" → Crear
// 3. En el panel, click en el ícono </> (Web) → registrar app → nombre: "fya-relojes"
// 4. Copiá los valores que te muestra y pegálos abajo
// 5. En el panel izquierdo: Build → Firestore Database → Crear base de datos
//    → Elegí "Iniciar en modo de prueba" → Listo
// ============================================================

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "PEGA_TU_apiKey_AQUI",
  authDomain: "PEGA_TU_authDomain_AQUI",
  projectId: "PEGA_TU_projectId_AQUI",
  storageBucket: "PEGA_TU_storageBucket_AQUI",
  messagingSenderId: "PEGA_TU_messagingSenderId_AQUI",
  appId: "PEGA_TU_appId_AQUI",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
