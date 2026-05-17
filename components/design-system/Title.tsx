import { StyleSheet, Text, type TextProps } from 'react-native';

import {
  EburniKanColors,
  EburniKanTypography,
  type TitleVariant,
} from '@/constants/theme';

export type TitleProps = TextProps & {
  variant?: TitleVariant;
  size?: 'large' | 'default' | 'small';
};

const colorByVariant: Record<TitleVariant, string> = {
  onPrimary: EburniKanColors.onPrimary,
  onLight: EburniKanColors.accent,
  primary: EburniKanColors.primary,
  logo: EburniKanColors.accent,
};

export function Title({
  variant = 'onLight',
  size = 'default',
  style,
  children,
  ...rest
}: TitleProps) {
  const sizeStyle =
    size === 'large'
      ? styles.large
      : size === 'small'
        ? styles.small
        : styles.default;

  return (
    <Text
      style={[sizeStyle, { color: colorByVariant[variant] }, style]}
      accessibilityRole="header"
      {...rest}>
      {typeof children === 'string' ? children.toUpperCase() : children}
    </Text>
  );
}

const styles = StyleSheet.create({
  large: EburniKanTypography.titleLarge,
  default: EburniKanTypography.title,
  small: EburniKanTypography.titleSmall,
});
