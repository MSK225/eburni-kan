import { Pressable, StyleSheet, View, type ViewProps } from 'react-native';

import { EburniLogo } from '@/components/brand';
import { BodyText, NavText, Title } from '@/components/design-system';
import { EburniKanColors, EburniKanSpacing } from '@/constants/theme';

export type ScreenHeaderProps = ViewProps & {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  showLogo?: boolean;
};

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  showBack = Boolean(onBack),
  showLogo = false,
  style,
  ...rest
}: ScreenHeaderProps) {
  return (
    <View style={[styles.header, style]} {...rest}>
      {showLogo ? <EburniLogo size="sm" style={styles.logo} /> : null}
      {showBack && onBack ? (
        <Pressable onPress={onBack} style={styles.back} accessibilityRole="button">
          <NavText style={styles.backText}>‹ Retour</NavText>
        </Pressable>
      ) : null}
      <Title variant="logo" size="small" style={styles.title}>
        {title}
      </Title>
      {subtitle ? (
        <BodyText size="sm" style={styles.subtitle}>
          {subtitle}
        </BodyText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: EburniKanColors.primary,
    paddingHorizontal: EburniKanSpacing.lg,
    paddingTop: 50,
    paddingBottom: EburniKanSpacing.lg,
  },
  logo: {
    marginBottom: EburniKanSpacing.sm,
    alignSelf: 'flex-start',
  },
  back: {
    marginBottom: EburniKanSpacing.md,
  },
  backText: {
    color: EburniKanColors.accent,
  },
  title: {
    textTransform: 'none',
  },
  subtitle: {
    color: EburniKanColors.onPrimary,
    marginTop: EburniKanSpacing.xs,
  },
});
