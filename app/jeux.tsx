import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { GAME_IMAGES } from "@/constants/media-assets";
import { useProgress } from "../src/context/ProgressContext";

interface Game {
  id: string;
  titre: string;
  description: string;
  niveau: string;
  duree: string;
}

export default function JeuxScreen() {
  const router = useRouter();
  const { difficulty: userDifficulty } = useProgress();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [difficultyModalVisible, setDifficultyModalVisible] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
    userDifficulty.toLowerCase(),
  );
  const [hoveredGameId, setHoveredGameId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedDifficulty(userDifficulty.toLowerCase());
  }, [userDifficulty]);

  const games = [
    {
      id: "memory",
      titre: "🎮 Mémoire Bambara",
      description: "Trouvez les paires de mots bambara et leurs traductions",
      niveau: "Adaptatif",
      duree: "3-8 min",
    },
    {
      id: "matching",
      titre: "🎯 Appariement",
      description: "Associez les mots bambara à leurs traductions en français",
      niveau: "Adaptatif",
      duree: "4-10 min",
    },
    {
      id: "speedrun",
      titre: "⚡ Course Contre la Montre",
      description: "Répondez le plus vite possible aux questions bambara",
      niveau: "Adaptatif",
      duree: "3-8 min",
    },
  ];

  const difficulties = [
    {
      id: "facile",
      label: "Facile",
      color: "#4CAF50",
      description: "Moins de mots, plus de temps",
    },
    {
      id: "moyen",
      label: "Moyen",
      color: "#FF9800",
      description: "Équilibré",
    },
    {
      id: "difficile",
      label: "Difficile",
      color: "#f44336",
      description: "Plus de mots, moins de temps",
    },
  ];

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setSelectedDifficulty(userDifficulty.toLowerCase());
    setDifficultyModalVisible(true);
  };

  const handleDifficultySelect = (difficulty: string) => {
    setDifficultyModalVisible(false);
    if (selectedGame) {
      router.push(`/jeu/${selectedGame.id}?difficulty=${difficulty}` as any);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Animated.View
        style={styles.header}
        entering={FadeIn.duration(400)}
      >
        <TouchableOpacity style={styles.retour} onPress={() => router.back()}>
          <Text style={styles.retourTexte}>‹ Retour</Text>
        </TouchableOpacity>
        <Text style={styles.titre}>🎮 Jeux</Text>
        <Text style={styles.sousTitre}>Choisissez votre difficulté</Text>
      </Animated.View>

      {/* Liste des jeux */}
      <View style={styles.listeJeux}>
        {games.map((game, idx) => (
          <GameCard
            key={game.id}
            game={game}
            delay={idx * 100}
            isHovered={hoveredGameId === game.id}
            onHoverStart={() => setHoveredGameId(game.id)}
            onHoverEnd={() => setHoveredGameId(null)}
            onPress={() => handleGameSelect(game)}
          />
        ))}
      </View>

      {/* Section info */}
      <Animated.View
        style={styles.info}
        entering={FadeInDown.delay(400).duration(400)}
      >
        <Text style={styles.infoTitre}>💡 Conseil</Text>
        <Text style={styles.infoTexte}>
          Commencez par le niveau Facile pour vous familiariser avec les jeux,
          puis progressez vers les niveaux plus difficiles pour améliorer vos
          compétences !
        </Text>
      </Animated.View>

      {/* Modal de sélection de difficulté */}
      <Modal
        visible={difficultyModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDifficultyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={styles.modalContent}
            entering={ZoomIn.duration(300)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.modalTitle}>
              {selectedGame ? selectedGame.titre : ""}
            </Text>
            <Text style={styles.modalSubtitle}>
              Niveau recommandé : {userDifficulty}
            </Text>
            <Text style={styles.modalSubtitle}>
              Choisissez votre niveau de difficulté
            </Text>

            <View style={styles.difficultyOptions}>
              {difficulties.map((diff, idx) => (
                <Animated.View
                  key={diff.id}
                  entering={FadeInDown.delay(idx * 80).duration(300)}
                >
                  <TouchableOpacity
                    style={[
                      styles.difficultyOption,
                      { borderLeftColor: diff.color },
                      selectedDifficulty === diff.id &&
                      styles.difficultyOptionSelected,
                    ]}
                    onPress={() => {
                      setSelectedDifficulty(diff.id);
                      handleDifficultySelect(diff.id);
                    }}
                  >
                    <View style={styles.difficultyHeader}>
                      <Text
                        style={[styles.difficultyLabel, { color: diff.color }]}
                      >
                        {diff.label}
                      </Text>
                      <View
                        style={[
                          styles.difficultyDot,
                          { backgroundColor: diff.color },
                        ]}
                      />
                    </View>
                    <Text style={styles.difficultyDescription}>
                      {diff.description}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setDifficultyModalVisible(false)}
            >
              <Text style={styles.cancelTexte}>Annuler</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function GameCard({
  game,
  delay,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onPress,
}: {
  game: Game;
  delay: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onPress: () => void;
}) {
  const scaleAnim = useSharedValue(1);

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnim.value }],
    };
  });

  const handlePressIn = () => {
    onHoverStart();
    scaleAnim.value = withSpring(1.02, {
      damping: 12,
      mass: 0.8,
    });
  };

  const handlePressOut = () => {
    onHoverEnd();
    scaleAnim.value = withSpring(1, {
      damping: 12,
      mass: 0.8,
    });
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(400)}
      style={animatedCardStyle}
    >
      <TouchableOpacity
        style={styles.carteJeu}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.95}
      >
        {GAME_IMAGES[game.id as keyof typeof GAME_IMAGES] && (
          <Animated.Image
            source={GAME_IMAGES[game.id as keyof typeof GAME_IMAGES]}
            style={[
              styles.gameImage,
              isHovered && { opacity: 0.95 },
            ]}
          />
        )}
        <View style={styles.carteTete}>
          <Text style={styles.titre}>{game.titre}</Text>
          <View style={styles.badges}>
            <Animated.View
              style={styles.badge}
              entering={FadeIn.delay(delay + 100).duration(300)}
            >
              <Text style={styles.badgeTexte}>{game.niveau}</Text>
            </Animated.View>
            <Animated.View
              style={styles.badge}
              entering={FadeIn.delay(delay + 150).duration(300)}
            >
              <Text style={styles.badgeTexte}>⏱ {game.duree}</Text>
            </Animated.View>
          </View>
        </View>
        <Text style={styles.description}>{game.description}</Text>
        <View style={styles.jouerBtn}>
          <Text style={styles.jouerTexte}>Choisir difficulté ›</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F7F2",
  },
  header: {
    backgroundColor: "#1A237E",
    padding: 24,
    paddingTop: 50,
  },
  retour: {
    marginBottom: 16,
  },
  retourTexte: {
    color: "#FBC02D",
    fontSize: 16,
    fontWeight: "600",
  },
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FBC02D",
  },
  sousTitre: {
    fontSize: 14,
    color: "#F9F7F2",
    marginTop: 4,
  },
  listeJeux: {
    padding: 16,
  },
  carteJeu: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FBC02D",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  gameImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#e0e0e0",
  },
  carteTete: {
    marginBottom: 12,
  },
  badges: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },
  badge: {
    backgroundColor: "#1A237E",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeTexte: {
    color: "#F9F7F2",
    fontSize: 12,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
    lineHeight: 20,
  },
  jouerBtn: {
    alignItems: "flex-end",
  },
  jouerTexte: {
    color: "#FBC02D",
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  infoTitre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A237E",
    marginBottom: 8,
  },
  infoTexte: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#F9F7F2",
    borderRadius: 20,
    padding: 24,
    margin: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A237E",
    textAlign: "center",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  difficultyOptions: {
    marginBottom: 24,
  },
  difficultyOption: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
  },
  difficultyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  difficultyLabel: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  difficultyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  difficultyDescription: {
    fontSize: 14,
    color: "#666",
  },
  difficultyOptionSelected: {
    backgroundColor: "#E3F2FD",
  },
  cancelBtn: {
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  cancelTexte: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
});
