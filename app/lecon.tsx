import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  BodyText,
  MalinkeText,
  PrimaryButton,
} from "@/components/design-system";
import { EburniSection, ScreenHeader } from "@/components/layout";
import { VideoPlayer } from "@/components/ui/video-player";
import { LayoutStyles } from "@/constants/layout-styles";
import { LESSON_INTRO_VIDEOS } from "@/constants/media-assets";
import { EburniKanColors, EburniKanSpacing } from "@/constants/theme";
import { useProgress } from "../src/context/ProgressContext";
import { lecons } from "../src/data/lecons";

export default function LeconScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { recordEvent } = useProgress();

  const lecon = lecons.find((l) => l.id === Number(id));

  useEffect(() => {
    if (!lecon) return;
    recordEvent({
      type: "lesson_view",
      lessonId: lecon.id,
      timestamp: Date.now(),
    });
  }, [lecon, recordEvent]);

  const startQuiz = async () => {
    if (!lecon) return;
    await recordEvent({
      type: "lesson_view",
      lessonId: lecon.id,
      timestamp: Date.now(),
    });
    router.push(`/quiz?id=${lecon.id}`);
  };

  if (!lecon) {
    return (
      <View style={[LayoutStyles.screen, styles.centered]}>
        <BodyText style={styles.error}>Leçon non trouvée</BodyText>
        <PrimaryButton
          label="Retour"
          variant="primary"
          onPress={() => router.back()}
          style={styles.errorBtn}
        />
      </View>
    );
  }

  return (
    <ScrollView style={LayoutStyles.screen}>
      <ScreenHeader
        title={lecon.titre}
        subtitle={lecon.niveau}
        showBack
        onBack={() => router.back()}
      />

      <View style={LayoutStyles.content}>
        {/* Vidéo intro — rotation par leçon */}
        {lecon.id <= 5 && (
          <View style={styles.videoContainer}>
            <VideoPlayer
              source={LESSON_INTRO_VIDEOS[lecon.id - 1]}
              title="Vidéo d'introduction"
            />
            <BodyText size="sm" style={styles.videoCaption}>
              Introduction vidéo à cette leçon
            </BodyText>
          </View>
        )}

        {lecon.description ? (
          <EburniSection title="📝 À propos">
            <BodyText>{lecon.description}</BodyText>
          </EburniSection>
        ) : null}

        {lecon.objectifs ? (
          <EburniSection title="🎯 Objectifs">
            {lecon.objectifs.map((obj, index) => (
              <View key={index} style={styles.objectifRow}>
                <Text style={styles.bullet}>•</Text>
                <BodyText style={styles.objectifText}>{obj}</BodyText>
              </View>
            ))}
          </EburniSection>
        ) : null}

        {lecon.introduction ? (
          <EburniSection title="💡 Introduction">
            <BodyText>{lecon.introduction}</BodyText>
          </EburniSection>
        ) : null}

        <EburniSection title="📚 Vocabulaire">
          {lecon.contenu.map((item, index) => (
            <View key={index} style={LayoutStyles.vocabCard}>
              <MalinkeText>{item.malinke}</MalinkeText>
              <BodyText size="sm" style={styles.prononciation}>
                {item.prononciation}
              </BodyText>
              <BodyText>{item.francais}</BodyText>
              {"note" in item && item.note ? (
                <BodyText size="sm" style={styles.note}>
                  💬 {item.note}
                </BodyText>
              ) : null}
              {item.exemple ? (
                <BodyText size="sm" style={styles.exemple}>
                  Exemple : {item.exemple}
                </BodyText>
              ) : null}
              {"reponse" in item && item.reponse ? (
                <BodyText size="sm" style={styles.reponse}>
                  Réponse : {item.reponse}
                </BodyText>
              ) : null}
            </View>
          ))}
        </EburniSection>

        <EburniSection title="⏱ Durée estimée">
          <BodyText>{lecon.duree}</BodyText>
        </EburniSection>

        {lecon.conseils ? (
          <EburniSection title="💪 Conseils d'apprentissage">
            <BodyText>{lecon.conseils}</BodyText>
          </EburniSection>
        ) : null}

        <PrimaryButton label="Démarrer le quiz" onPress={startQuiz} />
        <PrimaryButton
          label="Quitter"
          variant="outline"
          onPress={() => router.back()}
          style={styles.quitBtn}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
    padding: EburniKanSpacing.lg,
  },
  error: {
    color: EburniKanColors.error,
    textAlign: "center",
  },
  errorBtn: {
    marginTop: EburniKanSpacing.md,
  },
  videoContainer: {
    marginBottom: EburniKanSpacing.lg,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: EburniKanColors.accent,
  },
  introVideo: {
    width: "100%",
    height: 200,
  },
  videoCaption: {
    padding: EburniKanSpacing.sm,
    backgroundColor: EburniKanColors.primary,
    color: EburniKanColors.onPrimary,
    textAlign: "center",
  },
  objectifRow: {
    flexDirection: "row",
    marginBottom: EburniKanSpacing.sm,
    alignItems: "flex-start",
  },
  bullet: {
    color: EburniKanColors.accent,
    fontSize: 18,
    marginRight: EburniKanSpacing.sm,
  },
  objectifText: {
    flex: 1,
  },
  prononciation: {
    color: EburniKanColors.accent,
    fontStyle: "italic",
    marginVertical: EburniKanSpacing.xs,
  },
  note: {
    color: "#D88E0B",
    marginTop: EburniKanSpacing.xs,
    fontStyle: "italic",
  },
  exemple: {
    color: EburniKanColors.primary,
    marginTop: EburniKanSpacing.xs,
  },
  reponse: {
    color: EburniKanColors.success,
    marginTop: EburniKanSpacing.xs,
  },
  quitBtn: {
    marginTop: EburniKanSpacing.sm,
    marginBottom: EburniKanSpacing.xl,
  },
});
