import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  function seConnecter() {
    router.replace("/(tabs)");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Logo et titre */}
      <View style={styles.headerContainer}>
        <Text style={styles.titre}>EBURNI-KAN</Text>
        <Text style={styles.slogan}>Mandingue kan kalan duman</Text>
      </View>

      {/* Formulaire */}
      <View style={styles.formulaire}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#888"
          value={motDePasse}
          onChangeText={setMotDePasse}
          secureTextEntry
        />

        <TouchableOpacity style={styles.bouton} onPress={seConnecter}>
          <Text style={styles.boutonTexte}>SE CONNECTER</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boutonInscription}>
          <Text style={styles.boutonInscriptionTexte}>
            Pas encore de compte ?{" "}
            <Text style={styles.lienInscription}>S'inscrire</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A237E",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  titre: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FBC02D",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  slogan: {
    fontSize: 14,
    color: "#F9F7F2",
    marginTop: 8,
    fontStyle: "italic",
    textAlign: "center",
  },
  formulaire: {
    width: "100%",
  },
  input: {
    width: "100%",
    backgroundColor: "#F9F7F2",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#212121",
  },
  bouton: {
    width: "100%",
    backgroundColor: "#FBC02D",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    elevation: 4,
  },
  boutonTexte: {
    color: "#1A237E",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
  boutonInscription: {
    alignItems: "center",
    marginTop: 24,
  },
  boutonInscriptionTexte: { color: "#F9F7F2", fontSize: 14 },
  lienInscription: {
    color: "#FBC02D",
    fontWeight: "bold",
  },
});
