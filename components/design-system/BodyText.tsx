import { StyleSheet, Text, type TextProps } from 'react-native';

import { EburniKanColors, EburniKanTypography } from '@/constants/theme';

export type BodyTextProps = TextProps & {
  size?: 'md' | 'sm';
  muted?: boolean;
};

/** Traductions, instructions, réglages — Questrial 14–16px */
export function BodyText({
  size = 'md',
  muted = false,
  style,
  ...rest
}: BodyTextProps) {
  return (
    <Text
      style={[
        size === 'sm' ? styles.sm : styles.md,
        { color: muted ? EburniKanColors.textMuted : EburniKanColors.text },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  md: EburniKanTypography.body,
  sm: EburniKanTypography.bodySmall,
});
