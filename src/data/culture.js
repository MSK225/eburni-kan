import { TALE_THUMBNAILS, TALE_VIDEOS } from "../../constants/media-assets";

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
    title: "Conte traditionnel I",
    description: "Sagesse et transmission — Nord de la Côte d'Ivoire.",
    videoSource: TALE_VIDEOS[0],
    videoUrl: null,
    duration: "5 min",
    thumbnail: TALE_THUMBNAILS[0],
  },
  {
    id: 2,
    title: "Conte traditionnel II",
    description: "Valeurs communautaires et respect des anciens.",
    videoSource: TALE_VIDEOS[1],
    videoUrl: null,
    duration: "7 min",
    thumbnail: TALE_THUMBNAILS[1],
  },
  {
    id: 3,
    title: "Conte traditionnel III",
    description: "Intelligence, patience et vivre ensemble.",
    videoSource: TALE_VIDEOS[2],
    videoUrl: null,
    duration: "6 min",
    thumbnail: TALE_THUMBNAILS[2],
  },
  {
    id: 4,
    title: "Conte traditionnel IV",
    description: "Patrimoine oral mandingue.",
    videoSource: TALE_VIDEOS[3],
    videoUrl: null,
    duration: "8 min",
    thumbnail: TALE_THUMBNAILS[3],
  },
  {
    id: 5,
    title: "Conte traditionnel V",
    description: "Fierté identitaire et cohésion sociale.",
    videoSource: TALE_VIDEOS[4],
    videoUrl: null,
    duration: "6 min",
    thumbnail: TALE_THUMBNAILS[4],
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
  const index = (dayOfYear + 3) % expressions.length;
  return expressions[index];
}
