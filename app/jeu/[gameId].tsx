import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useProgress } from "../../src/context/ProgressContext";

const gameDetails = [
  {
    id: "memory",
    titre: "Mémoire Bambara",
    description:
      "Retournez les cartes et trouvez les paires de mots bambara et leurs traductions.",
  },
  {
    id: "matching",
    titre: "Appariement",
    description: "Associez chaque mot bambara à sa traduction française.",
  },
  {
    id: "speedrun",
    titre: "Course contre la montre",
    description: "Répondez à des questions rapides avant la fin du temps.",
  },
];

const difficulties = {
  facile: { label: "Facile", cards: 4, time: 35 },
  moyen: { label: "Moyen", cards: 6, time: 28 },
  difficile: { label: "Difficile", cards: 8, time: 22 },
};

const vocabularyPairs = [
  { id: "1", malinke: "I ni ce", francais: "Bonjour" },
  { id: "2", malinke: "Toro te", francais: "Je vais bien" },
  { id: "3", malinke: "Aw ni baara", francais: "Merci" },
  { id: "4", malinke: "Kelen", francais: "Un" },
  { id: "5", malinke: "Fila", francais: "Deux" },
  { id: "6", malinke: "Saba", francais: "Trois" },
  { id: "7", malinke: "Duuru", francais: "Cinq" },
  { id: "8", malinke: "Tan", francais: "Dix" },
];

const multipleChoiceQuestions = [
  {
    question: "Quel mot signifie 'Merci' ?",
    options: ["I ni ce", "Aw ni baara", "Toro te", "Kelen"],
    answer: "Aw ni baara",
  },
  {
    question: "Que veut dire 'Toro te' ?",
    options: ["Je vais bien", "Bonsoir", "Un", "Merci"],
    answer: "Je vais bien",
  },
  {
    question: "Quel mot correspond au chiffre 3 ?",
    options: ["Fila", "Tan", "Saba", "Duuru"],
    answer: "Saba",
  },
  {
    question: "Quel mot est la salutation du matin ?",
    options: ["I ni wula", "Toro te", "I ni ce", "Aw ni ce"],
    answer: "I ni ce",
  },
];

type Card = {
  id: string;
  pairId: string;
  label: string;
};

const shuffle = <T,>(array: T[]) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export default function GameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { recordEvent } = useProgress();
  const gameId = String(params.gameId || "");
  const difficultyKey = String(params.difficulty || "facile").toLowerCase();
  const game = gameDetails.find((item) => item.id === gameId);
  const difficulty =
    difficulties[difficultyKey as keyof typeof difficulties] ||
    difficulties.facile;

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [deck, setDeck] = useState<Card[]>([]);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedLeft, setMatchedLeft] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(difficulty.time);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showResult, setShowResult] = useState(false);

  const matchingPairs = vocabularyPairs.slice(0, difficulty.cards);
  const rightItems = useMemo(
    () =>
      shuffle(
        matchingPairs.map((pair) => ({ id: pair.id, text: pair.francais })),
      ),
    [matchingPairs],
  );

  const currentQuestion = multipleChoiceQuestions[questionIndex];

  const createMemoryDeck = () => {
    const pairs = vocabularyPairs.slice(0, difficulty.cards);
    return shuffle(
      pairs.flatMap((pair) => [
        { id: `${pair.id}-front`, pairId: pair.id, label: pair.malinke },
        { id: `${pair.id}-back`, pairId: pair.id, label: pair.francais },
      ]),
    );
  };

  const resetGameState = () => {
    setScore(0);
    setMoves(0);
    setDeck([]);
    setRevealedIds([]);
    setSelectedCardId(null);
    setMatchedPairs([]);
    setSelectedLeft(null);
    setMatchedLeft([]);
    setQuestionIndex(0);
    setTimer(difficulty.time);
    setShowResult(false);
  };

  const handleStart = () => {
    resetGameState();
    setStarted(true);
    setFinished(false);
    if (gameId === "memory") {
      setDeck(createMemoryDeck());
    }
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (!started || gameId !== "speedrun") return;
    timerRef.current = setInterval(() => {
      setTimer((previous) => {
        if (previous <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setFinished(true);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [started, gameId]);

  useEffect(() => {
    if (
      gameId === "memory" &&
      started &&
      matchedPairs.length === difficulty.cards
    ) {
      setFinished(true);
    }
  }, [matchedPairs.length, difficulty.cards, gameId, started]);

  useEffect(() => {
    if (
      gameId === "matching" &&
      started &&
      matchedLeft.length === difficulty.cards
    ) {
      setFinished(true);
    }
  }, [matchedLeft.length, difficulty.cards, gameId, started]);

  useEffect(() => {
    if (finished && started) {
      const durationMs = (difficulty.time - timer) * 1000;
      recordEvent({
        type: "game_session",
        difficulty: difficulty.label as "Facile" | "Moyen" | "Difficile",
        durationMs,
        timestamp: Date.now(),
      });
      setShowResult(true);
    }
  }, [finished, started, difficulty.label, recordEvent, timer]);

  const handleCardPress = (card: Card) => {
    if (revealedIds.includes(card.id) || matchedPairs.includes(card.pairId)) {
      return;
    }
    setMoves((prev) => prev + 1);
    setRevealedIds((prev) => [...prev, card.id]);
    if (!selectedCardId) {
      setSelectedCardId(card.id);
      return;
    }

    const selectedCard = deck.find((item) => item.id === selectedCardId);
    if (!selectedCard) {
      setSelectedCardId(card.id);
      return;
    }

    if (selectedCard.pairId === card.pairId) {
      setMatchedPairs((prev) => [...prev, card.pairId]);
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setRevealedIds((prev) =>
        prev.filter((id) => id !== selectedCardId && id !== card.id),
      );
      setSelectedCardId(null);
    }, 700);
  };

  const handleLeftSelect = (id: string) => {
    if (matchedLeft.includes(id)) return;
    setSelectedLeft(id);
  };

  const handleRightSelect = (id: string) => {
    if (!selectedLeft || matchedLeft.includes(id)) return;
    setMoves((prev) => prev + 1);
    if (selectedLeft === id) {
      setMatchedLeft((prev) => [...prev, id]);
      setScore((prev) => prev + 1);
    }
    setSelectedLeft(null);
  };

  const handleSpeedrunAnswer = (option: string) => {
    if (finished) return;
    setMoves((prev) => prev + 1);
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
    if (questionIndex + 1 === multipleChoiceQuestions.length) {
      setFinished(true);
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  if (!game) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Jeu introuvable.</Text>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderMemoryGame = () => (
    <View>
      <Text style={styles.gameSubtitle}>Trouve toutes les paires.</Text>
      <View style={styles.grid}>
        {deck.map((card) => {
          const isRevealed =
            revealedIds.includes(card.id) || matchedPairs.includes(card.pairId);
          return (
            <TouchableOpacity
              key={card.id}
              style={[styles.card, isRevealed && styles.cardRevealed]}
              onPress={() => handleCardPress(card)}
            >
              <Text style={styles.cardText}>
                {isRevealed ? card.label : "?"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.helpText}>
        Paires trouvées : {matchedPairs.length} / {difficulty.cards}
      </Text>
    </View>
  );

  const renderMatchingGame = () => (
    <View>
      <Text style={styles.gameSubtitle}>
        Associe les mots et leurs traductions.
      </Text>
      <View style={styles.matchingContainer}>
        <View style={styles.matchColumn}>
          {matchingPairs.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.matchItem,
                selectedLeft === item.id && styles.matchItemSelected,
              ]}
              onPress={() => handleLeftSelect(item.id)}
            >
              <Text style={styles.matchText}>{item.malinke}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.matchColumn}>
          {rightItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.matchItem}
              onPress={() => handleRightSelect(item.id)}
            >
              <Text style={styles.matchText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Text style={styles.helpText}>
        Paires correctes : {matchedLeft.length} / {difficulty.cards}
      </Text>
    </View>
  );

  const renderSpeedrunGame = () => (
    <View>
      <Text style={styles.gameSubtitle}>
        Répondez vite avant la fin du temps.
      </Text>
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.optionButton}
            onPress={() => handleSpeedrunAnswer(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.helpText}>
        Question {questionIndex + 1} / {multipleChoiceQuestions.length}
      </Text>
    </View>
  );

  const handleGameReset = () => {
    setStarted(false);
    setFinished(false);
    resetGameState();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backText}>‹ Retour</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{game.titre}</Text>
        <Text style={styles.subtitle}>
          {difficulty.label} • {game.description}
        </Text>
      </View>

      <View style={styles.statusRow}>
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Niveau</Text>
          <Text style={styles.statusValue}>{difficulty.label}</Text>
        </View>
        {gameId === "speedrun" && (
          <View style={styles.statusBox}>
            <Text style={styles.statusLabel}>Temps</Text>
            <Text style={styles.statusValue}>{timer}s</Text>
          </View>
        )}
      </View>

      {!started ? (
        <View style={styles.cardIntro}>
          <Text style={styles.description}>{game.description}</Text>
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>Démarrer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.gameArea}>
          {gameId === "memory" && renderMemoryGame()}
          {gameId === "matching" && renderMatchingGame()}
          {gameId === "speedrun" && renderSpeedrunGame()}
        </View>
      )}

      {showResult && (
        <Modal transparent animationType="fade" visible={showResult}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalEmoji}>🏁</Text>
              <Text style={styles.modalTitle}>Session terminée</Text>
              <Text style={styles.modalText}>Score : {score}</Text>
              <Text style={styles.modalText}>Coups : {moves}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleGameReset}
              >
                <Text style={styles.modalButtonText}>Recommencer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSecondaryButton}
                onPress={handleBack}
              >
                <Text style={styles.modalSecondaryText}>Retour aux jeux</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F7F2",
  },
  content: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: "#1A237E",
    padding: 24,
    paddingTop: 50,
  },
  backText: {
    color: "#FBC02D",
    marginBottom: 14,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FBC02D",
  },
  subtitle: {
    color: "#F9F7F2",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  statusBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flex: 1,
    marginHorizontal: 4,
  },
  statusLabel: {
    fontSize: 12,
    color: "#888",
  },
  statusValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A237E",
    marginTop: 6,
  },
  cardIntro: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },
  description: {
    color: "#333",
    lineHeight: 22,
    fontSize: 16,
  },
  startButton: {
    marginTop: 20,
    backgroundColor: "#1A237E",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  startButtonText: {
    color: "#FBC02D",
    fontSize: 16,
    fontWeight: "bold",
  },
  gameSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A237E",
    marginBottom: 16,
  },
  gameArea: {
    padding: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#1A237E",
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  cardRevealed: {
    backgroundColor: "#FBC02D",
  },
  cardText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  helpText: {
    marginTop: 12,
    color: "#555",
    fontSize: 14,
  },
  matchingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  matchColumn: {
    width: "48%",
  },
  matchItem: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  matchItemSelected: {
    borderColor: "#1A237E",
    backgroundColor: "#E8EAF6",
  },
  matchText: {
    color: "#333",
    fontSize: 14,
  },
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    color: "#1A237E",
    marginBottom: 18,
    fontWeight: "bold",
  },
  optionButton: {
    backgroundColor: "#F9F7F2",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1A237E",
  },
  optionText: {
    color: "#1A237E",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  modalEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A237E",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  modalButton: {
    backgroundColor: "#1A237E",
    borderRadius: 14,
    padding: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
  modalButtonText: {
    color: "#FBC02D",
    fontWeight: "bold",
  },
  modalSecondaryButton: {
    marginTop: 12,
  },
  modalSecondaryText: {
    color: "#1A237E",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    padding: 20,
    color: "#d32f2f",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1A237E",
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FBC02D",
    fontWeight: "bold",
  },
});
