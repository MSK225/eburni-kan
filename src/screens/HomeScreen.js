import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.salutation}>I ni ce 👋</Text>
          <Text style={styles.sousTitre}>Bonne continuation !</Text>
        </View>
        <TouchableOpacity style={styles.avatarContainer}>
          <Text style={styles.avatar}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Mot du jour */}
      <View style={styles.carteMotDuJour}>
        <Text style={styles.carteLabel}>✨ MOT DU JOUR</Text>
        <Text style={styles.motDuJour}>I ni ce</Text>
        <Text style={styles.traduction}>Bonjour (matin) — Bambara</Text>
        <Text style={styles.prononciation}>🔊 I-ni-cé</Text>
      </View>

      {/* Progression */}
      <View style={styles.carteProgression}>
        <Text style={styles.progressionTitre}>🔥 Ta progression</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNombre}>3</Text>
            <Text style={styles.statLabel}>Jours de série</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNombre}>12</Text>
            <Text style={styles.statLabel}>Mots appris</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNombre}>2</Text>
            <Text style={styles.statLabel}>Leçons finies</Text>
          </View>
        </View>
      </View>

      {/* Modules */}
      <Text style={styles.sectionTitre}>Modules</Text>
      <View style={styles.grilleModules}>
        <TouchableOpacity style={styles.moduleCard}>
          <Text style={styles.moduleEmoji}>📚</Text>
          <Text style={styles.moduleNom}>Cours</Text>
          <Text style={styles.moduleDesc}>Leçons par niveaux</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.moduleCard}>
          <Text style={styles.moduleEmoji}>🎮</Text>
          <Text style={styles.moduleNom}>Jeux</Text>
          <Text style={styles.moduleDesc}>Memory & Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.moduleCard}>
          <Text style={styles.moduleEmoji}>🌍</Text>
          <Text style={styles.moduleNom}>Culture</Text>
          <Text style={styles.moduleDesc}>Proverbes & Contes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.moduleCard}>
          <Text style={styles.moduleEmoji}>🏆</Text>
          <Text style={styles.moduleNom}>Profil</Text>
          <Text style={styles.moduleDesc}>Badges & Certificats</Text>
        </TouchableOpacity>
      </View>

      {/* Proverbe du jour */}
      <View style={styles.carteProverbe}>
        <Text style={styles.proverbeLabel}>📜 PROVERBE DU JOUR</Text>
        <Text style={styles.proverbeTexte}>"Sran kun su a, wawle tra"</Text>
        <Text style={styles.proverbeTraduction}>
          Seul on va vite, ensemble on va loin — Baoulé
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
    fontSize: 40,
    fontWeight: "bold",
    color: "#FBC02D",
    marginTop: 8,
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
