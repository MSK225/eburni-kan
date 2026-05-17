import { Image, type ImageStyle } from 'expo-image';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { LOGO } from '@/constants/media-assets';

export type EburniLogoSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZES: Record<EburniLogoSize, number> = {
  sm: 40,
  md: 72,
  lg: 120,
  xl: 160,
};

type EburniLogoProps = {
  size?: EburniLogoSize;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

/** Logo officiel EBURNI-KAN (assets/images/logo.svg) */
export function EburniLogo({ size = 'md', style, imageStyle }: EburniLogoProps) {
  const dimension = SIZES[size];

  return (
    <View style={[styles.wrap, style]} accessibilityRole="image" accessibilityLabel="EBURNI-KAN">
      <Image
        source={LOGO}
        style={[{ width: dimension, height: dimension }, imageStyle]}
        contentFit="contain"
        transition={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
