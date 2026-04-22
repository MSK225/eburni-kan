import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { lecons } from "../../src/data/lecons";

export default function JeuScreen() {
  const router = useRouter();
  const { id, difficulty } = useLocalSearchParams();
  const [gameState, setGameState] = useState("menu");
  const [score, setScore] = useState(0);

  const currentDifficulty = (difficulty as string) || "moyen";

  const getWordPairs = (diff: "facile" | "moyen" | "difficile") => {
    const lessonCount = diff === "facile" ? 2 : diff === "moyen" ? 3 : 5;
    const wordsPerLesson = diff === "facile" ? 2 : diff === "moyen" ? 3 : 4;
    return lecons.slice(0, lessonCount).flatMap((lecon) =>
      lecon.contenu.slice(0, wordsPerLesson).map((item) => ({
        malinke: item.malinke,
        francais: item.francais,
      })),
    );
  };

  const wordPairs = getWordPairs(
    currentDifficulty as "facile" | "moyen" | "difficile",
  );

  if (id === "memory") {
    return (
      <MemoryGame
        wordPairs={wordPairs}
        difficulty={currentDifficulty}
        onBack={() => router.back()}
      />
    );
  }

  if (id === "matching") {
    return (
      <MatchingGame
        wordPairs={wordPairs}
        difficulty={currentDifficulty}
        onBack={() => router.back()}
      />
    );
  }

  if (id === "speedrun") {
    return (
      <SpeedrunGame
        lecons={lecons}
        difficulty={currentDifficulty}
        onBack={() => router.back()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Jeu non trouvé</Text>
      <TouchableOpacity style={styles.bouton} onPress={() => router.back()}>
        <Text style={styles.boutonTexte}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

// MEMORY GAME
function MemoryGame({ wordPairs, difficulty, onBack }: any) {
  const getGameConfig = (diff: string) => {
    switch (diff) {
      case "facile":
        return { showTime: 2000, pairs: 4 };
      case "moyen":
        return { showTime: 1500, pairs: 6 };
      case "difficile":
        return { showTime: 1000, pairs: 8 };
      default:
        return { showTime: 1500, pairs: 6 };
    }
  };

  const config = getGameConfig(difficulty);
  const gamePairs = wordPairs.slice(0, config.pairs);

  const [pairs, setPairs] = useState(
    gamePairs
      .flatMap((p: any) => [
        {
          id: Math.random(),
          text: p.malinke,
          type: "malinke",
          pair: p.francais,
        },
        {
          id: Math.random(),
          text: p.francais,
          type: "francais",
          pair: p.malinke,
        },
      ])
      .sort(() => Math.random() - 0.5),
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(true);

  React.useEffect(() => {
    if (showAll) {
      const timer = setTimeout(() => setShowAll(false), config.showTime);
      return () => clearTimeout(timer);
    }
  }, [showAll, config.showTime]);

  const flip = (index: number) => {
    if (showAll || matched.includes(index) || flipped.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (
        (pairs[first].pair === pairs[second].text ||
          pairs[first].text === pairs[second].pair) &&
        pairs[first].type !== pairs[second].type
      ) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 600);
    }
  };

  const difficultyText =
    difficulty === "facile"
      ? "Facile"
      : difficulty === "moyen"
        ? "Moyen"
        : "Difficile";
  const difficultyColor =
    difficulty === "facile"
      ? "#4CAF50"
      : difficulty === "moyen"
        ? "#FF9800"
        : "#f44336";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.retour} onPress={onBack}>
          <Text style={styles.retourTexte}>‹ Retour</Text>
        </TouchableOpacity>
        <Text style={styles.titre}>🎮 Mémoire Bambara</Text>
        <View
          style={[styles.difficultyBadge, { backgroundColor: difficultyColor }]}
        >
          <Text style={styles.difficultyText}>{difficultyText}</Text>
        </View>
      </View>

      {showAll && (
        <View style={styles.instructionBox}>
          <Text style={styles.instructionText}>Mémorisez les paires !</Text>
        </View>
      )}

      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          {pairs.map((card: any, index: number) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.card,
                showAll || flipped.includes(index) || matched.includes(index)
                  ? styles.cardFlipped
                  : styles.cardHidden,
              ]}
              onPress={() => flip(index)}
            >
              <Text style={styles.cardText}>
                {showAll || flipped.includes(index) || matched.includes(index)
                  ? card.text
                  : "?"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Paires trouvées : {Math.floor(matched.length / 2)} /{" "}
          {Math.ceil(pairs.length / 2)}
        </Text>
      </View>

      {matched.length === pairs.length && (
        <TouchableOpacity style={styles.boutonGrand} onPress={onBack}>
          <Text style={styles.boutonTexte}>Bravo ! Rejouer</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

// MATCHING GAME
function MatchingGame({ wordPairs, difficulty, onBack }: any) {
  const getGameConfig = (diff: string) => {
    switch (diff) {
      case "facile":
        return { questionCount: 4, optionsCount: 3 };
      case "moyen":
        return { questionCount: 6, optionsCount: 4 };
      case "difficile":
        return { questionCount: 8, optionsCount: 4 };
      default:
        return { questionCount: 6, optionsCount: 4 };
    }
  };

  const config = getGameConfig(difficulty);
  const gameQuestions = wordPairs.slice(0, config.questionCount);

  const [questions, setQuestions] = useState(
    gameQuestions.map((p: any, idx: number) => {
      const allOptions = wordPairs.map((w: any) => w.francais);
      const shuffledOptions = allOptions
        .sort(() => Math.random() - 0.5)
        .slice(0, config.optionsCount);

      // Ensure correct answer is included
      if (!shuffledOptions.includes(p.francais)) {
        shuffledOptions[Math.floor(Math.random() * shuffledOptions.length)] =
          p.francais;
      }

      return {
        id: idx,
        question: p.malinke,
        options: shuffledOptions,
        correct: p.francais,
        answered: false,
      };
    }),
  );
  const [score, setScore] = useState(0);

  const handleAnswer = (qIdx: number, answer: string) => {
    if (questions[qIdx].answered) return;

    const isCorrect = answer === questions[qIdx].correct;
    setQuestions(
      questions.map((q: any, idx: number) =>
        idx === qIdx ? { ...q, answered: true } : q,
      ),
    );

    if (isCorrect) setScore(score + 1);
  };

  const difficultyText =
    difficulty === "facile"
      ? "Facile"
      : difficulty === "moyen"
        ? "Moyen"
        : "Difficile";
  const difficultyColor =
    difficulty === "facile"
      ? "#4CAF50"
      : difficulty === "moyen"
        ? "#FF9800"
        : "#f44336";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.retour} onPress={onBack}>
          <Text style={styles.retourTexte}>‹ Retour</Text>
        </TouchableOpacity>
        <Text style={styles.titre}>🎯 Appariement</Text>
        <View
          style={[styles.difficultyBadge, { backgroundColor: difficultyColor }]}
        >
          <Text style={styles.difficultyText}>{difficultyText}</Text>
        </View>
      </View>

      <View style={styles.contenuMatching}>
        {questions.map((q: any, qIdx: number) => (
          <View key={q.id} style={styles.matchingCard}>
            <Text style={styles.matchingQuestion}>{q.question}</Text>
            {q.options.map((option: string, optIdx: number) => (
              <TouchableOpacity
                key={optIdx}
                style={[
                  styles.matchingOption,
                  q.answered &&
                    option === q.correct && {
                      backgroundColor: "#4CAF50",
                    },
                  q.answered &&
                    option !== q.correct && {
                      backgroundColor: "#E0E0E0",
                    },
                ]}
                onPress={() => handleAnswer(qIdx, option)}
                disabled={q.answered}
              >
                <Text style={styles.matchingOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Score : {score} / {questions.length}
        </Text>
      </View>

      {questions.every((q: any) => q.answered) && (
        <TouchableOpacity style={styles.boutonGrand} onPress={onBack}>
          <Text style={styles.boutonTexte}>
            Terminé ! Score : {score}/{questions.length}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

// SPEEDRUN GAME
function SpeedrunGame({ lecons, difficulty, onBack }: any) {
  const getGameConfig = (diff: string) => {
    switch (diff) {
      case "facile":
        return { questionCount: 3, timePerQuestion: 45 };
      case "moyen":
        return { questionCount: 5, timePerQuestion: 30 };
      case "difficile":
        return { questionCount: 7, timePerQuestion: 20 };
      default:
        return { questionCount: 5, timePerQuestion: 30 };
    }
  };

  const config = getGameConfig(difficulty);
  const allQuestions = lecons.flatMap((lecon: any) => lecon.jeu || []);
  const [questions] = useState(
    allQuestions.sort(() => Math.random() - 0.5).slice(0, config.questionCount),
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.timePerQuestion);

  React.useEffect(() => {
    if (timeLeft <= 0 || currentIdx >= questions.length) return;
    const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentIdx]);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentIdx].answer) {
      setScore(score + 1);
    }
    if (currentIdx + 1 < questions.length && timeLeft > 0) {
      setCurrentIdx(currentIdx + 1);
      setTimeLeft(config.timePerQuestion);
    }
  };

  const difficultyText =
    difficulty === "facile"
      ? "Facile"
      : difficulty === "moyen"
        ? "Moyen"
        : "Difficile";
  const difficultyColor =
    difficulty === "facile"
      ? "#4CAF50"
      : difficulty === "moyen"
        ? "#FF9800"
        : "#f44336";

  if (timeLeft <= 0 && currentIdx >= questions.length - 1) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.retour} onPress={onBack}>
            <Text style={styles.retourTexte}>‹ Retour</Text>
          </TouchableOpacity>
          <Text style={styles.titre}>⚡ Résultat</Text>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: difficultyColor },
            ]}
          >
            <Text style={styles.difficultyText}>{difficultyText}</Text>
          </View>
        </View>
        <View style={styles.resultBox}>
          <Text style={styles.resultScore}>
            {score} / {questions.length}
          </Text>
          <Text style={styles.resultTexte}>Bien joué ! 🎉</Text>
        </View>
        <TouchableOpacity style={styles.boutonGrand} onPress={onBack}>
          <Text style={styles.boutonTexte}>Terminer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questions[currentIdx];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.retour} onPress={onBack}>
          <Text style={styles.retourTexte}>‹ Retour</Text>
        </TouchableOpacity>
        <Text style={styles.titre}>⚡ Course Contre la Montre</Text>
        <View
          style={[styles.difficultyBadge, { backgroundColor: difficultyColor }]}
        >
          <Text style={styles.difficultyText}>{difficultyText}</Text>
        </View>
      </View>

      <View style={styles.timerBox}>
        <Text style={[styles.timer, timeLeft < 10 && { color: "#f44336" }]}>
          ⏱ {timeLeft}s
        </Text>
        <Text style={styles.progressText}>
          {currentIdx + 1} / {questions.length}
        </Text>
      </View>

      <View style={styles.speedrunQuestion}>
        <Text style={styles.speedrunQuestionText}>{q.question}</Text>
      </View>

      <View style={styles.speedrunOptions}>
        {q.options.map((option: string, idx: number) => (
          <TouchableOpacity
            key={idx}
            style={styles.speedrunOption}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.speedrunOptionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.scoreText}>Score actuel : {score}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F7F2" },
  header: { backgroundColor: "#1A237E", padding: 24, paddingTop: 50 },
  retour: { marginBottom: 16 },
  retourTexte: { color: "#FBC02D", fontSize: 16, fontWeight: "600" },
  titre: { fontSize: 28, fontWeight: "bold", color: "#FBC02D" },
  difficultyBadge: {
    position: "absolute",
    top: 50,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    elevation: 3,
  },
  difficultyText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  instructionBox: {
    margin: 16,
    padding: 16,
    backgroundColor: "#FFF3E0",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  instructionText: {
    fontSize: 16,
    color: "#1A237E",
    textAlign: "center",
    fontWeight: "bold",
  },
  gridContainer: { padding: 16 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 8,
  },
  card: {
    width: "22%",
    aspectRatio: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  cardHidden: { backgroundColor: "#1A237E" },
  cardFlipped: { backgroundColor: "#FBC02D" },
  cardText: { fontSize: 12, fontWeight: "bold", color: "#1A237E" },
  infoBox: {
    margin: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  infoText: { fontSize: 16, color: "#1A237E", fontWeight: "bold" },
  contenuMatching: { padding: 16 },
  matchingCard: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
  },
  matchingQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A237E",
    marginBottom: 8,
  },
  matchingOption: {
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 6,
  },
  matchingOptionText: { fontSize: 14, color: "#333" },
  timerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
  },
  timer: { fontSize: 24, fontWeight: "bold", color: "#1A237E" },
  progressText: { fontSize: 16, color: "#888" },
  speedrunQuestion: { padding: 16 },
  speedrunQuestionText: { fontSize: 20, fontWeight: "bold", color: "#1A237E" },
  speedrunOptions: { padding: 16 },
  speedrunOption: {
    backgroundColor: "#1A237E",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 8,
  },
  speedrunOptionText: {
    fontSize: 16,
    color: "#F9F7F2",
    textAlign: "center",
    fontWeight: "bold",
  },
  scoreText: {
    textAlign: "center",
    fontSize: 16,
    color: "#1A237E",
    fontWeight: "bold",
    marginVertical: 16,
  },
  resultBox: { alignItems: "center", marginTop: 60 },
  resultScore: { fontSize: 72, fontWeight: "bold", color: "#FBC02D" },
  resultTexte: { fontSize: 24, color: "#1A237E", marginTop: 16 },
  boutonGrand: {
    backgroundColor: "#FBC02D",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    alignItems: "center",
  },
  boutonTexte: { color: "#1A237E", fontSize: 18, fontWeight: "bold" },
  bouton: {
    backgroundColor: "#1A237E",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    alignSelf: "center",
  },
});
