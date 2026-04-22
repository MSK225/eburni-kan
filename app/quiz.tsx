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

  const questions = (lecon as any)?.jeu || (lecon as any)?.quiz || [];

  if (!lecon || questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.erreur}>Quiz non disponible pour cette leçon.</Text>
        <TouchableOpacity style={styles.bouton} onPress={() => router.back()}>
          <Text style={styles.boutonTexte}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const question = questions[currentIndex];

  const handleOption = async (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);

    const correct = option === question.answer;
    if (correct) {
      setScore(score + 1);
    }

    await recordEvent({
      type: "quiz_answer",
      lessonId: lecon?.id,
      questionId: currentIndex,
      correct,
      timestamp: Date.now(),
    });
  };

  const finishQuiz = async () => {
    const passRate = score / questions.length;
    const success = passRate >= 0.7;
    if (success && lecon) {
      markLessonCompleted(lecon.id);
    }

    await recordEvent({
      type: "lesson_completed",
      lessonId: lecon?.id,
      score,
      timestamp: Date.now(),
    });

    setReussi(success);
    setShowModal(true);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
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
    <ScrollView style={styles.container}>
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>{reussi ? "🏆" : "💪"}</Text>
            <Text style={styles.modalTitre}>
              {reussi ? "Félicitations !" : "Continue à t'entraîner !"}
            </Text>
            <Text style={styles.modalScore}>
              Score : {score} / {questions.length} ({pourcentage}%)
            </Text>
            <Text style={styles.modalMessage}>
              {reussi
                ? "Leçon validée ! Tu peux passer à la suivante."
                : "Il faut au moins 70 % pour valider la leçon. Essaie encore !"}
            </Text>

            <TouchableOpacity
              style={styles.modalBoutonPrimaire}
              onPress={restartQuiz}
            >
              <Text style={styles.boutonTexte}>🔄 Recommencer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalBoutonSecondaire}
              onPress={() => {
                setShowModal(false);
                router.push("/cours");
              }}
            >
              <Text style={styles.modalBoutonSecondaireTexte}>
                📚 Retour aux cours
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity style={styles.retour} onPress={() => router.back()}>
          <Text style={styles.retourTexte}>‹ Retour</Text>
        </TouchableOpacity>
        <Text style={styles.titre}>{`Quiz : ${lecon.titre}`}</Text>
        <Text style={styles.sousTitre}>
          Question {currentIndex + 1} / {questions.length}
        </Text>
      </View>

      <View style={styles.barreContainer}>
        <View
          style={[
            styles.barreProgression,
            {
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            },
          ]}
        />
      </View>

      <View style={styles.contenu}>
        <Text style={styles.question}>{question.question}</Text>

        {question.options.map((option: string) => {
          const isCorrect = option === question.answer;
          const isSelected = option === selected;
          const background = answered
            ? isCorrect
              ? "#2E7D32"
              : isSelected
                ? "#d32f2f"
                : "#fff"
            : "#fff";
          const textColor =
            answered && (isCorrect || isSelected) ? "#fff" : "#333";

          return (
            <TouchableOpacity
              key={option}
              style={[styles.option, { backgroundColor: background }]}
              onPress={() => handleOption(option)}
              disabled={answered}
            >
              <Text style={[styles.optionText, { color: textColor }]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}

        {answered && (
          <Text style={styles.feedback}>
            {selected === question.answer
              ? "Bonne réponse !"
              : `Mauvaise réponse. La bonne réponse est : ${question.answer}`}
          </Text>
        )}

        <Text style={styles.score}>
          Score : {score} / {questions.length}
        </Text>

        <TouchableOpacity
          style={[
            styles.boutonCommencer,
            { backgroundColor: answered ? "#1A237E" : "#888" },
          ]}
          onPress={answered ? (isLast ? finishQuiz : nextQuestion) : undefined}
          disabled={!answered}
        >
          <Text style={styles.boutonTexte}>
            {answered
              ? isLast
                ? "Terminer"
                : "Question suivante"
              : "Choisissez une réponse"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boutonRetour}
          onPress={() => router.push("/cours")}
        >
          <Text style={styles.boutonTexte}>Retour aux cours</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F7F2" },
  header: { backgroundColor: "#1A237E", padding: 20, paddingTop: 50 },
  retour: { marginBottom: 16 },
  retourTexte: { color: "#FBC02D", fontSize: 16, fontWeight: "600" },
  titre: { color: "#FBC02D", fontSize: 24, fontWeight: "bold" },
  sousTitre: { color: "#fff", fontSize: 14, marginTop: 8 },
  barreContainer: {
    height: 8,
    backgroundColor: "#ddd",
    margin: 16,
    borderRadius: 8,
  },
  barreProgression: { height: 8, backgroundColor: "#1A237E", borderRadius: 8 },
  contenu: { padding: 16 },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1A237E",
  },
  option: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1A237E",
    padding: 12,
    marginBottom: 10,
  },
  optionText: { fontSize: 16, color: "#333" },
  feedback: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A237E",
  },
  score: { marginTop: 10, fontSize: 14, color: "#555" },
  boutonCommencer: {
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  boutonRetour: {
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#FBC02D",
  },
  boutonTexte: { color: "#F9F7F2", fontWeight: "bold" },
  erreur: {
    marginTop: 40,
    fontSize: 18,
    textAlign: "center",
    color: "#d32f2f",
  },
  bouton: {
    marginTop: 16,
    alignItems: "center",
    backgroundColor: "#1A237E",
    padding: 12,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCard: {
    backgroundColor: "#F9F7F2",
    borderRadius: 16,
    padding: 20,
    width: "85%",
    alignItems: "center",
  },
  modalEmoji: { fontSize: 48 },
  modalTitre: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  modalScore: { fontSize: 16, color: "#1A237E", marginBottom: 10 },
  modalMessage: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 16,
  },
  modalBoutonPrimaire: {
    backgroundColor: "#1A237E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  modalBoutonSecondaire: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  modalBoutonSecondaireTexte: { color: "#333", fontWeight: "600" },
});
