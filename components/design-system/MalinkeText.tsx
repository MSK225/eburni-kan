import { StyleSheet, Text, type TextProps } from 'react-native';

import { EburniKanColors, EburniKanTypography } from '@/constants/theme';

export type MalinkeTextProps = TextProps & {
  size?: 'md' | 'lg';
};

/** Texte malinké/dioula — police Ojuju, min. 20px (charte) */
export function MalinkeText({ size = 'md', style, ...rest }: MalinkeTextProps) {
  return (
    <Text
      style={[
        size === 'lg' ? styles.lg : styles.md,
        { color: EburniKanColors.primary },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  md: EburniKanTypography.malinke,
  lg: EburniKanTypography.malinkeLarge,
});
