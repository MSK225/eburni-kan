import { StyleSheet, View, type ViewProps } from 'react-native';

import { EburniKanColors, EburniKanRadii, EburniKanSpacing } from '@/constants/theme';

export type EburniCardProps = ViewProps;

/** Carte fond blanc coton (charte) */
export function EburniCard({ style, children, ...rest }: EburniCardProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: EburniKanColors.background,
    borderRadius: EburniKanRadii.md,
    padding: EburniKanSpacing.md,
    borderWidth: 1,
    borderColor: EburniKanColors.border,
  },
});
