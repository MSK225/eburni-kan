import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, useWindowDimensions } from "react-native";

import { BodyText, NavText, PrimaryButton } from "@/components/design-system";
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
import { useProgress } from "../../src/context/ProgressContext";
import { lecons } from "../../src/data/lecons";

export default function CoursTab() {
  const router = useRouter();
  const { progress, markLessonCompleted, recordEvent } = useProgress();
  const { width } = useWindowDimensions();
  const completedLessons = progress.completedLessons;

  // Responsive layout: 1 col mobile, 2 cols tablet+
  const isTablet = width >= 768;
  const numColumns = isTablet ? 2 : 1;
  const columnWidth = isTablet ? (width - EburniKanSpacing.md * 3) / 2 : "100%";

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

        <View style={[styles.list, { flexDirection: isTablet ? "row" : "column", flexWrap: "wrap" }]}>
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
              <View
                key={lecon.id}
                style={[
                  styles.lessonBlock,
                  isTablet && { width: columnWidth }
                ]}
              >
                <TouchableOpacity
                  style={[
                    LayoutStyles.lessonCard,
                    isLocked && LayoutStyles.lessonCardLocked,
                    isCompleted && LayoutStyles.lessonCardDone,
                    isTablet && styles.lessonCardTablet,
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
                      style={[
                        styles.lessonImage,
                        isTablet && styles.lessonImageTablet,
                      ]}
                    />
                  )}
                  <View style={LayoutStyles.numberBadge}>
                    <Text style={EburniTextStyles.navAccent}>{lecon.id}</Text>
                  </View>
                  <View style={[styles.lessonMeta, isTablet && styles.lessonMetaTablet]}>
                    <NavText>{lecon.titre}</NavText>
                    <BodyText size="sm" muted>
                      {lecon.niveau}
                    </BodyText>
                    <BodyText size="sm" style={styles.duration}>
                      ⏱ {lecon.duree}
                    </BodyText>
                  </View>
                  {!isTablet && <Text style={styles.chevron}>›</Text>}
                </TouchableOpacity>

                <View style={[styles.actions, isTablet && styles.actionsTablet]}>
                  <PrimaryButton
                    label="Quiz"
                    variant="primary"
                    fullWidth={isTablet}
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
                    style={isTablet ? {} : styles.actionBtn}
                  />
                  <PrimaryButton
                    label="Voir la leçon"
                    variant="outline"
                    fullWidth={isTablet}
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
                    style={isTablet ? {} : styles.actionBtn}
                  />
                  {!isCompleted && !isLocked ? (
                    <PrimaryButton
                      label="Marquer terminé"
                      variant="accent"
                      fullWidth={isTablet}
                      onPress={() => markCompleted(lecon.id)}
                      style={isTablet ? {} : styles.actionBtn}
                    />
                  ) : (
                    <View style={[styles.statusPill, isTablet && styles.statusPillTablet]}>
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
  list: {
    gap: EburniKanSpacing.md,
    paddingHorizontal: EburniKanSpacing.md,
    paddingVertical: EburniKanSpacing.lg,
    justifyContent: "flex-start",
  },
  lessonBlock: {
    gap: EburniKanSpacing.sm,
  },
  lessonImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: EburniKanRadii.md,
    borderTopRightRadius: EburniKanRadii.md,
  },
  lessonImageTablet: {
    height: 150,
  },
  lessonCardTablet: {
    flexDirection: "column",
  },
  lessonMeta: {
    flex: 1,
    paddingLeft: EburniKanSpacing.md,
    paddingRight: EburniKanSpacing.sm,
    justifyContent: "space-between",
  },
  lessonMetaTablet: {
    paddingRight: EburniKanSpacing.md,
  },
  duration: {
    marginTop: EburniKanSpacing.xs,
  },
  chevron: {
    fontSize: 24,
    color: EburniKanColors.primary,
    marginRight: EburniKanSpacing.md,
  },
  actions: {
    flexDirection: "row",
    gap: EburniKanSpacing.sm,
    paddingHorizontal: EburniKanSpacing.sm,
  },
  actionsTablet: {
    flexDirection: "column",
    paddingHorizontal: EburniKanSpacing.md,
  },
  actionBtn: {
    flex: 1,
  },
  statusPill: {
    flex: 1,
    backgroundColor: EburniKanColors.secondary,
    borderRadius: EburniKanRadii.md,
    paddingVertical: EburniKanSpacing.sm,
    paddingHorizontal: EburniKanSpacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  statusPillTablet: {
    flex: undefined,
  },
  statusText: {
    color: EburniKanColors.primary,
    fontWeight: "600",
  },
});
