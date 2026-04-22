export const proverbs = [
  {
    malinke: "Mogoya ka ca siya la",
    francais: "L'humanité est plus grande que l'ethnie",
    explication:
      "Ce proverbe rappelle que le respect et la solidarité sont plus forts que les différences ethniques.",
  },
  {
    malinke: "Kuma ka ca kɛlɛ la",
    francais: "La parole est plus forte que la guerre",
    explication: "La diplomatie et le dialogue sont préférables à la violence.",
  },
  {
    malinke: "Siya ka ca dɔ la",
    francais: "La paix est plus grande que la richesse",
    explication:
      "La paix et l'harmonie valent plus que tous les biens matériels.",
  },
  {
    malinke: "Hɛrɛ ka ca dɔ la",
    francais: "La patience est plus grande que la richesse",
    explication: "La patience apporte plus de valeur que l'argent.",
  },
  {
    malinke: "Kɛlɛ ka ca dɔ la",
    francais: "Le travail est plus grand que la richesse",
    explication:
      "Le travail honnête est plus précieux que l'argent facilement gagné.",
  },
  {
    malinke: "Dɔnkili ka ca dɔ la",
    francais: "L'amitié est plus grande que la richesse",
    explication: "Les vrais amis sont plus précieux que l'argent.",
  },
  {
    malinke: "Kuma ka ca kɛlɛ la",
    francais: "La parole est plus forte que la guerre",
    explication: "Le dialogue résout plus de problèmes que la confrontation.",
  },
];

export const expressions = [
  {
    malinke: "Suturo ni men",
    francais: "La paix pour toi aussi",
    contexte: "Réponse à une salutation, exprime le respect mutuel.",
  },
  {
    malinke: "I ni ce",
    francais: "Salut l'homme",
    contexte: "Salutation générale pour un homme.",
  },
  {
    malinke: "I ni muso",
    francais: "Salut la femme",
    contexte: "Salutation générale pour une femme.",
  },
  {
    malinke: "An bɛ",
    francais: "Nous allons bien",
    contexte: "Réponse à 'I ka kɛnɛ wa?' (Comment ça va?)",
  },
];

export const tales = [
  {
    id: 1,
    title: "Le lièvre et la tortue",
    description: "Une histoire sur la persévérance et l'humilité.",
    videoSource: "https://www.youtube.com/watch?v=wfWZmJoJUGA",
    videoUrl: "https://example.com/tale1.mp4", // URL pour production
    duration: "5 min",
    thumbnail: null, // Pas de miniature pour le test
  },
  {
    id: 2,
    title: "Le singe et le crocodile",
    description: "Une leçon sur la confiance et la trahison.",
    videoSource: "https://www.youtube.com/watch?v=RGWRWIm0mp8",
    videoUrl: "https://example.com/tale2.mp4", // URL pour production
    duration: "7 min",
    thumbnail: null, // Pas de miniature pour le test
  },
  {
    id: 3,
    title: "Le chasseur et le génie",
    description: "Une histoire sur l'intelligence et la sagesse.",
    videoSource: "https://www.youtube.com/watch?v=wsk2Byd4qvA",
    videoUrl: "https://example.com/tale3.mp4", // URL pour production
    duration: "6 min",
    thumbnail: null, // Pas de miniature pour le test
  },
];

export function getDailyProverb() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24),
  );
  const index = dayOfYear % proverbs.length;
  return proverbs[index];
}

export function getDailyExpression() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24),
  );
  const index = (dayOfYear + 3) % expressions.length; // Offset to get different content
  return expressions[index];
}
