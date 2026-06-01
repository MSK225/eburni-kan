import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { EburniLogo } from "@/components/brand";
import {
  BodyText,
  MalinkeText,
  NavText,
  Title,
} from "@/components/design-system";
import {
  DuotoneImage,
  LevelSymbol,
  PagneBackground,
} from "@/components/immersion";
import { DUOTONE_IMAGES } from "@/constants/media-assets";
import { EburniTextStyles } from "@/constants/text-styles";
import {
  EburniKanColors,
  EburniKanRadii,
  EburniKanSpacing,
} from "@/constants/theme";
import { useProgress } from "../../src/context/ProgressContext";
import { lecons } from "../../src/data/lecons";

function AnimatedModuleCard({
  emoji,
  nom,
  desc,
  delay,
  onPress,
}: {
  emoji: string;
  nom: string;
  desc: string;
  delay: number;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(400).springify()}
      style={animStyle}
    >
      <TouchableOpacity
        style={styles.moduleCard}
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.94, { damping: 12, mass: 0.6 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 12, mass: 0.6 });
        }}
        activeOpacity={1}
      >
        <Text style={styles.moduleEmoji}>{emoji}</Text>
        <NavText
          style={styles.moduleNom}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {nom}
        </NavText>
        <BodyText
          size="sm"
          muted
          style={styles.moduleDesc}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {desc}
        </BodyText>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { progress, difficulty } = useProgress();

  const completedLessons = progress.completedLessons.length;
  const quizAccuracy = useMemo(() => {
    if (progress.quizTotal === 0) return 0;
    return Math.round((progress.quizCorrect / progress.quizTotal) * 100);
  }, [progress.quizCorrect, progress.quizTotal]);

  // Pulse animation sur le mot du jour
  const wordPulse = useSharedValue(1);
  useEffect(() => {
    wordPulse.value = withRepeat(
      withSequence(
        withTiming(1.03, { duration: 1800 }),
        withTiming(1, { duration: 1800 }),
      ),
      -1,
      true,
    );
  }, [wordPulse]);
  const wordPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: wordPulse.value }],
  }));

  const getWordOfDay = () => {
    const allWords = lecons.flatMap((lecon) =>
      lecon.contenu.map((item) => ({
        malinke: item.malinke,
        francais: item.francais,
        prononciation: item.prononciation,
        lecon: lecon.titre,
      })),
    );

    const priorityWords = allWords.filter((word) =>
      [
        "I ni ce",
        "I ni wula",
        "Aw ni ce",
        "Tananamaw?",
        "Toro te",
        "Aw ni baara",
      ].includes(word.malinke),
    );

    const wordPool = priorityWords.length > 0 ? priorityWords : allWords;
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor(
      (Number(today) - Number(startOfYear)) / (1000 * 60 * 60 * 24),
    );
    const index = dayOfYear % wordPool.length;

    return wordPool[index];
  };

  const [motDuJour] = useState(getWordOfDay);

  return (
    <PagneBackground>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View>
            <MalinkeText size="lg" style={styles.salutation}>
              I ni ce 👋
            </MalinkeText>
            <BodyText style={styles.sousTitre}>
              Découvre ton chemin en bambara
            </BodyText>
          </View>
          <EburniLogo size="sm" style={styles.headerLogo} />
        </View>

        <Animated.View
          style={[styles.carteMotDuJour, wordPulseStyle]}
          entering={FadeInUp.duration(500)}
        >
          <NavText style={styles.carteLabel}>✨ Mot du jour</NavText>
          <MalinkeText size="lg" style={styles.motDuJour}>
            {motDuJour.malinke}
          </MalinkeText>
          <BodyText style={styles.traduction}>
            {motDuJour.francais} — Bambara
          </BodyText>
          <BodyText size="sm" style={styles.prononciation}>
            🔊 {motDuJour.prononciation}
          </BodyText>
          <BodyText size="sm" style={styles.leconSource}>
            De la leçon : {motDuJour.lecon}
          </BodyText>
        </Animated.View>

        <View style={styles.carteProgression}>
          <NavText variant="text" style={styles.progressionTitre}>
            🔥 Ta progression
          </NavText>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={EburniTextStyles.statNumber}>
                {completedLessons}
              </Text>
              <BodyText size="sm" muted style={styles.statLabel}>
                Leçons finies
              </BodyText>
            </View>
            <View style={styles.statItem}>
              <Text style={EburniTextStyles.statNumber}>
                {progress.quizTotal}
              </Text>
              <BodyText size="sm" muted style={styles.statLabel}>
                Questions répond.
              </BodyText>
            </View>
            <View style={styles.statItem}>
              <Text style={EburniTextStyles.statNumber}>{quizAccuracy}%</Text>
              <BodyText size="sm" muted style={styles.statLabel}>
                Précision quiz
              </BodyText>
            </View>
          </View>
          <LevelSymbol difficulty={difficulty} style={styles.levelRow} />
          <BodyText size="sm" muted style={styles.progressionSummary}>
            Niveau recommandé : {difficulty}
          </BodyText>
        </View>

        <Title variant="primary" size="small" style={styles.sectionTitre}>
          Modules
        </Title>

        <View style={styles.grilleModules}>
          <AnimatedModuleCard
            emoji="📚"
            nom="Cours"
            desc="Leçons par niveaux"
            delay={0}
            onPress={() => router.push("/cours")}
          />
          <AnimatedModuleCard
            emoji="🎮"
            nom="Jeux"
            desc="Memory & Quiz"
            delay={80}
            onPress={() => router.push("/jeux")}
          />
          <AnimatedModuleCard
            emoji="🌍"
            nom="Culture"
            desc="Proverbes & Contes"
            delay={160}
            onPress={() => router.push("/culture")}
          />
          <AnimatedModuleCard
            emoji="🏆"
            nom="Profil"
            desc="Badges & Certificats"
            delay={240}
            onPress={() => router.push("/profil")}
          />
        </View>

        <View style={styles.proverbeWrap}>
          <DuotoneImage
            source={DUOTONE_IMAGES.savane}
            style={styles.proverbeDuotone}
          />
          <View style={styles.carteProverbe}>
            <NavText style={styles.proverbeLabel}>📜 Proverbe du jour</NavText>
            <MalinkeText style={styles.proverbeTexte}>
              &ldquo;Mogoya ka ca siya la&rdquo;
            </MalinkeText>
            <BodyText size="sm" style={styles.proverbeTraduction}>
              L&apos;humanité est plus grande que l&apos;ethnie — Bambara
            </BodyText>
          </View>
        </View>
      </ScrollView>
    </PagneBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    backgroundColor: EburniKanColors.primary,
    padding: EburniKanSpacing.lg,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(251, 192, 45, 0.3)",
    elevation: 4,
  },
  salutation: {
    color: EburniKanColors.accent,
  },
  sousTitre: {
    color: EburniKanColors.onPrimary,
    marginTop: EburniKanSpacing.xs,
  },
  headerLogo: {
    backgroundColor: EburniKanColors.accent,
    borderRadius: 24,
    padding: 4,
  },
  carteMotDuJour: {
    margin: EburniKanSpacing.md,
    padding: EburniKanSpacing.lg,
    backgroundColor: EburniKanColors.primary,
    borderRadius: EburniKanRadii.lg,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#FBC02D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(251, 192, 45, 0.3)",
  },
  carteLabel: {
    color: EburniKanColors.accent,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  motDuJour: {
    color: EburniKanColors.accent,
    marginTop: EburniKanSpacing.sm,
    textAlign: "center",
  },
  traduction: {
    color: EburniKanColors.onPrimary,
    marginTop: EburniKanSpacing.xs,
    textAlign: "center",
  },
  prononciation: {
    color: EburniKanColors.accent,
    marginTop: EburniKanSpacing.sm,
  },
  leconSource: {
    color: EburniKanColors.onPrimary,
    marginTop: EburniKanSpacing.xs,
    opacity: 0.85,
    fontStyle: "italic",
    textAlign: "center",
  },
  carteProgression: {
    margin: EburniKanSpacing.md,
    marginTop: 0,
    padding: EburniKanSpacing.lg,
    backgroundColor: "#fff",
    borderRadius: EburniKanRadii.lg,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(26, 35, 126, 0.1)",
  },
  progressionTitre: {
    marginBottom: EburniKanSpacing.md,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    marginTop: EburniKanSpacing.xs,
    textAlign: "center",
  },
  sectionTitre: {
    marginLeft: EburniKanSpacing.md,
    marginBottom: EburniKanSpacing.sm,
    textTransform: "none",
  },
  grilleModules: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: EburniKanSpacing.sm,
    justifyContent: "space-between",
    marginHorizontal: EburniKanSpacing.sm,
  },
  moduleCard: {
    backgroundColor: "#fff",
    borderRadius: EburniKanRadii.lg,
    padding: EburniKanSpacing.md,
    width: "47%",
    marginBottom: EburniKanSpacing.sm,
    elevation: 4,
    alignItems: "stretch",
    justifyContent: "center",
    borderBottomWidth: 4,
    borderBottomColor: EburniKanColors.accent,
    shadowColor: "#FBC02D",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    minHeight: 120,
  },
  moduleEmoji: {
    fontSize: 36,
    marginBottom: 4,
    textAlign: "center",
    alignSelf: "center",
  },
  moduleNom: {
    marginTop: EburniKanSpacing.xs,
    textAlign: "center",
    fontSize: 14,
    flexShrink: 1,
    width: "100%",
    flexWrap: "wrap",
  },
  moduleDesc: {
    marginTop: EburniKanSpacing.xs,
    textAlign: "center",
    fontSize: 11,
    flexShrink: 1,
    width: "100%",
    flexWrap: "wrap",
  },
  levelRow: {
    marginTop: EburniKanSpacing.md,
  },
  progressionSummary: {
    marginTop: EburniKanSpacing.sm,
  },
  proverbeWrap: {
    margin: EburniKanSpacing.md,
    marginBottom: EburniKanSpacing.xl,
    borderRadius: EburniKanRadii.lg,
    overflow: "hidden",
    minHeight: 140,
  },
  proverbeDuotone: {
    ...StyleSheet.absoluteFillObject,
  },
  carteProverbe: {
    padding: EburniKanSpacing.lg,
    backgroundColor: "rgba(26, 35, 126, 0.9)",
    minHeight: 140,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(251, 192, 45, 0.3)",
  },
  proverbeLabel: {
    color: EburniKanColors.accent,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: EburniKanSpacing.sm,
  },
  proverbeTexte: {
    color: EburniKanColors.onPrimary,
    textAlign: "center",
  },
  proverbeTraduction: {
    color: EburniKanColors.accent,
    marginTop: EburniKanSpacing.sm,
    textAlign: "center",
  },
});
