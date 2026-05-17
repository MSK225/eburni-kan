import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

type AudioPhrase = {
  text: string;
  translation: string;
  audioUri: string;
};

type AudioPracticeModuleProps = {
  title: string;
  phrases: AudioPhrase[];
};

export function AudioPracticeModule({
  title,
  phrases,
}: AudioPracticeModuleProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync().catch(() => null);
      }
    };
  }, [sound]);

  const playPhrase = async (index: number) => {
    const phrase = phrases[index];
    setLoading(true);
    setPlayingIndex(index);

    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: phrase.audioUri },
        { shouldPlay: true },
      );
      setSound(newSound);
    } catch (error) {
      console.warn("Erreur lecture audio", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(400)}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>
        Écoute chaque expression, puis vérifie sa traduction.
      </Text>

      {phrases.map((phrase, index) => {
        const isPlaying = index === playingIndex;
        return (
          <Animated.View
            key={phrase.text}
            style={styles.phraseCard}
            entering={SlideInDown.delay(index * 60).duration(300)}
          >
            <View>
              <Text style={styles.phraseText}>{phrase.text}</Text>
              <Text style={styles.phraseTranslation}>{phrase.translation}</Text>
            </View>
            <TouchableOpacity
              style={[styles.playButton, isPlaying && styles.playButtonActive]}
              onPress={() => playPhrase(index)}
              disabled={loading}
            >
              <Text style={styles.playButtonText}>
                {loading && isPlaying ? "Lecture..." : "🔊 Écouter"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
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
  description: {
    fontSize: 14,
    color: "#616161",
    marginBottom: 16,
  },
  phraseCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F5F5F5",
    marginBottom: 12,
  },
  phraseText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 6,
  },
  phraseTranslation: {
    fontSize: 14,
    color: "#424242",
  },
  playButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#1A237E",
  },
  playButtonActive: {
    backgroundColor: "#2E7D32",
  },
  playButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
