import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

import {
  BodyText,
  NavText,
  PrimaryButton,
} from "@/components/design-system";
import { PagneBackground } from "@/components/immersion";
import { ScreenHeader } from "@/components/layout";
import { EburniTextStyles } from "@/constants/text-styles";
import { LayoutStyles } from "@/constants/layout-styles";
import {
  EburniKanColors,
  EburniKanRadii,
  EburniKanSpacing,
} from "@/constants/theme";
import { LESSON_IMAGES } from "@/constants/media-assets";
import { useProgress } from "../src/context/ProgressContext";
import { lecons } from "../src/data/lecons";

export default function CoursScreen() {
  const router = useRouter();
  const {
    progress,
    difficulty,
    markLessonCompleted,
    recordEvent,
    syncProgress,
  } = useProgress();
  const completedLessons = progress.completedLessons;

  const accessibleLessonId = Math.min(
    completedLessons.length + 1,
    lecons.length,
  );

  const markCompleted = async (id: number) => {
    await recordEvent({
      type: "lesson_completed",
      lessonId: id,
      timestamp: Date.now(),
    });
    markLessonCompleted(id);
  };

  return (
    <PagneBackground>
      <ScrollView style={LayoutStyles.screen}>
        <ScreenHeader title="📚 Cours" subtitle="Bambara — Niveau A1" />

        <View style={LayoutStyles.infoBox}>
          <NavText variant="primary" style={styles.infoTitle}>
            Niveau d&apos;apprentissage : {difficulty}
          </NavText>
          <BodyText size="sm" style={styles.infoLine}>
            Leçons terminées : {completedLessons.length} / {lecons.length}
          </BodyText>
          <BodyText size="sm" style={styles.infoLine}>
            Leçon suivante accessible : {accessibleLessonId}
          </BodyText>
          <BodyText size="sm" style={styles.infoLine}>
            Statut sync : {progress.synced ? "Synchronisé" : "Non synchronisé"}
          </BodyText>
          <BodyText size="sm" style={styles.infoLine}>
            Mode : {progress.offline ? "Hors ligne" : "En ligne"}
          </BodyText>
          <PrimaryButton
            label="Synchroniser manuellement"
            variant="primary"
            fullWidth={false}
            onPress={() => syncProgress()}
            style={styles.syncBtn}
          />
        </View>

        <View style={styles.list}>
          {lecons.map((lecon) => {
            const isCompleted = completedLessons.includes(lecon.id);
            const isLocked = lecon.id > accessibleLessonId;

            // Attribution dynamique des images par module
            const lessonImageKey = lecon.titre.toLowerCase().includes("alphabet")
              ? "alphabet"
              : lecon.titre.toLowerCase().includes("vocabul")
                ? "vocabulary"
                : lecon.titre.toLowerCase().includes("gramm")
                  ? "grammar"
                  : lecon.titre.toLowerCase().includes("prononc")
                    ? "pronunciation"
                    : "culture";

            const lessonImage = LESSON_IMAGES[lessonImageKey as keyof typeof LESSON_IMAGES];

            return (
              <View key={lecon.id} style={styles.lessonBlock}>
                <TouchableOpacity
                  style={[
                    LayoutStyles.lessonCard,
                    isLocked && LayoutStyles.lessonCardLocked,
                    isCompleted && LayoutStyles.lessonCardDone,
                  ]}
                  onPress={async () => {
                    if (isLocked) return;
                    await recordEvent({
                      type: "lesson_view",
                      lessonId: lecon.id,
                      timestamp: Date.now(),
                    });
                    router.push(`/lecon?id=${lecon.id}`);
                  }}
                  disabled={isLocked}
                >
                  {lessonImage && (
                    <Image
                      source={lessonImage}
                      style={styles.lessonImage}
                    />
                  )}
                  <View style={LayoutStyles.numberBadge}>
                    <Text style={EburniTextStyles.navAccent}>{lecon.id}</Text>
                  </View>
                  <View style={styles.lessonMeta}>
                    <NavText>{lecon.titre}</NavText>
                    <BodyText size="sm" muted>
                      {lecon.niveau}
                    </BodyText>
                    <BodyText size="sm" style={styles.duration}>
                      ⏱ {lecon.duree}
                    </BodyText>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>

                <View style={styles.actions}>
                  <PrimaryButton
                    label="Quiz"
                    variant="primary"
                    fullWidth={false}
                    disabled={isLocked}
                    onPress={async () => {
                      if (isLocked) return;
                      await recordEvent({
                        type: "lesson_view",
                        lessonId: lecon.id,
                        timestamp: Date.now(),
                      });
                      router.push(`/quiz?id=${lecon.id}`);
                    }}
                    style={styles.actionBtn}
                  />
                  <PrimaryButton
                    label="Voir la leçon"
                    variant="outline"
                    fullWidth={false}
                    disabled={isLocked}
                    onPress={async () => {
                      if (isLocked) return;
                      await recordEvent({
                        type: "lesson_view",
                        lessonId: lecon.id,
                        timestamp: Date.now(),
                      });
                      router.push(`/lecon?id=${lecon.id}`);
                    }}
                    style={styles.actionBtn}
                  />
                  {!isCompleted && !isLocked ? (
                    <PrimaryButton
                      label="Marquer terminé"
                      variant="accent"
                      fullWidth={false}
                      onPress={() => markCompleted(lecon.id)}
                      style={styles.actionBtn}
                    />
                  ) : (
                    <View style={styles.statusPill}>
                      <BodyText size="sm" style={styles.statusText}>
                        {isCompleted ? "✓ Terminé" : "🔒 Bloqué"}
                      </BodyText>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </PagneBackground>
  );
}

const styles = StyleSheet.create({
  infoTitle: {
    marginBottom: EburniKanSpacing.xs,
  },
  infoLine: {
    color: EburniKanColors.primary,
    marginTop: EburniKanSpacing.xs,
  },
  syncBtn: {
    marginTop: EburniKanSpacing.sm,
    alignSelf: "flex-start",
  },
  list: {
    padding: EburniKanSpacing.md,
    paddingTop: 0,
  },
  lessonBlock: {
    marginBottom: EburniKanSpacing.sm,
  },
  lessonMeta: {
    flex: 1,
    marginLeft: EburniKanSpacing.md,
  },
  lessonImage: {
    width: 120,
    height: 100,
    borderRadius: EburniKanRadii.sm,
    marginRight: EburniKanSpacing.md,
    backgroundColor: EburniKanColors.secondary,
    opacity: 0.85,
  },
  duration: {
    color: EburniKanColors.success,
    marginTop: EburniKanSpacing.xs,
  },
  chevron: {
    fontSize: 28,
    color: EburniKanColors.accent,
    marginLeft: EburniKanSpacing.sm,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: EburniKanSpacing.sm,
    marginTop: EburniKanSpacing.sm,
  },
  actionBtn: {
    alignSelf: "flex-start",
  },
  statusPill: {
    justifyContent: "center",
    paddingHorizontal: EburniKanSpacing.sm,
    paddingVertical: EburniKanSpacing.sm,
    borderRadius: EburniKanRadii.sm,
    backgroundColor: EburniKanColors.border,
    marginTop: EburniKanSpacing.sm,
  },
  statusText: {
    color: EburniKanColors.text,
  },
});
