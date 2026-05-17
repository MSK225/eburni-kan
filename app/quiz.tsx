import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  BodyText,
  NavText,
  PrimaryButton,
} from "@/components/design-system";
import { ScreenHeader } from "@/components/layout";
import { LayoutStyles } from "@/constants/layout-styles";
import { EburniKanColors, EburniKanRadii, EburniKanSpacing } from "@/constants/theme";
import { useProgress } from "../src/context/ProgressContext";
import { lecons } from "../src/data/lecons";

export default function QuizScreen() {
  const router = useRouter();
  const { markLessonCompleted, recordEvent } = useProgress();
  const { id } = useLocalSearchParams();
  const lecon = lecons.find((l) => l.id === Number(id));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [reussi, setReussi] = useState(false);

  const questions = (lecon as { jeu?: unknown[]; quiz?: unknown[] })?.jeu
    ?? (lecon as { quiz?: unknown[] })?.quiz
    ?? [];

  if (!lecon || questions.length === 0) {
    return (
      <View style={[LayoutStyles.screen, styles.centered]}>
        <BodyText style={styles.error}>Quiz non disponible pour cette leçon.</BodyText>
        <PrimaryButton
          label="Retour"
          variant="primary"
          onPress={() => router.back()}
          style={styles.errorBtn}
        />
      </View>
    );
  }

  const question = questions[currentIndex] as {
    question: string;
    answer: string;
    options: string[];
  };

  const handleOption = async (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);

    const correct = option === question.answer;
    if (correct) {
      setScore((s) => s + 1);
    }

    await recordEvent({
      type: "quiz_answer",
      lessonId: lecon.id,
      questionId: currentIndex,
      correct,
      timestamp: Date.now(),
    });
  };

  const finishQuiz = async () => {
    const passRate = score / questions.length;
    const success = passRate >= 0.7;
    if (success) {
      markLessonCompleted(lecon.id);
    }

    await recordEvent({
      type: "lesson_completed",
      lessonId: lecon.id,
      score,
      timestamp: Date.now(),
    });

    setReussi(success);
    setShowModal(true);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelected(null);
    setShowModal(false);
    setReussi(false);
  };

  const pourcentage = Math.round((score / questions.length) * 100);
  const isLast = currentIndex + 1 === questions.length;

  return (
    <ScrollView style={LayoutStyles.screen}>
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>{reussi ? "🏆" : "💪"}</Text>
            <NavText style={styles.modalTitle}>
              {reussi ? "Félicitations !" : "Continue à t'entraîner !"}
            </NavText>
            <BodyText style={styles.modalScore}>
              Score : {score} / {questions.length} ({pourcentage}%)
            </BodyText>
            <BodyText muted style={styles.modalMessage}>
              {reussi
                ? "Leçon validée ! Tu peux passer à la suivante."
                : "Il faut au moins 70 % pour valider la leçon. Essaie encore !"}
            </BodyText>
            <PrimaryButton label="🔄 Recommencer" onPress={restartQuiz} />
            <PrimaryButton
              label="📚 Retour aux cours"
              variant="outline"
              onPress={() => {
                setShowModal(false);
                router.push("/cours");
              }}
              style={styles.modalSecondary}
            />
          </View>
        </View>
      </Modal>

      <ScreenHeader
        title={`Quiz : ${lecon.titre}`}
        subtitle={`Question ${currentIndex + 1} / ${questions.length}`}
        showBack
        onBack={() => router.back()}
      />

      <View style={LayoutStyles.progressTrack}>
        <View
          style={[
            LayoutStyles.progressFill,
            { width: `${((currentIndex + 1) / questions.length) * 100}%` },
          ]}
        />
      </View>

      <View style={LayoutStyles.content}>
        <NavText style={styles.question}>{question.question}</NavText>

        {question.options.map((option: string) => {
          const isCorrect = option === question.answer;
          const isSelected = option === selected;
          const background = answered
            ? isCorrect
              ? EburniKanColors.success
              : isSelected
                ? EburniKanColors.error
                : "#FFFFFF"
            : "#FFFFFF";
          const textColor =
            answered && (isCorrect || isSelected)
              ? EburniKanColors.onPrimary
              : EburniKanColors.text;

          return (
            <TouchableOpacity
              key={option}
              style={[styles.option, { backgroundColor: background }]}
              onPress={() => handleOption(option)}
              disabled={answered}
            >
              <BodyText style={{ color: textColor }}>{option}</BodyText>
            </TouchableOpacity>
          );
        })}

        {answered ? (
          <BodyText style={styles.feedback}>
            {selected === question.answer
              ? "Bonne réponse !"
              : `Mauvaise réponse. La bonne réponse est : ${question.answer}`}
          </BodyText>
        ) : null}

        <BodyText muted style={styles.scoreLine}>
          Score : {score} / {questions.length}
        </BodyText>

        <PrimaryButton
          label={
            answered
              ? isLast
                ? "Terminer"
                : "Question suivante"
              : "Choisissez une réponse"
          }
          variant={answered ? "primary" : "accent"}
          disabled={!answered}
          onPress={answered ? (isLast ? finishQuiz : nextQuestion) : undefined}
          style={!answered ? styles.btnDisabled : undefined}
        />

        <PrimaryButton
          label="Retour aux cours"
          variant="outline"
          onPress={() => router.push("/cours")}
          style={styles.backCourses}
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
  question: {
    marginBottom: EburniKanSpacing.md,
  },
  option: {
    borderRadius: EburniKanRadii.sm,
    borderWidth: 1,
    borderColor: EburniKanColors.primary,
    padding: EburniKanSpacing.sm,
    marginBottom: EburniKanSpacing.sm,
  },
  feedback: {
    marginTop: EburniKanSpacing.sm,
    color: EburniKanColors.primary,
  },
  scoreLine: {
    marginTop: EburniKanSpacing.sm,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  backCourses: {
    marginTop: EburniKanSpacing.sm,
    marginBottom: EburniKanSpacing.xl,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCard: {
    backgroundColor: EburniKanColors.background,
    borderRadius: EburniKanRadii.lg,
    padding: EburniKanSpacing.lg,
    width: "85%",
    alignItems: "center",
  },
  modalEmoji: {
    fontSize: 48,
  },
  modalTitle: {
    marginVertical: EburniKanSpacing.sm,
    textAlign: "center",
  },
  modalScore: {
    color: EburniKanColors.primary,
    marginBottom: EburniKanSpacing.sm,
  },
  modalMessage: {
    textAlign: "center",
    marginBottom: EburniKanSpacing.md,
  },
  modalSecondary: {
    marginTop: EburniKanSpacing.sm,
  },
});
