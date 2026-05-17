import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { type ReactNode, useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { EburniLogo } from '@/components/brand';
import { EburniKanColors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

type FontProviderProps = {
  children: ReactNode;
};

export function FontProvider({ children }: FontProviderProps) {
  const [fontsLoaded, fontError] = useFonts({
    GaMaamli: require('@/assets/fonts/GaMaamli.ttf'),
    SankofaDisplay: require('@/assets/fonts/SankofaDisplay.ttf'),
    Ojuju: require('@/assets/fonts/Ojuju.ttf'),
    Questrial: require('@/assets/fonts/Questrial.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <EburniLogo size="lg" />
      </View>
    );
  }

  if (fontError) {
    console.warn('[EBURNI-KAN] Polices charte non chargées:', fontError.message);
  }

  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    document.documentElement.classList.add('eburni-fonts-ready');
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: EburniKanColors.primary,
  },
});
