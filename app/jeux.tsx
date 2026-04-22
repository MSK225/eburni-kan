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
      <View style={styles.header}>
        <TouchableOpacity style={styles.retour} onPress={() => router.back()}>
          <Text style={styles.retourTexte}>‹ Retour</Text>
        </TouchableOpacity>
        <Text style={styles.titre}>🎮 Jeux</Text>
        <Text style={styles.sousTitre}>Choisissez votre difficulté</Text>
      </View>

      {/* Liste des jeux */}
      <View style={styles.listeJeux}>
        {games.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={styles.carteJeu}
            onPress={() => handleGameSelect(game)}
          >
            <View style={styles.carteTete}>
              <Text style={styles.titre}>{game.titre}</Text>
              <View style={styles.badges}>
                <View style={styles.badge}>
                  <Text style={styles.badgeTexte}>{game.niveau}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeTexte}>⏱ {game.duree}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.description}>{game.description}</Text>
            <View style={styles.jouerBtn}>
              <Text style={styles.jouerTexte}>Choisir difficulté ›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Section info */}
      <View style={styles.info}>
        <Text style={styles.infoTitre}>💡 Conseil</Text>
        <Text style={styles.infoTexte}>
          Commencez par le niveau Facile pour vous familiariser avec les jeux,
          puis progressez vers les niveaux plus difficiles pour améliorer vos
          compétences !
        </Text>
      </View>

      {/* Modal de sélection de difficulté */}
      <Modal
        visible={difficultyModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDifficultyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
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
              {difficulties.map((diff) => (
                <TouchableOpacity
                  key={diff.id}
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
              ))}
            </View>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setDifficultyModalVisible(false)}
            >
              <Text style={styles.cancelTexte}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
    elevation: 2,
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
