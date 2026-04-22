# 🚀 Configuration rapide Firebase

## Étape 1 : Créer le projet Firebase

1. Allez sur https://console.firebase.google.com/
2. Cliquez "Créer un projet"
3. Nom : `eburni-kan-app`
4. Activez Google Analytics (optionnel)
5. Cliquez "Créer"

## Étape 2 : Activer Authentication

1. Dans le menu gauche : "Authentication"
2. Onglet "Sign-in method"
3. Activez "Email/Password"
4. Sauvegardez

## Étape 3 : Configurer l'app Web

1. Dans "Project settings" (⚙️)
2. Section "Your apps" → "Add app" → Web (</>)
3. Nom : `Eburni-kan Web App`
4. **COCHEZ** "Also set up Firebase Hosting" (optionnel)
5. Cliquez "Register app"

## Étape 4 : Copier la config

Vous verrez ce code :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "eburni-kan-app.firebaseapp.com",
  projectId: "eburni-kan-app",
  storageBucket: "eburni-kan-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
};
```

## Étape 5 : Mettre à jour le code

Remplacez dans `src/config/firebase.ts` :

```typescript
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "eburni-kan-app.firebaseapp.com",
  projectId: "eburni-kan-app",
  storageBucket: "eburni-kan-app.appspot.com",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID",
};
```

## Étape 6 : Tester

1. `npx expo start`
2. L'app vous redirige vers l'écran d'authentification
3. Créez un compte test
4. Utilisez l'app normalement

**C'est tout !** 🎉 Votre app a maintenant l'authentification fonctionnelle.
