import { StyleSheet, Text, type TextProps } from 'react-native';

import {
  EburniKanColors,
  EburniKanTypography,
  type NavTextVariant,
} from '@/constants/theme';

export type NavTextProps = TextProps & {
  variant?: NavTextVariant;
  size?: 'default' | 'small';
};

const colorByVariant: Record<NavTextVariant, string> = {
  primary: EburniKanColors.primary,
  text: EburniKanColors.text,
};

export function NavText({
  variant = 'primary',
  size = 'default',
  style,
  ...rest
}: NavTextProps) {
  return (
    <Text
      style={[
        size === 'small' ? styles.small : styles.default,
        { color: colorByVariant[variant] },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: EburniKanTypography.nav,
  small: EburniKanTypography.navSmall,
});
