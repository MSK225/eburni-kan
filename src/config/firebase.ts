import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuration Firebase (à remplacer par vos vraies clés)
// Si vous voyez encore ce fichier avec 'your-api-key', l'authentification ne fonctionnera pas.
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Auth
export const auth = getAuth(app);

export default app;
