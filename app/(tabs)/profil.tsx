import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import { Alert, ScrollView, StyleSheet, View, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { EburniLogo } from "@/components/brand";
import { BodyText, NavText, PrimaryButton } from "@/components/design-system";
import { EburniSection } from "@/components/layout";
import { LevelSymbol, PagneBackground } from "@/components/immersion";
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
  const accuracy = progress.quizTotal
    ? Math.round((progress.quizCorrect / progress.quizTotal) * 100)
    : 0;

  const earnedBadges = getEarnedBadges(progress, difficulty);
  const nextBadge = getNextBadge(progress, difficulty);

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
                error instanceof Error ? error.message : "Impossible de supprimer le compte";
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
        <View style={styles.header}>
          <EburniLogo size="md" />
          <NavText style={styles.headerTitle}>Profil</NavText>
          {user?.email ? (
            <BodyText size="sm" style={styles.email}>
              {user.email}
            </BodyText>
          ) : null}
        </View>

        <EburniSection title="Ton parcours">
          <LevelSymbol difficulty={difficulty} />
          <View style={styles.row}>
            <BodyText>Leçons terminées</BodyText>
            <NavText variant="primary">{progress.completedLessons.length}</NavText>
          </View>
          <View style={styles.row}>
            <BodyText>Questions répondues</BodyText>
            <NavText variant="primary">{progress.quizTotal}</NavText>
          </View>
          <View style={styles.row}>
            <BodyText>Modules complétés</BodyText>
            <NavText variant="primary">{progress.completedModules.length}</NavText>
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
                    <IconSymbol name={badge.icon} size={24} color={badge.color} />
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

        {nextBadge ? (
          <Animated.View entering={FadeInDown.delay(200).duration(400)}>
            <EburniSection title="Prochain badge">
              <View style={[styles.badgeCard, { borderColor: nextBadge.color, opacity: 0.85 }]}>
                <IconSymbol name={nextBadge.icon} size={24} color={nextBadge.color} />
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

        <EburniSection title="🎭 Patrimoine de Tradition">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.heritageScroll}>
            {PROFILE_HERITAGE.map((image, index) => (
              <View key={index} style={styles.heritageCard}>
                <Image
                  source={image}
                  style={styles.heritageImage}
                />
              </View>
            ))}
          </ScrollView>
          <BodyText size="sm" style={styles.heritageDesc}>
            Découvrez l&apos;héritage culturel du nord de la Côte d&apos;Ivoire à travers des images et des histoires.
          </BodyText>
        </EburniSection>

        <EburniSection title="Conseils">
          <BodyText>
            Continue une leçon à la fois, fais les quiz, et revisite les expressions
            les plus utiles chaque jour.
          </BodyText>
        </EburniSection>

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
  heritageScroll: {
    marginBottom: EburniKanSpacing.sm,
  },
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
