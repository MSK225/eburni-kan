import { StyleSheet, View, type ViewProps } from 'react-native';

import { BodyText } from '@/components/design-system/BodyText';
import { Title } from '@/components/design-system/Title';
import { EburniKanColors, EburniKanSpacing } from '@/constants/theme';

export type ScreenBannerProps = ViewProps & {
  title: string;
  subtitle?: string;
};

/** Bandeau indigo avec titre Ga Maamli en blanc coton */
export function ScreenBanner({ title, subtitle, style, ...rest }: ScreenBannerProps) {
  return (
    <View style={[styles.banner, style]} {...rest}>
      <Title variant="onPrimary" size="small">
        {title}
      </Title>
      {subtitle ? (
        <BodyText style={styles.subtitle}>{subtitle}</BodyText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: EburniKanColors.primary,
    paddingHorizontal: EburniKanSpacing.lg,
    paddingTop: EburniKanSpacing.xxl,
    paddingBottom: EburniKanSpacing.lg,
  },
  subtitle: {
    marginTop: EburniKanSpacing.xs,
    color: EburniKanColors.onPrimary,
    opacity: 0.9,
  },
});
