import { StyleSheet } from 'react-native';

import { EburniKanColors, EburniKanRadii, EburniKanSpacing } from '@/constants/theme';

export const LayoutStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    padding: EburniKanSpacing.md,
  },
  infoBox: {
    padding: EburniKanSpacing.md,
    backgroundColor: '#E8EAF6',
    margin: EburniKanSpacing.md,
    borderRadius: EburniKanRadii.md,
    borderLeftWidth: 4,
    borderLeftColor: EburniKanColors.success,
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: EburniKanRadii.lg,
    padding: EburniKanSpacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: EburniKanColors.accent,
  },
  lessonCardLocked: {
    opacity: 0.6,
    borderLeftColor: EburniKanColors.disabled,
  },
  lessonCardDone: {
    borderLeftColor: EburniKanColors.success,
  },
  numberBadge: {
    backgroundColor: EburniKanColors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vocabCard: {
    backgroundColor: EburniKanColors.background,
    borderRadius: EburniKanRadii.sm,
    padding: EburniKanSpacing.sm,
    marginBottom: EburniKanSpacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: EburniKanColors.primary,
  },
  progressTrack: {
    height: 8,
    backgroundColor: EburniKanColors.border,
    margin: EburniKanSpacing.md,
    borderRadius: EburniKanRadii.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    backgroundColor: EburniKanColors.primary,
    borderRadius: EburniKanRadii.sm,
  },
});
