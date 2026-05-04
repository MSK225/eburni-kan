import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuration Firebase de TEST (pour développement)
// ⚠️ REMPLACER PAR VOS VRAIES CLÉS AVANT PRODUCTION
const firebaseConfig = {
  apiKey: "AIzaSyDUMMY_API_KEY_FOR_TESTING_ONLY",
  authDomain: "eburni-kan-test.firebaseapp.com",
  projectId: "eburni-kan-test",
  storageBucket: "eburni-kan-test.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:dummy_app_id_for_testing",
};

// ⚠️ IMPORTANT : Cette config est FAUSSE et ne fonctionnera pas !
// Pour que l'authentification fonctionne, vous devez :
// 1. Créer un vrai projet Firebase sur https://console.firebase.google.com/
// 2. Activer Authentication > Email/Password
// 3. Copier la vraie configuration depuis Project Settings > Your apps

// MODE DÉVELOPPEMENT : Désactiver l'authentification pour les tests
export const IS_DEVELOPMENT = __DEV__; // true en développement, false en production
export const SKIP_AUTH = IS_DEVELOPMENT && true; // Mettre false pour forcer l'auth même en dev

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Auth
export const auth = getAuth(app);

export default app;
