// EXEMPLE : Comment modifier src/data/culture.js pour vos vidéos
// Remplacez les lignes correspondantes dans le fichier original

export const tales = [
  {
    id: 1,
    title: "Le lièvre et la tortue",
    description: "Une histoire sur la persévérance et l'humilité.",
    // MODIFIEZ CETTE LIGNE :
    videoSource: require("../../assets/videos/lievre-tortue.mp4"), // ← Votre vidéo locale
    // Gardez cette ligne pour la production :
    videoUrl: "https://votredomaine.com/videos/lievre-tortue.mp4",
    duration: "5 min",
    // Optionnel : ajoutez une miniature
    thumbnail: require("../../assets/images/lievre-tortue-thumb.jpg"),
  },
  {
    id: 2,
    title: "Le singe et le crocodile",
    description: "Une leçon sur la confiance et la trahison.",
    // MODIFIEZ CETTE LIGNE :
    videoSource: require("../../assets/videos/singe-crocodile.mp4"), // ← Votre vidéo locale
    videoUrl: "https://votredomaine.com/videos/singe-crocodile.mp4",
    duration: "7 min",
    thumbnail: require("../../assets/images/singe-crocodile-thumb.jpg"),
  },
  {
    id: 3,
    title: "Le chasseur et le génie",
    description: "Une histoire sur l'intelligence et la sagesse.",
    // MODIFIEZ CETTE LIGNE :
    videoSource: require("../../assets/videos/chasseur-genie.mp4"), // ← Votre vidéo locale
    videoUrl: "https://votredomaine.com/videos/chasseur-genie.mp4",
    duration: "6 min",
    thumbnail: require("../../assets/images/chasseur-genie-thumb.jpg"),
  },
];
