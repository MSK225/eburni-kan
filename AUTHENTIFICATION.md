# 🔐 Système d'authentification Eburni-kan

## 🚀 Vue d'ensemble

L'app inclut maintenant un système d'authentification complet avec Firebase qui permet aux utilisateurs de :

- Créer un compte
- Se connecter/déconnecter
- Sauvegarder leur progression dans le cloud
- Synchroniser leurs données entre appareils

## ⚙️ Configuration Firebase

### 1. Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet"
3. Donnez un nom à votre projet (ex: "eburni-kan")
4. Activez Google Analytics (optionnel)

### 2. Activer Authentication

1. Dans votre projet Firebase, allez dans "Authentication"
2. Cliquez sur "Commencer"
3. Allez dans l'onglet "Sign-in method"
4. Activez "Email/Password"

### 3. Configurer l'app

1. Dans "Project settings" (icône ⚙️), faites défiler vers "Your apps"
2. Cliquez sur "Add app" → Web app (</>)
3. Donnez un nom à votre app
4. Copiez la configuration Firebase

### 4. Mettre à jour le code

Remplacez la configuration dans `src/config/firebase.ts` :

```typescript
const firebaseConfig = {
  apiKey: "votre-api-key",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-project-id",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "votre-app-id",
};
```

## 🎯 Fonctionnalités

### Authentification

- **Inscription** : Création de compte avec email/mot de passe
- **Connexion** : Accès avec email/mot de passe existant
- **Déconnexion** : Bouton dans l'écran Profil
- **Persistance** : L'utilisateur reste connecté entre sessions

### Synchronisation des données

- **Progression** : Sauvegardée automatiquement dans le cloud
- **Badges** : Synchronisés entre appareils
- **Statistiques** : Partagées sur tous les appareils

### Sécurité

- **Validation** : Mots de passe ≥ 6 caractères
- **Messages d'erreur** : En français pour une meilleure UX
- **Protection** : Accès aux données uniquement pour l'utilisateur connecté

## 🛠️ Architecture technique

### Contextes

- **AuthContext** : Gestion de l'état d'authentification
- **ProgressContext** : Progression avec userId intégré

### Services

- **Firebase Auth** : Authentification sécurisée
- **AsyncStorage** : Persistance locale
- **API Service** : Synchronisation avec backend

### Navigation

- **Navigation conditionnelle** : Redirection auto selon état d'auth
- **Protection des routes** : Accès app uniquement si connecté

## 📱 Utilisation

### Pour les utilisateurs

1. **Premier lancement** : Écran d'authentification
2. **Inscription** : Créer un compte avec email/mot de passe
3. **Connexion** : Se connecter avec compte existant
4. **Utilisation normale** : Toute la progression est sauvegardée
5. **Déconnexion** : Bouton rouge dans Profil

### Pour les développeurs

- **Test sans Firebase** : Commentez l'import Firebase pour développement local
- **Debug auth** : Console logs pour les erreurs d'authentification
- **Reset données** : AsyncStorage.clear() pour développement

## 🔧 Dépannage

### Erreur "Firebase config"

- Vérifiez que la config Firebase est correcte
- Assurez-vous que le projet Firebase existe

### Erreur "Auth/network-request-failed"

- Vérifiez la connexion internet
- Firebase peut être bloqué par un firewall

### Erreur "Invalid API key"

- Vérifiez que l'API key est correcte
- Le projet Firebase doit être actif

### Utilisateur reste connecté

- Les données sont dans AsyncStorage
- Utilisez `AsyncStorage.removeItem('@eburni_auth_user')` pour reset

## �️ Suppression de comptes de test

### Méthode 1 : Via l'app (Recommandé pour les tests)

**Dans l'écran Profil :**

1. Allez dans l'onglet "Profil"
2. Faites défiler vers le bas
3. Cliquez sur **"Supprimer mon compte"** (bouton rouge foncé)
4. **Confirmez 2 fois** (sécurité anti-erreur)
5. Le compte et toutes les données sont supprimés

**⚠️ ATTENTION :** Cette action est **IRRÉVERSIBLE** ! Tous les progrès sont perdus.

### Méthode 2 : Via Firebase Console (Pour les admins)

**Accès rapide :**

1. Allez sur https://console.firebase.google.com/
2. Sélectionnez votre projet
3. Menu gauche : **"Authentication"**
4. Onglet **"Users"**
5. Cochez les comptes à supprimer
6. Cliquez **"Delete selected users"**

**Avantages :** Plus rapide pour supprimer plusieurs comptes d'un coup.

### Méthode 3 : Script de nettoyage (Pour les développeurs)

```javascript
// Dans la console du navigateur (développement seulement)
import { getAuth, deleteUser } from "firebase/auth";
const auth = getAuth();
const user = auth.currentUser;
if (user) {
  deleteUser(user).then(() => console.log("Compte supprimé"));
}
```

## 🧪 Workflow de test recommandé

1. **Créer un compte test** : `test1@example.com`
2. **Utiliser l'app** : Faire quelques leçons, gagner des badges
3. **Tester la suppression** : Via le bouton "Supprimer mon compte"
4. **Vérifier** : Le compte disparaît de Firebase Console
5. **Répéter** : Avec différents scénarios

## 📊 Données supprimées

Lors de la suppression d'un compte :

- ✅ **Authentification Firebase** : Compte utilisateur
- ✅ **Progression locale** : AsyncStorage nettoyé
- ✅ **Événements stockés** : Historique d'apprentissage
- ❌ **Données serveur** : À gérer séparément si vous avez un backend

## 🔒 Sécurité

- **Double confirmation** : Impossible de supprimer accidentellement
- **Authentification requise** : Seul le propriétaire peut supprimer
- **Nettoyage complet** : Aucune donnée résiduelle

## �🚀 Prochaines étapes

### Améliorations possibles

- **Auth sociale** : Google, Facebook, Apple Sign-In
- **Reset mot de passe** : Fonctionnalité "mot de passe oublié"
- **Profils utilisateurs** : Avatar, nom d'utilisateur
- **Multi-appareils** : Synchronisation temps réel

### Backend

- **Base de données** : Firestore pour données utilisateurs
- **API REST** : Endpoints pour statistiques globales
- **Analytics** : Suivi d'utilisation détaillé

## 📋 Checklist déploiement

- [ ] Projet Firebase créé et configuré
- [ ] Authentication activée
- [ ] Config Firebase mise à jour dans le code
- [ ] App testée avec compte réel
- [ ] Règles Firestore configurées (si utilisé)
- [ ] Variables d'environnement pour production

---

**L'authentification est maintenant intégrée !** 🎉

Les utilisateurs peuvent créer un compte et leur progression sera sauvegardée en toute sécurité.
