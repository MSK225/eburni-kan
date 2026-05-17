import { Image, type ImageSource } from 'expo-image';
import { StyleSheet, View, type ImageStyle, type StyleProp, type ViewStyle } from 'react-native';

import { EburniKanColors } from '@/constants/theme';

type DuotoneImageProps = {
  source: ImageSource;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  contentFit?: 'cover' | 'contain' | 'fill';
};

/** Photo réelle avec filtre duotone indigo / blanc coton (charte) */
export function DuotoneImage({
  source,
  style,
  imageStyle,
  contentFit = 'cover',
}: DuotoneImageProps) {
  return (
    <View style={[styles.wrap, style]}>
      <Image source={source} style={[styles.image, imageStyle]} contentFit={contentFit} />
      <View style={styles.indigoOverlay} />
      <View style={styles.lightOverlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    backgroundColor: EburniKanColors.primary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  indigoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: EburniKanColors.primary,
    opacity: 0.55,
  },
  lightOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: EburniKanColors.onPrimary,
    opacity: 0.22,
  },
});
