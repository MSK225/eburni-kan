import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

  const current = questions[currentIndex];
  const progress = `${currentIndex + 1} / ${questions.length}`;

  const resultText = useMemo(() => {
    if (!answered || selected === null) return "";
    return selected === current.answer
      ? "Bonne réponse !"
      : `Mauvaise réponse. La bonne réponse est : ${current.answer}`;
  }, [answered, selected, current.answer]);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === current.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>
        <Text style={styles.counter}>Question {progress}</Text>
        <Text style={styles.question}>{current.question}</Text>
        {current.options.map((option) => {
          const selectedOption = selected === option;
          const isCorrect = answered && option === current.answer;
          const isWrong =
            answered && selectedOption && option !== current.answer;
          return (
            <TouchableOpacity
              key={option}
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
          );
        })}
        {answered ? <Text style={styles.result}>{resultText}</Text> : null}
        <View style={styles.footerRow}>
          <Text style={styles.score}>Score : {score}</Text>
          <TouchableOpacity
            style={[styles.nextButton, !answered && styles.nextButtonDisabled]}
            onPress={nextQuestion}
            disabled={!answered || currentIndex + 1 >= questions.length}
          >
            <Text style={styles.nextButtonText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  counter: {
    fontSize: 12,
    color: "#555",
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
  footerRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  score: {
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
    opacity: 0.5,
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
