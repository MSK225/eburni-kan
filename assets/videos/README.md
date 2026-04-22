# Guide d'intégration des vidéos pour Eburni-kan

## 🚀 Étape 1 : Préparer vos vidéos

### Formats recommandés :

- **Format** : MP4 (H.264)
- **Résolution** : 720p ou 1080p
- **Durée** : 2-10 minutes par vidéo
- **Taille** : < 50MB pour les téléchargements mobiles

### Nommage des fichiers :

```
lievre-tortue.mp4
singe-crocodile.mp4
chasseur-genie.mp4
```

## 📁 Étape 2 : Placer les vidéos

### Option A : Fichiers locaux

Copiez vos fichiers MP4 dans le dossier `assets/videos/`

### Option B : URLs YouTube (RECOMMANDÉ pour les tests)

Utilisez directement les URLs YouTube - c'est plus simple !

## ⚙️ Étape 3 : Modifier le code

### Dans `src/data/culture.js`, remplacez :

#### Pour des fichiers locaux :

```javascript
videoSource: require("../../assets/videos/lievre-tortue.mp4");
```

#### Pour des URLs YouTube :

```javascript
videoSource: "https://www.youtube.com/watch?v=VIDEO_ID";
```

### Exemple complet avec YouTube :

```javascript
{
  id: 1,
  title: "Le lièvre et la tortue",
  description: "Une histoire sur la persévérance et l'humilité.",
  videoSource: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ← Votre URL YouTube
  videoUrl: "https://example.com/tale1.mp4", // Pour production
  duration: "5 min",
  thumbnail: null,
}
```

## 🎯 Étape 4 : Tester

1. Lancez l'app : `npx expo start`
2. Allez dans l'onglet "Culture"
3. Cliquez sur un conte → La vidéo YouTube se lance dans la modal

## 🔄 Pour la production (avec backend)

Quand l'équipe backend sera prête :

1. Uploadez les vidéos sur votre serveur/stockage cloud
2. Utilisez les URLs dans le champ `videoUrl`
3. Le code basculera automatiquement entre test (YouTube/local) et production (URL)

## 📝 Checklist avant test

- [ ] URLs YouTube valides
- [ ] Code modifié dans `culture.js`
- [ ] Application relancée
- [ ] Test sur un appareil réel (recommandé)

## 🆘 Dépannage

### Vidéo YouTube ne se charge pas :

- Vérifiez que l'URL est publique
- Testez l'URL dans un navigateur
- Certaines vidéos peuvent être bloquées pour l'embed

### Problème de performance :

- Les vidéos YouTube peuvent être lentes sur mobile
- Envisagez de compresser vos propres vidéos pour la production

## 🎬 URLs YouTube de test

Voici quelques vidéos YouTube de test que vous pouvez utiliser :

1. **Le lièvre et la tortue** : `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
2. **Le singe et le crocodile** : `https://www.youtube.com/watch?v=oHg5SJYRHA0`
3. **Le chasseur et le génie** : `https://www.youtube.com/watch?v=9bZkp7q19f0`

**Envoyez-moi vos URLs YouTube et je les intègre immédiatement !**

```

## 🎯 Étape 4 : Tester

1. Lancez l'app : `npx expo start`
2. Allez dans l'onglet "Culture"
3. Cliquez sur un conte → La vidéo devrait se lancer

## 🔄 Pour la production (avec backend)

Quand l'équipe backend sera prête :

1. Uploadez les vidéos sur votre serveur/stockage cloud
2. Utilisez les URLs dans le champ `videoUrl`
3. Le code basculera automatiquement entre test (local) et production (URL)

## 📝 Checklist avant test

- [ ] Vidéos MP4 dans `assets/videos/`
- [ ] Noms de fichiers corrects
- [ ] Code modifié dans `culture.js`
- [ ] Application relancée
- [ ] Test sur un appareil réel (recommandé)

## 🆘 Dépannage

### Erreur "Module not found" :

- Vérifiez le chemin du fichier vidéo
- Assurez-vous que le fichier existe dans `assets/videos/`

### Vidéo ne se lance pas :

- Vérifiez le format MP4
- Testez avec une vidéo plus petite (< 10MB)

### Problème de performance :

- Compressez les vidéos si nécessaire
- Utilisez des résolutions plus basses pour mobile
```
