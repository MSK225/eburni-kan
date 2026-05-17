import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Question = {
  question: string;
  options: string[];
  answer: string;
  info?: string;
};

type MultipleChoiceModuleProps = {
  title: string;
  questions: Question[];
};

export function MultipleChoiceModule({
  title,
  questions,
}: MultipleChoiceModuleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const shakeAnim = useSharedValue(0);
  const correctScale = useSharedValue(1);
  const progressWidth = useSharedValue(0);

  const current = questions[currentIndex];
  const progressLabel = `${currentIndex + 1} / ${questions.length}`;

  // Barre de progression animée
  useEffect(() => {
    progressWidth.value = withTiming(
      ((currentIndex + 1) / questions.length) * 100,
      { duration: 400 },
    );
  }, [currentIndex, questions.length, progressWidth]);

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%` as any,
  }));

  const animatedShakeStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: shakeAnim.value },
      { scale: correctScale.value },
    ],
  }));

  const resultText = useMemo(() => {
    if (!answered || selected === null) return "";
    return selected === current.answer
      ? "✓ Bonne réponse !"
      : `✗ Mauvaise réponse. Correct : ${current.answer}`;
  }, [answered, selected, current.answer]);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);

    if (option !== current.answer) {
      // Shake pour mauvaise réponse
      const seq = [0, -9, 9, -9, 9, -5, 0];
      seq.forEach((val, i) => {
        setTimeout(() => {
          shakeAnim.value = withSpring(val, { damping: 10, mass: 0.8 });
        }, i * 45);
      });
    } else {
      // Bounce celebration pour bonne réponse
      correctScale.value = withSequence(
        withTiming(1.1, { duration: 110 }),
        withSpring(0.95, { damping: 6, mass: 0.5 }),
        withSpring(1, { damping: 8, mass: 0.6 }),
      );
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setAnswered(false);
      shakeAnim.value = 0;
      correctScale.value = 1;
    } else {
      // Dernière question → afficher résultat
      setIsFinished(true);
      progressWidth.value = withTiming(100, { duration: 300 });
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setIsFinished(false);
    shakeAnim.value = 0;
    correctScale.value = 1;
    progressWidth.value = withTiming((1 / questions.length) * 100, { duration: 400 });
  };

  // ── Écran résultat final ──────────────────────────────────────────
  if (isFinished) {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct === 100 ? "🏆" : pct >= 70 ? "🎉" : pct >= 40 ? "💪" : "📖";
    const message =
      pct === 100
        ? "Parfait ! Aucune erreur !"
        : pct >= 70
          ? "Très bien ! Continue comme ça !"
          : pct >= 40
            ? "Pas mal, encore un effort !"
            : "Continue à pratiquer !";

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {/* Barre 100% */}
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: "100%" }]} />
        </View>
        <Animated.View style={styles.resultCard} entering={ZoomIn.duration(400).springify()}>
          <Text style={styles.resultEmoji}>{emoji}</Text>
          <Text style={styles.resultTitle}>Quiz terminé !</Text>
          <Text style={styles.resultMessage}>{message}</Text>
          <View style={styles.resultScoreRow}>
            <Text style={styles.resultScore}>{score}</Text>
            <Text style={styles.resultScoreDivider}>/</Text>
            <Text style={styles.resultTotal}>{questions.length}</Text>
          </View>
          <Text style={styles.resultPercent}>{pct}%</Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>🔄 Recommencer</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  // ── Quiz en cours ─────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {/* Barre de progression */}
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, progressBarStyle]} />
      </View>

      <Animated.View
        style={[styles.card, animatedShakeStyle]}
        entering={FadeIn.duration(300)}
      >
        <Text style={styles.counter}>Question {progressLabel}</Text>
        <Text style={styles.question}>{current.question}</Text>

        {current.options.map((option, idx) => {
          const selectedOption = selected === option;
          const isCorrect = answered && option === current.answer;
          const isWrong = answered && selectedOption && option !== current.answer;
          return (
            <Animated.View
              key={option}
              entering={FadeIn.duration(200).delay(idx * 50)}
            >
              <TouchableOpacity
                style={[
                  styles.option,
                  selectedOption && styles.optionSelected,
                  isCorrect && styles.optionCorrect,
                  isWrong && styles.optionWrong,
                ]}
                onPress={() => handleSelect(option)}
                disabled={answered}
              >
                <Text
                  style={[
                    styles.optionText,
                    (selectedOption || isCorrect || isWrong) && { color: "#fff" },
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        {answered ? (
          <Animated.View entering={FadeIn.duration(300)}>
            <Text
              style={[
                styles.result,
                selected === current.answer ? styles.resultCorrect : styles.resultWrong,
              ]}
            >
              {resultText}
            </Text>
          </Animated.View>
        ) : null}

        <View style={styles.footerRow}>
          <Text style={styles.scoreLabel}>Score : {score}</Text>
          <TouchableOpacity
            style={[styles.nextButton, !answered && styles.nextButtonDisabled]}
            onPress={nextQuestion}
            disabled={!answered}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 >= questions.length ? "Terminer ✓" : "Suivant →"}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A237E",
    marginBottom: 10,
  },
  // ── Barre de progression
  progressTrack: {
    height: 6,
    backgroundColor: "#E8EAF6",
    borderRadius: 3,
    marginBottom: 14,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    backgroundColor: "#3F51B5",
    borderRadius: 3,
  },
  // ── Quiz
  card: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  counter: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 16,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1C4E9",
    marginBottom: 10,
  },
  optionSelected: {
    backgroundColor: "#3F51B5",
    borderColor: "#3F51B5",
  },
  optionCorrect: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },
  optionWrong: {
    backgroundColor: "#C62828",
    borderColor: "#C62828",
  },
  optionText: {
    color: "#212121",
    fontSize: 16,
  },
  result: {
    marginTop: 14,
    fontSize: 15,
    fontWeight: "600",
    color: "#424242",
  },
  resultCorrect: {
    color: "#2E7D32",
    fontSize: 16,
  },
  resultWrong: {
    color: "#C62828",
    fontSize: 16,
  },
  footerRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreLabel: {
    fontSize: 14,
    color: "#616161",
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: "#1A237E",
  },
  nextButtonDisabled: {
    opacity: 0.4,
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  // ── Écran résultat final
  resultCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8EAF6",
  },
  resultEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A237E",
    marginBottom: 6,
  },
  resultMessage: {
    fontSize: 14,
    color: "#616161",
    marginBottom: 20,
    textAlign: "center",
  },
  resultScoreRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginBottom: 4,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: "900",
    color: "#1A237E",
  },
  resultScoreDivider: {
    fontSize: 28,
    color: "#9E9E9E",
  },
  resultTotal: {
    fontSize: 28,
    fontWeight: "700",
    color: "#9E9E9E",
  },
  resultPercent: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3F51B5",
    marginBottom: 24,
  },
  restartButton: {
    backgroundColor: "#1A237E",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  restartButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
