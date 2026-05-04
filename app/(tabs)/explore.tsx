import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { AudioPracticeModule } from "@/components/interactive/AudioPracticeModule";
import { FlashcardModule } from "@/components/interactive/FlashcardModule";
import { MultipleChoiceModule } from "@/components/interactive/MultipleChoiceModule";
import { ReadingModule } from "@/components/interactive/ReadingModule";
import { useProgress } from "@/src/context/ProgressContext";
import { lecons } from "@/src/data/lecons";

export default function ExploreScreen() {
  const { progress, recordEvent } = useProgress();
  const lesson = lecons.find((item) => item.id === 2) ?? lecons[0];

  const flashcards = lesson.contenu.slice(0, 4).map((entry: any) => ({
    front: entry.malinke,
    back: entry.francais,
    note: entry.note,
    example: entry.exemple,
  }));

  const questions = lesson.jeu ?? [];

  const isCompleted = (moduleId: string) =>
    progress.completedModules.includes(moduleId);

  const completeModule = async (moduleId: string) => {
    if (isCompleted(moduleId)) return;

    await recordEvent({
      type: "interactive_module_completed",
      moduleId,
      timestamp: Date.now(),
    });
  };

  const readingSentence = [
    { text: "I ni ce", translation: "Bonjour" },
    { text: "Tananamaw?", translation: "Comment vas-tu ?" },
    { text: "Toro te", translation: "Je vais bien" },
  ];

  const audioPhrases = [
    {
      text: "I ni ce",
      translation: "Bonjour",
      audioUri:
        "https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3",
    },
    {
      text: "I ni wula",
      translation: "Bonsoir",
      audioUri:
        "https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3",
    },
    {
      text: "Toro te",
      translation: "Je vais bien",
      audioUri:
        "https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3",
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Modules interactifs</Text>
      <Text style={styles.subtitle}>
        Des activités simples pour apprendre sans écrire : flashcards, quiz et
        lecture interactive.
      </Text>

      <View style={styles.section}>
        <FlashcardModule title="Révision rapide" cards={flashcards} />
        <TouchableOpacity
          style={[
            styles.completeButton,
            isCompleted("flashcards") && styles.completeButtonDone,
          ]}
          onPress={() => completeModule("flashcards")}
          disabled={isCompleted("flashcards")}
        >
          <Text style={styles.completeButtonText}>
            {isCompleted("flashcards") ? "Module validé" : "Valider le module"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <MultipleChoiceModule title="Quiz intuitif" questions={questions} />
        <TouchableOpacity
          style={[
            styles.completeButton,
            isCompleted("quiz") && styles.completeButtonDone,
          ]}
          onPress={() => completeModule("quiz")}
          disabled={isCompleted("quiz")}
        >
          <Text style={styles.completeButtonText}>
            {isCompleted("quiz") ? "Module validé" : "Valider le module"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <ReadingModule title="Lecture interactive" sentence={readingSentence} />
        <TouchableOpacity
          style={[
            styles.completeButton,
            isCompleted("reading") && styles.completeButtonDone,
          ]}
          onPress={() => completeModule("reading")}
          disabled={isCompleted("reading")}
        >
          <Text style={styles.completeButtonText}>
            {isCompleted("reading") ? "Module validé" : "Valider le module"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <AudioPracticeModule title="Écoute et répète" phrases={audioPhrases} />
        <TouchableOpacity
          style={[
            styles.completeButton,
            isCompleted("audio") && styles.completeButtonDone,
          ]}
          onPress={() => completeModule("audio")}
          disabled={isCompleted("audio")}
        >
          <Text style={styles.completeButtonText}>
            {isCompleted("audio") ? "Module validé" : "Valider le module"}
          </Text>
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
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A237E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#424242",
    marginBottom: 16,
    lineHeight: 22,
  },
  section: {
    marginBottom: 12,
  },
  completeButton: {
    marginTop: 14,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#1A237E",
    alignItems: "center",
  },
  completeButtonDone: {
    backgroundColor: "#4CAF50",
  },
  completeButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
