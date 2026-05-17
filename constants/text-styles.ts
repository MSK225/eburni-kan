/**
 * Styles texte réutilisables — toujours inclure fontFamily, sans fontWeight
 * (le gras synthétique casse les polices custom sur le web).
 */
import { StyleSheet } from 'react-native';

import {
  EburniKanColors,
  EburniKanTypography,
} from '@/constants/theme';

export const EburniTextStyles = StyleSheet.create({
  titleOnPrimary: {
    ...EburniKanTypography.title,
    color: EburniKanColors.accent,
  },
  titleOnLight: {
    ...EburniKanTypography.titleSmall,
    color: EburniKanColors.primary,
  },
  titleLargeAccent: {
    ...EburniKanTypography.titleLarge,
    color: EburniKanColors.accent,
  },
  navPrimary: {
    ...EburniKanTypography.nav,
    color: EburniKanColors.primary,
  },
  navAccent: {
    ...EburniKanTypography.navSmall,
    color: EburniKanColors.accent,
  },
  navOnPrimary: {
    ...EburniKanTypography.navSmall,
    color: EburniKanColors.onPrimary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  malinkeAccent: {
    ...EburniKanTypography.malinkeLarge,
    color: EburniKanColors.accent,
    textAlign: 'center',
  },
  malinkeOnPrimary: {
    ...EburniKanTypography.malinke,
    color: EburniKanColors.accent,
  },
  bodyOnPrimary: {
    ...EburniKanTypography.body,
    color: EburniKanColors.onPrimary,
  },
  bodySmallOnPrimary: {
    ...EburniKanTypography.bodySmall,
    color: EburniKanColors.onPrimary,
    opacity: 0.85,
  },
  body: {
    ...EburniKanTypography.body,
    color: EburniKanColors.text,
  },
  bodyMuted: {
    ...EburniKanTypography.bodySmall,
    color: EburniKanColors.textMuted,
  },
  bodyAccent: {
    ...EburniKanTypography.bodySmall,
    color: EburniKanColors.accent,
  },
  statNumber: {
    ...EburniKanTypography.titleSmall,
    color: EburniKanColors.primary,
    textTransform: 'none',
  },
});
