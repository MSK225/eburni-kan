import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { ProgressProvider } from "../src/context/ProgressContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

// Composant pour gérer la navigation basée sur l'authentification
function RootLayoutNav() {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "auth";

    if (isAuthenticated && inAuthGroup) {
      // Utilisateur connecté, rediriger vers l'app principale
      router.replace("/(tabs)");
    } else if (!isAuthenticated && !inAuthGroup) {
      // Utilisateur non connecté, rediriger vers l'auth
      router.replace("/auth");
    }
  }, [isAuthenticated, loading, segments]);

  // Afficher un écran de chargement pendant la vérification d'auth
  if (loading) {
    return null; // Ou un écran de chargement personnalisé
  }

  return (
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
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <ProgressProvider>
          <RootLayoutNav />
          <StatusBar style="auto" />
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
