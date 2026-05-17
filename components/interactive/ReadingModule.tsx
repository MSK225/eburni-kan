import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInUp, FadeOut, ZoomIn } from "react-native-reanimated";

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
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(400)}
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>
        <Text style={styles.description}>
          Appuie sur un mot pour voir sa traduction.
        </Text>
        <View style={styles.sentenceRow}>
          {sentence.map((word, index) => (
            <Animated.View
              key={`${word.text}-${index}`}
              entering={FadeInUp.delay(index * 40).duration(300)}
            >
              <TouchableOpacity
                style={[
                  styles.wordButton,
                  activeWord === word && styles.wordButtonActive,
                ]}
                onPress={() => setActiveWord(word)}
              >
                <Text
                  style={[
                    styles.wordText,
                    activeWord === word && styles.wordTextActive,
                  ]}
                >
                  {word.text}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
        {activeWord ? (
          <Animated.View
            style={styles.translationBox}
            entering={ZoomIn.duration(300)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.translationLabel}>Traduction</Text>
            <Text style={styles.translationText}>{activeWord.translation}</Text>
          </Animated.View>
        ) : (
          <Text style={styles.translationHint}>
            Choisis un mot pour voir sa signification.
          </Text>
        )}
      </View>
    </Animated.View>
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
  wordButtonActive: {
    backgroundColor: "#1A237E",
    borderColor: "#1A237E",
  },
  wordText: {
    fontSize: 16,
    color: "#1A237E",
  },
  wordTextActive: {
    color: "#fff",
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
