import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ReadingWord = {
  text: string;
  translation: string;
};

type ReadingModuleProps = {
  title: string;
  sentence: ReadingWord[];
};

export function ReadingModule({ title, sentence }: ReadingModuleProps) {
  const [activeWord, setActiveWord] = useState<ReadingWord | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>
        <Text style={styles.description}>
          Appuie sur un mot pour voir sa traduction.
        </Text>
        <View style={styles.sentenceRow}>
          {sentence.map((word, index) => (
            <TouchableOpacity
              key={`${word.text}-${index}`}
              style={styles.wordButton}
              onPress={() => setActiveWord(word)}
            >
              <Text style={styles.wordText}>{word.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {activeWord ? (
          <View style={styles.translationBox}>
            <Text style={styles.translationLabel}>Traduction</Text>
            <Text style={styles.translationText}>{activeWord.translation}</Text>
          </View>
        ) : (
          <Text style={styles.translationHint}>
            Choisis un mot pour voir sa signification.
          </Text>
        )}
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
  description: {
    color: "#616161",
    marginBottom: 14,
  },
  sentenceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  wordButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C5CAE9",
    marginBottom: 8,
  },
  wordText: {
    fontSize: 16,
    color: "#1A237E",
  },
  translationBox: {
    marginTop: 4,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#1A237E",
  },
  translationLabel: {
    color: "#BBDEFB",
    fontSize: 12,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  translationText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  translationHint: {
    color: "#616161",
  },
});
