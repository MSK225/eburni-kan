import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useProgress } from "../src/context/ProgressContext";
import { lecons } from "../src/data/lecons";

interface ContentItem {
  malinke: string;
  francais: string;
  prononciation: string;
  note?: string;
  exemple?: string;
  reponse?: string;
}

export default function LeconScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { recordEvent } = useProgress();

  const lecon = lecons.find((l) => l.id === Number(id));

  useEffect(() => {
    if (!lecon) return;
    const sendViewEvent = async () => {
      await recordEvent({
        type: "lesson_view",
        lessonId: lecon.id,
        timestamp: Date.now(),
      });
    };
    sendViewEvent();
  }, [lecon, recordEvent]);

  const startQuiz = async () => {
    if (!lecon) return;
    await recordEvent({
      type: "lesson_view",
      lessonId: lecon.id,
      timestamp: Date.now(),
    });
    router.push(`/quiz?id=${lecon.id}`);
  };

  if (!lecon) {
    return (
      <View style={styles.container}>
        <Text style={styles.erreur}>Leçon non trouvée</Text>
        <TouchableOpacity style={styles.boutton} onPress={() => router.back()}>
          <Text style={styles.bouttonTexte}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.retour} onPress={() => router.back()}>
          <Text style={styles.retourTexte}>‹ Retour</Text>
        </TouchableOpacity>
        <Text style={styles.titre}>{lecon.titre}</Text>
        <Text style={styles.niveau}>{lecon.niveau}</Text>
      </View>

      <View style={styles.contenu}>
        {lecon.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitre}>📝 À propos</Text>
            <Text style={styles.texte}>{lecon.description}</Text>
          </View>
        )}

        {lecon.objectifs && (
          <View style={styles.section}>
            <Text style={styles.sectionTitre}>🎯 Objectifs</Text>
            {lecon.objectifs.map((obj, index) => (
              <View key={index} style={styles.objectifItem}>
                <Text style={styles.objectifBullet}>•</Text>
                <Text style={styles.objectifTexte}>{obj}</Text>
              </View>
            ))}
          </View>
        )}

        {lecon.introduction && (
          <View style={styles.section}>
            <Text style={styles.sectionTitre}>💡 Introduction</Text>
            <Text style={styles.texte}>{lecon.introduction}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitre}>📚 Vocabulaire</Text>
          {lecon.contenu.map((item: any, index) => (
            <View key={index} style={styles.motCard}>
              <Text style={styles.malinke}>{item.malinke}</Text>
              <Text style={styles.prononciation}>{item.prononciation}</Text>
              <Text style={styles.francais}>{item.francais}</Text>
              {item.note && <Text style={styles.note}>💬 {item.note}</Text>}
              {item.exemple && (
                <Text style={styles.exemple}>Exemple: {item.exemple}</Text>
              )}
              {item.reponse && (
                <Text style={styles.reponse}>Réponse: {item.reponse}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitre}>⏱ Durée estimée</Text>
          <Text style={styles.info}>{lecon.duree}</Text>
        </View>

        {lecon.conseils && (
          <View style={styles.section}>
            <Text style={styles.sectionTitre}>💪 Conseils d'apprentissage</Text>
            <Text style={styles.texte}>{lecon.conseils}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.boutonJeu} onPress={startQuiz}>
          <Text style={styles.boutonJeuTexte}>Démarrer le jeu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boutonCommencer}
          onPress={() => router.back()}
        >
          <Text style={styles.boutonTexte}>Quitter</Text>
        </TouchableOpacity>
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
    padding: 20,
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
  niveau: {
    fontSize: 14,
    color: "#F9F7F2",
    marginTop: 8,
  },
  contenu: {
    padding: 16,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#FBC02D",
  },
  sectionTitre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A237E",
    marginBottom: 12,
  },
  texte: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
  objectifItem: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  objectifBullet: {
    color: "#FBC02D",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  objectifTexte: {
    fontSize: 14,
    color: "#555",
    flex: 1,
    lineHeight: 20,
  },
  motCard: {
    backgroundColor: "#F9F7F2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#1A237E",
  },
  malinke: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A237E",
    marginBottom: 4,
  },
  prononciation: {
    fontSize: 14,
    color: "#FBC02D",
    fontStyle: "italic",
    marginBottom: 4,
  },
  francais: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
    fontWeight: "500",
  },
  note: {
    fontSize: 12,
    color: "#d88e0b",
    marginTop: 6,
    fontStyle: "italic",
  },
  exemple: {
    fontSize: 12,
    color: "#1976d2",
    marginTop: 4,
  },
  reponse: {
    fontSize: 12,
    color: "#388e3c",
    marginTop: 4,
    fontWeight: "500",
  },
  info: {
    fontSize: 16,
    color: "#555",
  },
  boutonCommencer: {
    backgroundColor: "#FBC02D",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  boutonTexte: {
    color: "#1A237E",
    fontSize: 18,
    fontWeight: "bold",
  },
  boutonJeu: {
    backgroundColor: "#1A237E",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  boutonJeuTexte: {
    color: "#F9F7F2",
    fontSize: 18,
    fontWeight: "bold",
  },
  erreur: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
    marginTop: 32,
  },
  boutton: {
    backgroundColor: "#1A237E",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    alignSelf: "center",
  },
  bouttonTexte: {
    color: "#FBC02D",
    fontSize: 16,
    fontWeight: "600",
  },
});
