import { StyleSheet, View, type ViewProps } from 'react-native';

import { EburniKanColors } from '@/constants/theme';

export type ThemedViewProps = ViewProps & {
  variant?: 'default' | 'primary';
};

export function ThemedView({
  style,
  variant = 'default',
  ...otherProps
}: ThemedViewProps) {
  return (
    <View
      style={[variant === 'primary' ? styles.primary : styles.default, style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: EburniKanColors.background,
  },
  primary: {
    backgroundColor: EburniKanColors.primary,
  },
});
