import type { ReactNode } from 'react';
import { ImageBackground, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { PAGNE_TEXTURE } from '@/constants/media-assets';
import { EburniKanColors } from '@/constants/theme';

type PagneBackgroundProps = {
  children: ReactNode;
  texture?: ImageSourcePropType;
  opacity?: number;
};

/** Fond blanc coton + motif pagne à faible opacité (charte ~10 %) */
export function PagneBackground({
  children,
  texture = PAGNE_TEXTURE,
  opacity = 0.1,
}: PagneBackgroundProps) {
  return (
    <View style={styles.root}>
      <ImageBackground
        source={texture}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity }}
        resizeMode="cover"
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: EburniKanColors.background,
  },
  content: {
    flex: 1,
  },
});
