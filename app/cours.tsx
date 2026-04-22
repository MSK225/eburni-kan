import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useProgress } from "../src/context/ProgressContext";
import { lecons } from "../src/data/lecons";

export default function CoursScreen() {
  const router = useRouter();
  const {
    progress,
    difficulty,
    markLessonCompleted,
    recordEvent,
    syncProgress,
  } = useProgress();
  const completedLessons = progress.completedLessons;

  const accessibleLessonId = Math.min(
    completedLessons.length + 1,
    lecons.length,
  );

  const markCompleted = async (id: number) => {
    await recordEvent({
      type: "lesson_completed",
      lessonId: id,
      timestamp: Date.now(),
    });
    markLessonCompleted(id);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titre}>📚 Cours</Text>
        <Text style={styles.sousTitre}>Bambara — Niveau A1</Text>
      </View>

      {/* Progression */}
      <View style={styles.progressionInfo}>
        <Text style={styles.progressionTitre}>
          Niveau d'apprentissage : {difficulty}
        </Text>
        <Text style={styles.progressionTexte}>
          Leçons terminées : {completedLessons.length} / {lecons.length}
        </Text>
        <Text style={styles.progressionTexte}>
          Leçon suivante accessible : {accessibleLessonId}
        </Text>
        <Text style={styles.progressionTexte}>
          Statut sync : {progress.synced ? "Synchronisé" : "Non synchronisé"}
        </Text>
        <Text style={styles.progressionTexte}>
          Mode : {progress.offline ? "Hors ligne" : "En ligne"}
        </Text>
        <TouchableOpacity
          style={[
            styles.quizButton,
            { marginTop: 8, backgroundColor: "#4A148C" },
          ]}
          onPress={() => syncProgress()}
        >
          <Text style={styles.quizButtonText}>Synchroniser manuellement</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des leçons */}
      <View style={styles.listeLecons}>
        {lecons.map((lecon) => {
          const isCompleted = completedLessons.includes(lecon.id);
          const isLocked = lecon.id > accessibleLessonId;
          return (
            <View key={lecon.id} style={{ marginBottom: 12 }}>
              <TouchableOpacity
                style={[
                  styles.carteLecon,
                  isLocked && styles.carteLeconLocked,
                  isCompleted && styles.carteLeconCompleted,
                ]}
                onPress={async () => {
                  if (isLocked) return;
                  await recordEvent({
                    type: "lesson_view",
                    lessonId: lecon.id,
                    timestamp: Date.now(),
                  });
                  router.push(`/lecon?id=${lecon.id}`);
                }}
                disabled={isLocked}
              >
                <View style={styles.carteGauche}>
                  <View style={styles.numeroContainer}>
                    <Text style={styles.numero}>{lecon.id}</Text>
                  </View>
                </View>
                <View style={styles.carteCentre}>
                  <Text style={styles.leconTitre}>{lecon.titre}</Text>
                  <Text style={styles.leconNiveau}>{lecon.niveau}</Text>
                  <Text style={styles.leconDuree}>⏱ {lecon.duree}</Text>
                </View>
                <View style={styles.carteDroite}>
                  <Text style={styles.fleche}>›</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.boutonsActions}>
                <TouchableOpacity
                  style={[
                    styles.quizButton,
                    isLocked && styles.quizButtonDisabled,
                  ]}
                  onPress={async () => {
                    if (isLocked) return;
                    await recordEvent({
                      type: "lesson_view",
                      lessonId: lecon.id,
                      timestamp: Date.now(),
                    });
                    router.push(`/quiz?id=${lecon.id}`);
                  }}
                  disabled={isLocked}
                >
                  <Text style={styles.quizButtonText}>Quiz</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.quizButton,
                    isLocked && styles.quizButtonDisabled,
                  ]}
                  onPress={async () => {
                    if (isLocked) return;
                    await recordEvent({
                      type: "lesson_view",
                      lessonId: lecon.id,
                      timestamp: Date.now(),
                    });
                    router.push(`/lecon?id=${lecon.id}`);
                  }}
                  disabled={isLocked}
                >
                  <Text style={styles.quizButtonText}>Voir la leçon</Text>
                </TouchableOpacity>

                {!isCompleted && !isLocked ? (
                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => markCompleted(lecon.id)}
                  >
                    <Text style={styles.completeButtonText}>
                      Marquer terminé
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.lessonStatus}>
                    <Text style={styles.lessonStatusText}>
                      {isCompleted ? "✓ Terminé" : "🔒 Bloqué"}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
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
  listeLecons: {
    padding: 16,
  },
  carteLecon: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#FBC02D",
  },
  carteGauche: {
    marginRight: 16,
  },
  numeroContainer: {
    backgroundColor: "#1A237E",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  numero: {
    color: "#FBC02D",
    fontWeight: "bold",
    fontSize: 16,
  },
  carteCentre: {
    flex: 1,
  },
  leconTitre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A237E",
  },
  leconNiveau: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  leconDuree: {
    fontSize: 12,
    color: "#2E7D32",
    marginTop: 4,
  },
  carteDroite: {
    marginLeft: 8,
  },
  fleche: {
    fontSize: 28,
    color: "#FBC02D",
    fontWeight: "bold",
  },
  carteLeconLocked: {
    opacity: 0.6,
    borderLeftColor: "#9E9E9E",
  },
  carteLeconCompleted: {
    borderLeftColor: "#4CAF50",
  },
  leconVerrou: {
    marginTop: 6,
    color: "#f44336",
    fontSize: 12,
    fontWeight: "bold",
  },
  leconTerminee: {
    marginTop: 6,
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "bold",
  },
  boutonsActions: {
    flexDirection: "row",
    gap: 8,
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  completeButtonText: {
    color: "#F9F7F2",
    fontWeight: "bold",
    fontSize: 14,
  },
  lessonStatus: {
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
  },
  lessonStatusText: {
    color: "#424242",
    fontWeight: "bold",
    fontSize: 14,
  },
  quizButtonDisabled: {
    backgroundColor: "#9E9E9E",
  },
  progressionInfo: {
    padding: 16,
    backgroundColor: "#E8F5E9",
    margin: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
    marginBottom: 8,
  },
  progressionTitre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A237E",
  },
  progressionTexte: {
    fontSize: 14,
    color: "#2E7D32",
    marginTop: 4,
  },
  quizButton: {
    backgroundColor: "#1A237E",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  quizButtonText: {
    color: "#F9F7F2",
    fontWeight: "bold",
    fontSize: 14,
  },
});
