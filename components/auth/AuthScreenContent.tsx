import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { EburniLogo } from "@/components/brand";
import {
  BodyText,
  EburniCard,
  MalinkeText,
  NavText,
  PrimaryButton,
} from "@/components/design-system";
import { PagneBackground } from "@/components/immersion";
import {
  EburniKanColors,
  EburniKanFonts,
  EburniKanRadii,
  EburniKanSpacing,
} from "@/constants/theme";
import { useAuth } from "@/src/context/AuthContext";

const NIVEAUX = [
  {
    id: "debutant",
    label: "🌱 Débutant",
    description: "Je commence depuis zéro",
  },
  {
    id: "intermediaire",
    label: "🌿 Intermédiaire",
    description: "Je connais quelques mots",
  },
  { id: "avance", label: "🌳 Avancé", description: "Je parle déjà un peu" },
];

const GENRES = [
  { id: "male", label: "Homme" },
  { id: "female", label: "Femme" },
  { id: "other", label: "Autre" },
];

export function AuthScreenContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [niveau, setNiveau] = useState("debutant");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

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
    if (isSignUp) {
      if (!prenom || !nom) {
        Alert.alert("Erreur", "Veuillez entrer votre prénom et nom.");
        return;
      }
      if (!age) {
        Alert.alert("Erreur", "Veuillez entrer votre âge.");
        return;
      }
      const ageNum = parseInt(age, 10);
      if (Number.isNaN(ageNum) || ageNum <= 0) {
        Alert.alert("Erreur", "Veuillez entrer un âge valide.");
        return;
      }
      if (!gender) {
        Alert.alert("Erreur", "Veuillez sélectionner votre genre.");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
        return;
      }
    }
    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        const ageNum = parseInt(age, 10);
        let tranche = "";
        if (ageNum < 13) tranche = "0-12";
        else if (ageNum < 18) tranche = "13-17";
        else if (ageNum < 35) tranche = "18-34";
        else if (ageNum < 65) tranche = "35-64";
        else tranche = "65+";
        Alert.alert(
          "Succès",
          `Bienvenue ${prenom} ! Ton compte a été créé. Tranche d'âge: ${tranche}, Genre: ${gender}`,
        );
      } else {
        await signIn(email, password);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Impossible de se connecter.";
      Alert.alert("Erreur", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PagneBackground>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.badge}>
              <NavText variant="primary" size="small" style={styles.badgeText}>
                Bienvenue
              </NavText>
            </View>
            <EburniLogo size="xl" style={styles.logo} />
            <MalinkeText size="md" style={styles.slogan}>
              Mandingue kan kalan duman
            </MalinkeText>
            <BodyText size="sm" muted style={styles.sloganFr}>
              L&apos;apprentissage agréable de la langue mandingue
            </BodyText>
          </View>

          {/* Formulaire */}
          <EburniCard style={styles.card}>
            <NavText style={styles.cardTitle}>
              {isSignUp ? "Créer un compte" : "Se connecter"}
            </NavText>

            {/* Prénom + Nom - uniquement inscription */}
            {isSignUp && (
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.inputMoitie]}
                  placeholder="Prénom"
                  placeholderTextColor={EburniKanColors.textMuted}
                  value={prenom}
                  onChangeText={setPrenom}
                  autoCapitalize="words"
                />
                <TextInput
                  style={[styles.input, styles.inputMoitie]}
                  placeholder="Nom"
                  placeholderTextColor={EburniKanColors.textMuted}
                  value={nom}
                  onChangeText={setNom}
                  autoCapitalize="words"
                />
              </View>
            )}

            {isSignUp && (
              <TextInput
                style={styles.input}
                placeholder="Âge"
                placeholderTextColor={EburniKanColors.textMuted}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}

            {isSignUp && (
              <View style={styles.genderContainer}>
                {GENRES.map((g) => (
                  <TouchableOpacity
                    key={g.id}
                    style={[
                      styles.genderOption,
                      gender === g.id && styles.genderOptionSelected,
                    ]}
                    onPress={() => setGender(g.id)}
                  >
                    <Text style={styles.genderText}>{g.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Email */}
            <TextInput
              style={styles.input}
              placeholder="Adresse email"
              placeholderTextColor={EburniKanColors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* Mot de passe */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputAvecIcone}
                placeholder="Mot de passe"
                placeholderTextColor={EburniKanColors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.iconeOeil}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.iconeOeilTexte}>
                  {showPassword ? "🙈" : "👁️"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Confirmation mot de passe - uniquement inscription */}
            {isSignUp && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputAvecIcone}
                  placeholder="Confirmer le mot de passe"
                  placeholderTextColor={EburniKanColors.textMuted}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.iconeOeil}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Text style={styles.iconeOeilTexte}>
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Niveau - uniquement inscription */}
            {isSignUp && (
              <View style={styles.niveauContainer}>
                <BodyText size="sm" style={styles.niveauLabel}>
                  Quel est ton niveau en Bambara ?
                </BodyText>
                {NIVEAUX.map((n) => (
                  <TouchableOpacity
                    key={n.id}
                    style={[
                      styles.niveauOption,
                      niveau === n.id && styles.niveauOptionSelected,
                    ]}
                    onPress={() => setNiveau(n.id)}
                  >
                    <View style={styles.niveauTextes}>
                      <Text
                        style={[
                          styles.niveauNom,
                          niveau === n.id && styles.niveauNomSelected,
                        ]}
                      >
                        {n.label}
                      </Text>
                      <Text
                        style={[
                          styles.niveauDesc,
                          niveau === n.id && styles.niveauDescSelected,
                        ]}
                      >
                        {n.description}
                      </Text>
                    </View>
                    {niveau === n.id && (
                      <View style={styles.niveauCheck}>
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                          ✓
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <PrimaryButton
              label={
                loading
                  ? "Chargement..."
                  : isSignUp
                    ? "Créer mon compte"
                    : "Se connecter"
              }
              loading={loading}
              onPress={handleSubmit}
              style={styles.submit}
            />

            <Pressable
              style={styles.switchButton}
              onPress={() => setIsSignUp(!isSignUp)}
              accessibilityRole="button"
            >
              <BodyText size="sm" style={styles.switchText}>
                {isSignUp
                  ? "Vous avez déjà un compte ? Se connecter"
                  : "Pas encore de compte ? S\u2019inscrire"}
              </BodyText>
            </Pressable>
          </EburniCard>

          <BodyText size="sm" muted style={styles.footer}>
            En vous connectant, vous acceptez nos conditions d'utilisation.
          </BodyText>
        </ScrollView>
      </KeyboardAvoidingView>
    </PagneBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: EburniKanSpacing.lg,
  },
  hero: {
    backgroundColor: EburniKanColors.primary,
    borderRadius: EburniKanRadii.lg,
    padding: EburniKanSpacing.lg,
    alignItems: "center",
    marginBottom: EburniKanSpacing.lg,
  },
  badge: {
    backgroundColor: EburniKanColors.accent,
    paddingHorizontal: EburniKanSpacing.md,
    paddingVertical: EburniKanSpacing.xs,
    borderRadius: EburniKanRadii.full,
    marginBottom: EburniKanSpacing.md,
  },
  logo: {
    marginBottom: EburniKanSpacing.sm,
  },
  badgeText: {
    color: EburniKanColors.onAccent,
  },
  slogan: {
    color: EburniKanColors.onPrimary,
    textAlign: "center",
    marginTop: EburniKanSpacing.sm,
  },
  sloganFr: {
    color: EburniKanColors.onPrimary,
    textAlign: "center",
    marginTop: EburniKanSpacing.xs,
    opacity: 0.9,
  },
  card: {
    marginBottom: EburniKanSpacing.md,
  },
  cardTitle: {
    marginBottom: EburniKanSpacing.md,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    fontFamily: EburniKanFonts.readable,
    fontSize: 16,
    lineHeight: 24,
    color: EburniKanColors.text,
    backgroundColor: EburniKanColors.background,
    borderRadius: EburniKanRadii.sm,
    paddingVertical: EburniKanSpacing.md,
    paddingHorizontal: EburniKanSpacing.md,
    marginBottom: EburniKanSpacing.md,
    borderWidth: 1,
    borderColor: EburniKanColors.border,
  },
  inputMoitie: {
    flex: 1,
    marginRight: EburniKanSpacing.md,
  },
  inputContainer: {
    position: "relative",
    marginBottom: EburniKanSpacing.md,
  },
  inputAvecIcone: {
    fontFamily: EburniKanFonts.readable,
    fontSize: 16,
    lineHeight: 24,
    color: EburniKanColors.text,
    backgroundColor: EburniKanColors.background,
    borderRadius: EburniKanRadii.sm,
    paddingVertical: EburniKanSpacing.md,
    paddingHorizontal: EburniKanSpacing.md,
    borderWidth: 1,
    borderColor: EburniKanColors.border,
  },
  iconeOeil: {
    position: "absolute",
    right: EburniKanSpacing.md,
    top: "50%",
    transform: [{ translateY: -10 }],
    padding: EburniKanSpacing.xs,
  },
  iconeOeilTexte: {
    fontSize: 18,
    color: EburniKanColors.textMuted,
  },
  niveauContainer: {
    marginBottom: EburniKanSpacing.md,
  },
  niveauLabel: {
    marginBottom: EburniKanSpacing.sm,
  },
  niveauOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: EburniKanSpacing.sm,
    borderRadius: EburniKanRadii.sm,
    backgroundColor: EburniKanColors.background,
    marginBottom: EburniKanSpacing.xs,
  },
  niveauOptionSelected: {
    backgroundColor: EburniKanColors.primary,
  },
  niveauTextes: {
    flex: 1,
  },
  niveauNom: {
    color: EburniKanColors.text,
    fontWeight: "bold",
  },
  niveauNomSelected: {
    color: EburniKanColors.onPrimary,
  },
  niveauDesc: {
    color: EburniKanColors.textMuted,
  },
  niveauDescSelected: {
    color: EburniKanColors.onPrimary,
  },
  niveauCheck: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: EburniKanColors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: EburniKanSpacing.md,
  },
  genderOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: EburniKanSpacing.sm,
    marginRight: EburniKanSpacing.sm,
    borderRadius: EburniKanRadii.sm,
    backgroundColor: EburniKanColors.background,
  },
  genderOptionSelected: {
    backgroundColor: EburniKanColors.primary,
  },
  genderText: {
    color: EburniKanColors.text,
  },
  submit: {
    marginTop: EburniKanSpacing.xs,
  },
  switchButton: {
    alignItems: "center",
    marginTop: EburniKanSpacing.md,
    paddingVertical: EburniKanSpacing.xs,
  },
  switchText: {
    color: EburniKanColors.primary,
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
  },
});
