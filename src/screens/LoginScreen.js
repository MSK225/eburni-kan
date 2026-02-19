import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  function seConnecter() {
    navigation.replace("Main");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.emoji}>🌍</Text>
      <Text style={styles.titre}>EBURNI-KAN</Text>
      <Text style={styles.sousTitre}>Apprends ta langue ivoirienne</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={motDePasse}
        onChangeText={setMotDePasse}
        secureTextEntry
      />

      <TouchableOpacity style={styles.bouton} onPress={seConnecter}>
        <Text style={styles.boutonTexte}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.lienInscription}>
          Pas encore de compte ? S'inscrire
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  titre: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#E8A020",
    marginBottom: 8,
  },
  sousTitre: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  bouton: {
    width: "100%",
    backgroundColor: "#E8A020",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  boutonTexte: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  lienInscription: {
    color: "#E8A020",
    marginTop: 20,
    fontSize: 14,
  },
});
