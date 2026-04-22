# 🧪 Guide de test : Suppression de comptes

## ⚡ Test rapide (2 minutes)

### 1. Créer un compte test

- Email : `test123@example.com`
- Mot de passe : `test123`

### 2. Utiliser l'app

- Faire 1-2 leçons
- Répondre à quelques quiz
- Vérifier que la progression se sauvegarde

### 3. Supprimer le compte

- Aller dans Profil
- Cliquer "Supprimer mon compte"
- Confirmer 2 fois
- Vérifier que vous êtes redirigé vers l'écran d'auth

### 4. Vérifier dans Firebase

- Ouvrir https://console.firebase.google.com/
- Authentication → Users
- Le compte `test123@example.com` devrait avoir disparu

## 🔄 Test multiple

Pour tester plusieurs comptes :

1. Créer `test1@example.com`, `test2@example.com`, etc.
2. Tester la suppression pour chacun
3. Vérifier qu'ils disparaissent tous de Firebase

## 📱 Test sur appareil

- Tester sur un vrai téléphone (pas juste simulateur)
- Vérifier que la suppression fonctionne hors ligne
- Tester la reconnexion après suppression

## ✅ Validation

- [ ] Compte créé avec succès
- [ ] Données sauvegardées pendant l'utilisation
- [ ] Bouton de suppression visible et accessible
- [ ] Double confirmation fonctionne
- [ ] Compte supprimé de Firebase
- [ ] Redirection vers écran d'auth
- [ ] Impossible de se reconnecter avec le compte supprimé

**Prêt pour les vrais tests utilisateurs ! 🚀**
