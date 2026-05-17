import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { NavText } from '@/components/design-system/NavText';
import { EburniKanColors, EburniKanRadii, EburniKanSpacing } from '@/constants/theme';

export type PrimaryButtonVariant = 'accent' | 'primary' | 'outline';

export type PrimaryButtonProps = PressableProps & {
  label: string;
  variant?: PrimaryButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  label,
  variant = 'accent',
  loading = false,
  fullWidth = true,
  disabled,
  style,
  ...rest
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      style={({ pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        variantStyles[variant],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      disabled={isDisabled}
      {...rest}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'accent' ? EburniKanColors.onAccent : EburniKanColors.accent}
        />
      ) : (
        <NavText
          variant={variant === 'accent' ? 'primary' : 'text'}
          style={[
            styles.label,
            variant === 'primary' && styles.labelOnPrimary,
            variant === 'outline' && styles.labelOutline,
          ]}>
          {label}
        </NavText>
      )}
    </Pressable>
  );
}

const variantStyles = StyleSheet.create({
  accent: {
    backgroundColor: EburniKanColors.accent,
  },
  primary: {
    backgroundColor: EburniKanColors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: EburniKanColors.primary,
  },
});

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingHorizontal: EburniKanSpacing.lg,
    paddingVertical: EburniKanSpacing.md,
    borderRadius: EburniKanRadii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  pressed: {
    opacity: 0.88,
  },
  disabled: {
    backgroundColor: EburniKanColors.disabled,
    borderColor: EburniKanColors.disabled,
  },
  label: {
    color: EburniKanColors.onAccent,
    textAlign: 'center',
  },
  labelOnPrimary: {
    color: EburniKanColors.accent,
  },
  labelOutline: {
    color: EburniKanColors.primary,
  },
});
