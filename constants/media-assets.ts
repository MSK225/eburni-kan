/**
 * Médias locaux — images & vidéos Tradition (Nord Côte d'Ivoire)
 */

/** Logo officiel */
export const LOGO = require('@/assets/images/logo.svg');

/** Texture pagne / tissu pour fonds à 10 % d'opacité */
export const PAGNE_TEXTURE = require('@/assets/images/Tradition/25.jpg');

export const DUOTONE_IMAGES = {
  savane: require('@/assets/images/Tradition/20.jpg'),
  marche: require('@/assets/images/Tradition/32.jpg'),
  village: require('@/assets/images/Tradition/31.jpg'),
  culture: require('@/assets/images/Tradition/33.jpg'),
} as const;

/** Symboles de progression (charte) */
export const LEVEL_SYMBOLS = {
  debutant: require('@/assets/images/Tradition/19.png'),
  intermediaire: require('@/assets/images/Tradition/22.jpeg'),
  expert: require('@/assets/images/Tradition/37.jpg'),
} as const;

export type LevelKey = keyof typeof LEVEL_SYMBOLS;

/** Vidéos — contes, tutoriels, leçons */
export const TALE_VIDEOS = [
  require('@/assets/videos/Tradition/1.mp4'),
  require('@/assets/videos/Tradition/2.mp4'),
  require('@/assets/videos/Tradition/3.mp4'),
  require('@/assets/videos/Tradition/4.mp4'),
  require('@/assets/videos/Tradition/5.mp4'),
] as const;

/** Vidéos intro pour les leçons (rotation 1-5) */
export const LESSON_INTRO_VIDEOS = [
  require('@/assets/videos/Tradition/1.mp4'), // Leçon 1
  require('@/assets/videos/Tradition/2.mp4'), // Leçon 2
  require('@/assets/videos/Tradition/3.mp4'), // Leçon 3
  require('@/assets/videos/Tradition/4.mp4'), // Leçon 4
  require('@/assets/videos/Tradition/5.mp4'), // Leçon 5
] as const;

export const TALE_THUMBNAILS = [
  require('@/assets/images/Tradition/1.jpeg'),
  require('@/assets/images/Tradition/2.jpeg'),
  require('@/assets/images/Tradition/3.jpeg'),
  require('@/assets/images/Tradition/4.jpeg'),
  require('@/assets/images/Tradition/5.jpeg'),
] as const;

/** Galerie culture — images supplémentaires */
export const CULTURE_GALLERY = [
  require('@/assets/images/Tradition/6.jpeg'),
  require('@/assets/images/Tradition/7.jpeg'),
  require('@/assets/images/Tradition/8.jpeg'),
  require('@/assets/images/Tradition/9.jpeg'),
  require('@/assets/images/Tradition/10.jpeg'),
] as const;

/** Images par leçon (modules) — enrichissement visuel cours.tsx */
export const LESSON_IMAGES = {
  alphabet: require('@/assets/images/Tradition/11.jpeg'),
  vocabulary: require('@/assets/images/Tradition/12.jpeg'),
  grammar: require('@/assets/images/Tradition/13.jpeg'),
  pronunciation: require('@/assets/images/Tradition/14.jpeg'),
  culture: require('@/assets/images/Tradition/15.jpeg'),
} as const;

/** Images de preview pour les jeux */
export const GAME_IMAGES = {
  memory: require('@/assets/images/Tradition/16.jpeg'),
  matching: require('@/assets/images/Tradition/17.jpeg'),
  speedrun: require('@/assets/images/Tradition/18.jpeg'),
  dictation: require('@/assets/images/Tradition/21.jpg'),
} as const;

/** Galerie patrimoine & accomplissements profil */
export const PROFILE_HERITAGE = [
  require('@/assets/images/Tradition/23.jpeg'),
  require('@/assets/images/Tradition/24.jpeg'),
  require('@/assets/images/Tradition/26.jpg'),
  require('@/assets/images/Tradition/27.jpeg'),
  require('@/assets/images/Tradition/28.avif'),
  require('@/assets/images/Tradition/29.jpg'),
  require('@/assets/images/Tradition/30.jpg'),
] as const;

/** Images modules interactifs (flashcard, audio, quiz) */
export const INTERACTIVE_MODULES = {
  flashcard: require('@/assets/images/Tradition/34.jpg'),
  audio: require('@/assets/images/Tradition/35.jpg'),
  quiz: require('@/assets/images/Tradition/36.jpg'),
} as const;
