import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../src/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères.",
      );
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        Alert.alert("Succès", "Compte créé avec succès !");
      } else {
        await signIn(email, password);
      }
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Erreur", error.message || "Impossible de se connecter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.brandContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Bienvenue</Text>
        </View>
        <Text style={styles.title}>Eburni-kan</Text>
        <Text style={styles.subtitle}>Apprenez le bambara avec plaisir</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {isSignUp ? "Créer un compte" : "Se connecter"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Adresse email"
          placeholderTextColor="#94A3B8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#94A3B8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={[styles.actionButton, loading && styles.actionButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.actionButtonText}>
            {loading
              ? "Chargement..."
              : isSignUp
                ? "Créer mon compte"
                : "Se connecter"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsSignUp(!isSignUp)}
        >
          <Text style={styles.switchButtonText}>
            {isSignUp
              ? "Vous avez déjà un compte ? Se connecter"
              : "Pas encore de compte ? S'inscrire"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 24,
    justifyContent: "center",
  },
  brandContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  badge: {
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  badgeText: {
    color: "#047857",
    fontWeight: "700",
    fontSize: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "#475569",
    fontSize: 15,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 280,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 16,
    fontSize: 16,
    color: "#0F172A",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  actionButton: {
    backgroundColor: "#16A34A",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  actionButtonDisabled: {
    backgroundColor: "#86EFAC",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  switchButton: {
    alignItems: "center",
    marginTop: 18,
    paddingVertical: 6,
  },
  switchButtonText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },
});
