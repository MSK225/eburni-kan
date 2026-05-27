import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { EburniLogo } from '@/components/brand';
import {
  BodyText,
  EburniCard,
  MalinkeText,
  NavText,
  PrimaryButton,
} from '@/components/design-system';
import { PagneBackground } from '@/components/immersion';
import {
  EburniKanColors,
  EburniKanFonts,
  EburniKanRadii,
  EburniKanSpacing,
} from '@/constants/theme';
import { useAuth } from '@/src/context/AuthContext';

export function AuthScreenContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        Alert.alert('Succès', 'Compte créé avec succès !');
      } else {
        await signIn(email, password);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Impossible de se connecter.';
      Alert.alert('Erreur', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PagneBackground>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
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

          <EburniCard style={styles.card}>
            <NavText style={styles.cardTitle}>
              {isSignUp ? 'Créer un compte' : 'Se connecter'}
            </NavText>

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

            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor={EburniKanColors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <PrimaryButton
              label={
                loading
                  ? 'Chargement...'
                  : isSignUp
                    ? 'Créer mon compte'
                    : 'Se connecter'
              }
              loading={loading}
              onPress={handleSubmit}
              style={styles.submit}
            />

            <Pressable
              style={styles.switchButton}
              onPress={() => setIsSignUp(!isSignUp)}
              accessibilityRole="button">
              <BodyText size="sm" style={styles.switchText}>
                {isSignUp
                  ? 'Vous avez déjà un compte ? Se connecter'
                  : 'Pas encore de compte ? S\u2019inscrire'}
              </BodyText>
            </Pressable>
          </EburniCard>

          <BodyText size="sm" muted style={styles.footer}>
            En vous connectant, vous acceptez nos conditions d&apos;utilisation.
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
    justifyContent: 'center',
    padding: EburniKanSpacing.lg,
  },
  hero: {
    backgroundColor: EburniKanColors.primary,
    borderRadius: EburniKanRadii.lg,
    padding: EburniKanSpacing.lg,
    alignItems: 'center',
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
    textAlign: 'center',
    marginTop: EburniKanSpacing.sm,
  },
  sloganFr: {
    color: EburniKanColors.onPrimary,
    textAlign: 'center',
    marginTop: EburniKanSpacing.xs,
    opacity: 0.9,
  },
  card: {
    marginBottom: EburniKanSpacing.md,
  },
  cardTitle: {
    marginBottom: EburniKanSpacing.md,
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
  submit: {
    marginTop: EburniKanSpacing.xs,
  },
  switchButton: {
    alignItems: 'center',
    marginTop: EburniKanSpacing.md,
    paddingVertical: EburniKanSpacing.xs,
  },
  switchText: {
    color: EburniKanColors.primary,
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
  },
});
