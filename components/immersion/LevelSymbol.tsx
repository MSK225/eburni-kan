import { Image } from 'expo-image';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { BodyText, NavText } from '@/components/design-system';
import {
  getLevelForDifficulty,
  getLevelSymbol,
  LEVEL_LABELS,
  type DifficultyLabel,
} from '@/constants/levels';
import type { LevelKey } from '@/constants/media-assets';
import { EburniKanColors, EburniKanSpacing } from '@/constants/theme';

type LevelSymbolProps = {
  level?: LevelKey;
  difficulty?: DifficultyLabel;
  showLabel?: boolean;
  size?: number;
  style?: ViewStyle;
};

export function LevelSymbol({
  level,
  difficulty = 'Facile',
  showLabel = true,
  size = 56,
  style,
}: LevelSymbolProps) {
  const key = level ?? getLevelForDifficulty(difficulty);
  const source = getLevelSymbol(key);

  return (
    <View style={[styles.row, style]}>
      <View style={[styles.badge, { width: size, height: size, borderRadius: size / 2 }]}>
        <Image source={source} style={styles.icon} contentFit="cover" />
      </View>
      {showLabel ? (
        <View style={styles.textBlock}>
          <NavText size="small" variant="primary">
            {key === 'debutant' ? 'Graine' : key === 'intermediaire' ? 'Jeune baobab' : 'Baobab royal'}
          </NavText>
          <BodyText size="sm" muted>
            {LEVEL_LABELS[key]}
          </BodyText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: EburniKanSpacing.sm,
  },
  badge: {
    borderWidth: 2,
    borderColor: EburniKanColors.accent,
    overflow: 'hidden',
    backgroundColor: EburniKanColors.primary,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  textBlock: {
    flex: 1,
  },
});
