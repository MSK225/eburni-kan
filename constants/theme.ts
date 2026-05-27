/**
 * Charte graphique EBURNI-KAN — tokens design system
 */

import { Platform } from 'react-native';

/** Couleurs officielles */
export const EburniKanColors = {
  primary: '#1A237E',
  secondary: '#E8EAF6',
  accent: '#FBC02D',
  background: '#F9F7F2',
  text: '#212121',
  success: '#2E7D32',
  onPrimary: '#F9F7F2',
  onAccent: '#1A237E',
  textMuted: '#5C5C5C',
  border: '#E0DDD6',
  disabled: '#BDBDBD',
  error: '#C62828',
} as const;

/** Familles de polices (chargées via expo-font) */
export const EburniKanFonts = {
  title: 'GaMaamli',
  navigation: 'SankofaDisplay',
  focus: 'Ojuju',
  readable: 'Questrial',
} as const;

export const EburniKanSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const EburniKanRadii = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
} as const;

export const EburniKanTypography = {
  title: {
    fontFamily: EburniKanFonts.title,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  titleLarge: {
    fontFamily: EburniKanFonts.title,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  titleSmall: {
    fontFamily: EburniKanFonts.title,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  nav: {
    fontFamily: EburniKanFonts.navigation,
    fontSize: 18,
    lineHeight: 24,
  },
  navSmall: {
    fontFamily: EburniKanFonts.navigation,
    fontSize: 16,
    lineHeight: 22,
  },
  malinke: {
    fontFamily: EburniKanFonts.focus,
    fontSize: 20,
    lineHeight: 32,
  },
  malinkeLarge: {
    fontFamily: EburniKanFonts.focus,
    fontSize: 24,
    lineHeight: 36,
  },
  body: {
    fontFamily: EburniKanFonts.readable,
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: EburniKanFonts.readable,
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    fontFamily: EburniKanFonts.navigation,
    fontSize: 16,
    lineHeight: 20,
  },
} as const;

export type TitleVariant = 'onPrimary' | 'onLight' | 'primary' | 'logo';
export type NavTextVariant = 'primary' | 'text';
export type MalinkeSize = 'md' | 'lg';
export type BodySize = 'md' | 'sm';

/** @deprecated Utiliser EburniKanColors — conservé pour compatibilité Expo tabs */
const tintColorLight = EburniKanColors.primary;
const tintColorDark = EburniKanColors.accent;

export const Colors = {
  light: {
    text: EburniKanColors.text,
    background: EburniKanColors.background,
    tint: tintColorLight,
    icon: EburniKanColors.textMuted,
    tabIconDefault: EburniKanColors.textMuted,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: EburniKanColors.onPrimary,
    background: EburniKanColors.primary,
    tint: tintColorDark,
    icon: EburniKanColors.onPrimary,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
