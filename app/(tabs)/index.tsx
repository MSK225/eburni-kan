import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useProgress } from "../../src/context/ProgressContext";
import { lecons } from "../../src/data/lecons";

export default function HomeScreen() {
  const router = useRouter();
  const { progress, difficulty } = useProgress();

  const totalLessons = lecons.length;
  const completedLessons = progress.completedLessons.length;
  const quizAccuracy = useMemo(() => {
    if (progress.quizTotal === 0) return 0;
    return Math.round((progress.quizCorrect / progress.quizTotal) * 100);
  }, [progress.quizCorrect, progress.quizTotal]);

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.salutation}>I ni ce 👋</Text>
          <Text style={styles.sousTitre}>Découvre ton chemin en bambara</Text>
        </View>
        <TouchableOpacity style={styles.avatarContainer}>
          <Text style={styles.avatar}>👤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.carteMotDuJour}>
        <Text style={styles.carteLabel}>✨ MOT DU JOUR</Text>
        <Text style={styles.motDuJour}>{motDuJour.malinke}</Text>
        <Text style={styles.traduction}>{motDuJour.francais} — Bambara</Text>
        <Text style={styles.prononciation}>🔊 {motDuJour.prononciation}</Text>
        <Text style={styles.leconSource}>De la leçon: {motDuJour.lecon}</Text>
      </View>

      <View style={styles.carteProgression}>
        <Text style={styles.progressionTitre}>🔥 Ta progression</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNombre}>{completedLessons}</Text>
            <Text style={styles.statLabel}>Leçons finies</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNombre}>{progress.quizTotal}</Text>
            <Text style={styles.statLabel}>Questions répond.</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNombre}>{quizAccuracy}%</Text>
            <Text style={styles.statLabel}>Précision quiz</Text>
          </View>
        </View>
        <Text style={styles.progressionSummary}>
          Niveau recommandé : {difficulty}
        </Text>
      </View>

      <Text style={styles.sectionTitre}>Modules</Text>
      <View style={styles.grilleModules}>
        <TouchableOpacity
          style={styles.moduleCard}
          onPress={() => router.push("/cours")}
        >
          <Text style={styles.moduleEmoji}>📚</Text>
          <Text style={styles.moduleNom}>Cours</Text>
          <Text style={styles.moduleDesc}>Leçons par niveaux</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.moduleCard}
          onPress={() => router.push("/jeux")}
        >
          <Text style={styles.moduleEmoji}>🎮</Text>
          <Text style={styles.moduleNom}>Jeux</Text>
          <Text style={styles.moduleDesc}>Memory & Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.moduleCard}
          onPress={() => router.push("/culture")}
        >
          <Text style={styles.moduleEmoji}>🌍</Text>
          <Text style={styles.moduleNom}>Culture</Text>
          <Text style={styles.moduleDesc}>Proverbes & Contes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.moduleCard}
          onPress={() => router.push("/profil")}
        >
          <Text style={styles.moduleEmoji}>🏆</Text>
          <Text style={styles.moduleNom}>Profil</Text>
          <Text style={styles.moduleDesc}>Badges & Certificats</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.carteProverbe}>
        <Text style={styles.proverbeLabel}>📜 PROVERBE DU JOUR</Text>
        <Text style={styles.proverbeTexte}>"Mogoya ka ca siya la"</Text>
        <Text style={styles.proverbeTraduction}>
          L'humanité est plus grande que l'ethnie — Bambara
        </Text>
      </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  salutation: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FBC02D",
  },
  sousTitre: {
    fontSize: 14,
    color: "#F9F7F2",
    marginTop: 4,
  },
  avatarContainer: {
    backgroundColor: "#FBC02D",
    borderRadius: 30,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    fontSize: 24,
  },
  carteMotDuJour: {
    margin: 16,
    padding: 20,
    backgroundColor: "#1A237E",
    borderRadius: 16,
    alignItems: "center",
    elevation: 4,
  },
  carteLabel: {
    fontSize: 12,
    color: "#FBC02D",
    letterSpacing: 2,
    fontWeight: "bold",
  },
  motDuJour: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FBC02D",
    marginTop: 8,
    textAlign: "center",
  },
  traduction: {
    fontSize: 16,
    color: "#F9F7F2",
    marginTop: 4,
  },
  prononciation: {
    fontSize: 14,
    color: "#FBC02D",
    marginTop: 8,
  },
  leconSource: {
    fontSize: 12,
    color: "#F9F7F2",
    marginTop: 4,
    opacity: 0.8,
    fontStyle: "italic",
  },
  carteProgression: {
    margin: 16,
    marginTop: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 2,
  },
  progressionTitre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNombre: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A237E",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    textAlign: "center",
  },
  sectionTitre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212121",
    marginLeft: 16,
    marginBottom: 12,
  },
  grilleModules: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
  moduleCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: "47%",
    marginBottom: 12,
    elevation: 2,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#FBC02D",
  },
  moduleEmoji: {
    fontSize: 36,
  },
  moduleNom: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A237E",
    marginTop: 8,
  },
  moduleDesc: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    textAlign: "center",
  },
  progressionSummary: {
    marginTop: 12,
    color: "#555",
    fontSize: 14,
  },
  carteProverbe: {
    margin: 16,
    padding: 20,
    backgroundColor: "#1A237E",
    borderRadius: 16,
    marginBottom: 32,
  },
  proverbeLabel: {
    fontSize: 12,
    color: "#FBC02D",
    letterSpacing: 2,
    fontWeight: "bold",
    marginBottom: 12,
  },
  proverbeTexte: {
    fontSize: 16,
    color: "#F9F7F2",
    fontStyle: "italic",
    lineHeight: 24,
  },
  proverbeTraduction: {
    fontSize: 13,
    color: "#FBC02D",
    marginTop: 8,
  },
});
