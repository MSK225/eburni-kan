import {
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { FontProvider } from "@/components/design-system";
import { EburniKanColors } from "@/constants/theme";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { ProgressProvider } from "../src/context/ProgressContext";

const EburniTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: EburniKanColors.primary,
    background: EburniKanColors.background,
    text: EburniKanColors.text,
    card: EburniKanColors.background,
    border: EburniKanColors.border,
    notification: EburniKanColors.success,
  },
};

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutNav() {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "auth" || segments[0] === "login";

    if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!isAuthenticated && !inAuthGroup) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, segments, router]);

  if (loading) {
    return null;
  }

  return (
    <ThemeProvider value={EburniTheme}>
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="lecon" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <FontProvider>
      <AuthProvider>
        <ProgressProvider>
          <RootLayoutNav />
          <StatusBar style="light" />
        </ProgressProvider>
      </AuthProvider>
    </FontProvider>
  );
}
