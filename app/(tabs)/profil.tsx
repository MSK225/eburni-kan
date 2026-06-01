import { IconSymbol } from "@/components/ui/icon-symbol";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { EburniLogo } from "@/components/brand";
import { BodyText, NavText, PrimaryButton } from "@/components/design-system";
import { LevelSymbol, PagneBackground } from "@/components/immersion";
import { EburniSection } from "@/components/layout";
import { PROFILE_HERITAGE } from "@/constants/media-assets";
import {
  EburniKanColors,
  EburniKanRadii,
  EburniKanSpacing,
} from "@/constants/theme";
import { useAuth } from "../../src/context/AuthContext";
import { useProgress } from "../../src/context/ProgressContext";
import { getEarnedBadges, getNextBadge } from "../../src/data/badges";

export default function ProfilScreen() {
  const { progress, difficulty } = useProgress();
  const { user, logout, deleteAccount } = useAuth();
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const accuracy = progress.quizTotal
    ? Math.round((progress.quizCorrect / progress.quizTotal) * 100)
    : 0;

  const earnedBadges = getEarnedBadges(progress, difficulty);
  const nextBadge = getNextBadge(progress, difficulty);

  const choisirPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission refusée",
        "Autorisez l'accès à vos photos pour changer votre photo de profil.",
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch {
            Alert.alert("Erreur", "Impossible de se déconnecter");
          }
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Supprimer le compte",
      "Cette action est irréversible. Tous vos progrès seront supprimés.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer définitivement",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccount();
              Alert.alert("Compte supprimé", "Votre compte a été supprimé.");
            } catch (error: unknown) {
              const message =
                error instanceof Error
                  ? error.message
                  : "Impossible de supprimer le compte";
              Alert.alert("Erreur", message);
            }
          },
        },
      ],
    );
  };

  return (
    <PagneBackground>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Header avec photo de profil */}
        <View style={styles.header}>
          <EburniLogo size="md" />
          <NavText style={styles.headerTitle}>Profil</NavText>

          {/* Photo de profil */}
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={choisirPhoto}
          >
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <BodyText size="sm" style={styles.photoPlaceholderTexte}>
                  📷
                </BodyText>
                <BodyText size="sm" style={styles.photoPlaceholderTexte}>
                  Ajouter une photo
                </BodyText>
              </View>
            )}
            <View style={styles.photoBadge}>
              <BodyText size="sm" style={{ color: "#fff" }}>
                ✏️
              </BodyText>
            </View>
          </TouchableOpacity>

          {user?.email ? (
            <BodyText size="sm" style={styles.email}>
              {user.email}
            </BodyText>
          ) : null}
        </View>

        {/* Informations personnelles */}
        <EburniSection title="👤 Mes informations">
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <BodyText style={styles.infoLabel}>📧 Email</BodyText>
              <BodyText style={styles.infoValeur}>
                {user?.email || "Non renseigné"}
              </BodyText>
            </View>
            <View style={styles.separateur} />
            <View style={styles.infoRow}>
              <BodyText style={styles.infoLabel}>🌍 Langue apprise</BodyText>
              <BodyText style={styles.infoValeur}>Bambara</BodyText>
            </View>
            <View style={styles.separateur} />
            <View style={styles.infoRow}>
              <BodyText style={styles.infoLabel}>🎯 Niveau</BodyText>
              <NavText variant="primary">{difficulty}</NavText>
            </View>
          </View>
        </EburniSection>

        {/* Parcours */}
        <EburniSection title="Ton parcours">
          <LevelSymbol difficulty={difficulty} />
          <View style={styles.row}>
            <BodyText>Leçons terminées</BodyText>
            <NavText variant="primary">
              {progress.completedLessons.length}
            </NavText>
          </View>
          <View style={styles.row}>
            <BodyText>Questions répondues</BodyText>
            <NavText variant="primary">{progress.quizTotal}</NavText>
          </View>
          <View style={styles.row}>
            <BodyText>Modules complétés</BodyText>
            <NavText variant="primary">
              {progress.completedModules.length}
            </NavText>
          </View>
          <View style={styles.row}>
            <BodyText>Précision quiz</BodyText>
            <NavText variant="primary">{accuracy}%</NavText>
          </View>
          <View style={styles.row}>
            <BodyText>Niveau actuel</BodyText>
            <NavText variant="primary">{difficulty}</NavText>
          </View>
        </EburniSection>

        {/* Badges obtenus */}
        <EburniSection title={`Badges obtenus (${earnedBadges.length})`}>
          {earnedBadges.length > 0 ? (
            <Animated.View
              style={styles.badgesWrap}
              entering={FadeInDown.duration(500)}
            >
              {earnedBadges.map((badge, idx) => (
                <Animated.View
                  key={badge.id}
                  entering={FadeInDown.delay(idx * 80).duration(400)}
                >
                  <View
                    style={[styles.badgeCard, { borderColor: badge.color }]}
                  >
                    <IconSymbol
                      name={badge.icon}
                      size={24}
                      color={badge.color}
                    />
                    <NavText size="small" style={{ color: badge.color }}>
                      {badge.name}
                    </NavText>
                    <BodyText size="sm" muted style={styles.badgeDesc}>
                      {badge.description}
                    </BodyText>
                  </View>
                </Animated.View>
              ))}
            </Animated.View>
          ) : (
            <BodyText size="sm" muted>
              Aucun badge pour le moment. Continue à apprendre !
            </BodyText>
          )}
        </EburniSection>

        {/* Prochain badge */}
        {nextBadge ? (
          <Animated.View entering={FadeInDown.delay(200).duration(400)}>
            <EburniSection title="Prochain badge">
              <View
                style={[
                  styles.badgeCard,
                  { borderColor: nextBadge.color, opacity: 0.85 },
                ]}
              >
                <IconSymbol
                  name={nextBadge.icon}
                  size={24}
                  color={nextBadge.color}
                />
                <NavText size="small" style={{ color: nextBadge.color }}>
                  {nextBadge.name}
                </NavText>
                <BodyText size="sm" muted>
                  {nextBadge.description}
                </BodyText>
              </View>
            </EburniSection>
          </Animated.View>
        ) : null}

        {/* Patrimoine */}
        <EburniSection title="🎭 Patrimoine de Tradition">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.heritageScroll}
          >
            {PROFILE_HERITAGE.map((image, index) => (
              <View key={index} style={styles.heritageCard}>
                <Image source={image} style={styles.heritageImage} />
              </View>
            ))}
          </ScrollView>
          <BodyText size="sm" style={styles.heritageDesc}>
            Découvrez l&apos;héritage culturel du nord de la Côte d&apos;Ivoire
            à travers des images et des histoires.
          </BodyText>
        </EburniSection>

        {/* Conseils */}
        <EburniSection title="Conseils">
          <BodyText>
            Continue une leçon à la fois, fais les quiz, et revisite les
            expressions les plus utiles chaque jour.
          </BodyText>
        </EburniSection>

        {/* Boutons */}
        <PrimaryButton
          label="Se déconnecter"
          variant="primary"
          onPress={handleLogout}
          style={styles.actionBtn}
        />
        <PrimaryButton
          label="Supprimer mon compte"
          variant="outline"
          onPress={handleDeleteAccount}
          style={styles.deleteBtn}
        />
      </ScrollView>
    </PagneBackground>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingBottom: EburniKanSpacing.xl },
  header: {
    backgroundColor: EburniKanColors.primary,
    paddingTop: 50,
    padding: EburniKanSpacing.lg,
    alignItems: "center",
  },
  headerTitle: {
    color: EburniKanColors.accent,
    marginTop: EburniKanSpacing.sm,
  },
  email: {
    color: EburniKanColors.onPrimary,
    marginTop: EburniKanSpacing.xs,
    opacity: 0.9,
  },
  photoContainer: {
    marginTop: EburniKanSpacing.md,
    marginBottom: EburniKanSpacing.sm,
    position: "relative",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: EburniKanColors.accent,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 3,
    borderColor: EburniKanColors.accent,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
  },
  photoPlaceholderTexte: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
  },
  photoBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: EburniKanColors.accent,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  infoCard: {
    backgroundColor: EburniKanColors.background,
    borderRadius: EburniKanRadii.md,
    padding: EburniKanSpacing.md,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: EburniKanSpacing.sm,
  },
  infoLabel: {
    color: EburniKanColors.textMuted,
    flex: 1,
  },
  infoValeur: {
    color: EburniKanColors.text,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  separateur: {
    height: 1,
    backgroundColor: EburniKanColors.border,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: EburniKanSpacing.sm,
  },
  badgesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: EburniKanSpacing.sm,
  },
  badgeCard: {
    backgroundColor: EburniKanColors.background,
    borderRadius: EburniKanRadii.md,
    padding: EburniKanSpacing.sm,
    alignItems: "center",
    minWidth: 100,
    borderWidth: 2,
    flex: 1,
    maxWidth: "48%",
  },
  badgeDesc: {
    textAlign: "center",
    marginTop: EburniKanSpacing.xs,
  },
  actionBtn: {
    marginHorizontal: EburniKanSpacing.md,
    marginTop: EburniKanSpacing.sm,
  },
  deleteBtn: {
    marginHorizontal: EburniKanSpacing.md,
    marginTop: EburniKanSpacing.sm,
    marginBottom: EburniKanSpacing.lg,
    borderColor: EburniKanColors.error,
  },
  heritageScroll: { marginBottom: EburniKanSpacing.sm },
  heritageCard: {
    marginRight: EburniKanSpacing.md,
    borderRadius: EburniKanRadii.md,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: EburniKanColors.accent,
  },
  heritageImage: {
    width: 140,
    height: 140,
    backgroundColor: EburniKanColors.secondary,
  },
  heritageDesc: {
    color: EburniKanColors.primary,
    marginTop: EburniKanSpacing.sm,
    fontStyle: "italic",
  },
});
