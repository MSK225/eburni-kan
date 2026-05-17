import { StyleSheet, Text, type TextProps } from 'react-native';

import {
  EburniKanColors,
  EburniKanTypography,
} from '@/constants/theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'malinke' | 'nav';
};

/**
 * @deprecated Préférer les composants `@/components/design-system`
 * (Title, NavText, MalinkeText, BodyText).
 */
export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: EburniKanColors.text },
        type === 'default' && styles.default,
        type === 'defaultSemiBold' && styles.defaultSemiBold,
        type === 'title' && styles.title,
        type === 'subtitle' && styles.subtitle,
        type === 'nav' && styles.nav,
        type === 'malinke' && styles.malinke,
        type === 'link' && styles.link,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: EburniKanTypography.body,
  defaultSemiBold: {
    ...EburniKanTypography.body,
    fontWeight: '600',
  },
  title: {
    ...EburniKanTypography.title,
    color: EburniKanColors.primary,
  },
  subtitle: EburniKanTypography.nav,
  nav: EburniKanTypography.nav,
  malinke: {
    ...EburniKanTypography.malinke,
    color: EburniKanColors.primary,
  },
  link: {
    ...EburniKanTypography.body,
    color: EburniKanColors.primary,
    textDecorationLine: 'underline',
  },
});
