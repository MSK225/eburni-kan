# 🔧 Mode Développement - Authentification

## 🎯 Vue d'ensemble

L'app supporte maintenant un **mode développement** qui permet de tester toutes les fonctionnalités sans configurer Firebase. Cela facilite les tests et le développement.

## 🚀 Comment ça fonctionne

### En développement (`__DEV__ = true`)

- **Authentification automatique** : L'app se connecte automatiquement avec un utilisateur fictif
- **Toutes les fonctionnalités** : Jeux, progression, badges, suppression de compte
- **Console logs** : Messages indiquant le mode développement actif

### En production (`__DEV__ = false`)

- **Authentification Firebase** : Nécessite une vraie configuration Firebase
- **Comptes réels** : Inscription/connexion avec email/mot de passe
- **Synchronisation cloud** : Données sauvegardées sur Firebase

## ⚙️ Configuration

### Activer/Désactiver le mode développement

Dans `src/config/firebase.ts` :

```typescript
// Désactiver l'authentification en développement
export const SKIP_AUTH = IS_DEVELOPMENT && true; // true = mode dev, false = auth Firebase

// Pour forcer l'auth même en développement :
export const SKIP_AUTH = false;
```

### Utilisateur de test en mode développement

- **Email** : `dev@example.com`
- **UID** : `dev-user-123`
- **Nom** : `Utilisateur Test`
- **Statut** : Toujours connecté

## 🧪 Test du mode développement

1. **Lancer l'app** : `npx expo start`
2. **Vérifier la console** : "🔧 MODE DÉVELOPPEMENT : Authentification désactivée"
3. **Accès direct** : L'app s'ouvre directement sur l'écran principal
4. **Toutes les fonctionnalités** : Testez leçons, quiz, jeux, culture, profil

## 🔄 Passer en mode production

### 1. Créer un projet Firebase

- Aller sur https://console.firebase.google.com/
- "Créer un projet" → `eburni-kan-prod`
- Activer Google Analytics (optionnel)

### 2. Activer Authentication

- Menu "Authentication"
- Onglet "Sign-in method"
- Activer "Email/Password"

### 3. Configurer l'app

- "Project settings" → "Your apps"
- "Add app" → Web app (</>)
- Copier la configuration

### 4. Remplacer la config

Dans `src/config/firebase.ts` :

```typescript
const firebaseConfig = {
  apiKey: "VOTRE_VRAIE_API_KEY",
  authDomain: "eburni-kan-prod.firebaseapp.com",
  projectId: "eburni-kan-prod",
  storageBucket: "eburni-kan-prod.appspot.com",
  messagingSenderId: "VOTRE_MESSAGING_ID",
  appId: "VOTRE_APP_ID",
};
```

### 5. Désactiver le mode développement

```typescript
export const SKIP_AUTH = false; // Forcer l'auth Firebase
```

## 📱 Fonctionnalités disponibles en mode développement

- ✅ **Navigation complète** : Tous les écrans accessibles
- ✅ **Progression** : Sauvegardée localement (AsyncStorage)
- ✅ **Jeux** : Fonctionnels avec scoring
- ✅ **Badges** : Système complet
- ✅ **Culture** : Contes avec vidéos YouTube
- ✅ **Suppression de compte** : Simulée (bouton visible)
- ❌ **Synchronisation cloud** : Données locales uniquement

## 🐛 Dépannage

### L'authentification ne se désactive pas

- Vérifier `SKIP_AUTH = true` dans `firebase.ts`
- Redémarrer l'app complètement
- Vider le cache Expo : `npx expo start --clear`

### Erreur Firebase en mode développement

- Le mode dev devrait éviter tous les appels Firebase
- Vérifier la console pour les messages d'erreur
- Si problème persiste, forcer `SKIP_AUTH = true`

### Données de test perdues

- Les données sont dans AsyncStorage
- Pour reset : Supprimer l'app du téléphone ou utiliser "Supprimer mon compte"

## 🎯 Workflow recommandé

1. **Développement** : `SKIP_AUTH = true` pour tests rapides
2. **Tests d'intégration** : `SKIP_AUTH = false` avec vraie config Firebase
3. **Production** : `SKIP_AUTH = false` avec config de production

**Le mode développement permet de se concentrer sur les fonctionnalités sans se soucier de l'authentification !** 🚀
