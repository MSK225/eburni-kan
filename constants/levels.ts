import { LEVEL_SYMBOLS, type LevelKey } from '@/constants/media-assets';

export type DifficultyLabel = 'Facile' | 'Moyen' | 'Difficile';

export const DIFFICULTY_TO_LEVEL: Record<DifficultyLabel, LevelKey> = {
  Facile: 'debutant',
  Moyen: 'intermediaire',
  Difficile: 'expert',
};

export const LEVEL_LABELS: Record<LevelKey, string> = {
  debutant: 'Débutant — Graine (Déni)',
  intermediaire: 'Intermédiaire — Jeune baobab',
  expert: 'Expert — Baobab royal',
};

export function getLevelForDifficulty(difficulty: DifficultyLabel): LevelKey {
  return DIFFICULTY_TO_LEVEL[difficulty] ?? 'debutant';
}

export function getLevelSymbol(level: LevelKey) {
  return LEVEL_SYMBOLS[level];
}
