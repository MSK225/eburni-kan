import { Platform } from "react-native";

// Fonction utilitaire pour charger les vidéos en toute sécurité
export function getVideoSource(videoPath, fallbackUri = null) {
  try {
    // En développement, on utilise require() pour les assets locaux
    if (__DEV__ && Platform.OS !== "web") {
      return require(videoPath);
    }
    // En production ou web, on utilise les URIs
    return { uri: fallbackUri || videoPath };
  } catch (error) {
    console.warn(`Vidéo non trouvée: ${videoPath}`, error);
    // Retourner une vidéo de fallback ou null
    return fallbackUri ? { uri: fallbackUri } : null;
  }
}

// Exemple d'utilisation dans culture.js :
// videoSource: getVideoSource("../../assets/videos/lievre-tortue.mp4", "https://votredomaine.com/videos/lievre-tortue.mp4")
