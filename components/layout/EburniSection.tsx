import { StyleSheet, View, type ViewProps } from 'react-native';

import { NavText } from '@/components/design-system';
import { EburniKanColors, EburniKanRadii, EburniKanSpacing } from '@/constants/theme';

export type EburniSectionProps = ViewProps & {
  title: string;
};

export function EburniSection({ title, style, children, ...rest }: EburniSectionProps) {
  return (
    <View style={[styles.section, style]} {...rest}>
      <NavText variant="primary" style={styles.title}>
        {title}
      </NavText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: EburniKanRadii.md,
    padding: EburniKanSpacing.md,
    marginBottom: EburniKanSpacing.md,
    borderLeftWidth: 4,
    borderLeftColor: EburniKanColors.accent,
  },
  title: {
    marginBottom: EburniKanSpacing.sm,
  },
});
