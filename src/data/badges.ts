export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  criteria: (progress: any, difficulty?: string) => boolean;
};

export const badges: Badge[] = [
  {
    id: "first_steps",
    name: "Premiers pas",
    description: "Complétez votre première leçon",
    icon: "star.fill",
    color: "#FFD700",
    criteria: (progress) => progress.completedLessons.length >= 1,
  },
  {
    id: "explorer",
    name: "Explorateur",
    description: "Complétez 3 leçons",
    icon: "map.fill",
    color: "#4CAF50",
    criteria: (progress) => progress.completedLessons.length >= 3,
  },
  {
    id: "dedicated",
    name: "Dévoué",
    description: "Complétez 5 leçons",
    icon: "flame.fill",
    color: "#FF5722",
    criteria: (progress) => progress.completedLessons.length >= 5,
  },
  {
    id: "sharp_mind",
    name: "Esprit vif",
    description: "Obtenez 80% de précision aux quiz",
    icon: "brain",
    color: "#9C27B0",
    criteria: (progress) => {
      const accuracy =
        progress.quizTotal > 0
          ? (progress.quizCorrect / progress.quizTotal) * 100
          : 0;
      return accuracy >= 80;
    },
  },
  {
    id: "quiz_master",
    name: "Maître des quiz",
    description: "Obtenez 90% de précision aux quiz",
    icon: "trophy",
    color: "#FFC107",
    criteria: (progress) => {
      const accuracy =
        progress.quizTotal > 0
          ? (progress.quizCorrect / progress.quizTotal) * 100
          : 0;
      return accuracy >= 90;
    },
  },
  {
    id: "beginner",
    name: "Débutant",
    description: "Atteignez le niveau Moyen",
    icon: "circle.fill",
    color: "#2196F3",
    criteria: (progress: any, difficulty?: string) =>
      difficulty === "Moyen" || difficulty === "Difficile",
  },
  {
    id: "intermediate",
    name: "Intermédiaire",
    description: "Atteignez le niveau Difficile",
    icon: "diamond.fill",
    color: "#E91E63",
    criteria: (progress: any, difficulty?: string) =>
      difficulty === "Difficile",
  },
  {
    id: "consistent",
    name: "Constant",
    description: "Répondez à 10 questions de quiz",
    icon: "calendar",
    color: "#00BCD4",
    criteria: (progress) => progress.quizTotal >= 10,
  },
  {
    id: "scholar",
    name: "Érudit",
    description: "Complétez toutes les leçons disponibles",
    icon: "graduationcap",
    color: "#795548",
    criteria: (progress) => progress.completedLessons.length >= 7, // Assuming 7 lessons total
  },
];

export function getEarnedBadges(progress: any, difficulty: string): Badge[] {
  return badges.filter((badge) => badge.criteria(progress, difficulty));
}

export function getNextBadge(progress: any, difficulty: string): Badge | null {
  const earnedIds = getEarnedBadges(progress, difficulty).map((b) => b.id);
  const unearnedBadges = badges.filter(
    (badge) => !earnedIds.includes(badge.id),
  );

  // Return the first unearned badge as "next"
  return unearnedBadges.length > 0 ? unearnedBadges[0] : null;
}
