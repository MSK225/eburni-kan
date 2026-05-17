import { Gesture, GestureDetector } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Flashcard = {
  front: string;
  back: string;
  note?: string;
  example?: string;
};

type FlashcardModuleProps = {
  title: string;
  cards: Flashcard[];
};

export function FlashcardModule({ title, cards }: FlashcardModuleProps) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const flipAnim = useSharedValue(0);
  const translateX = useSharedValue(0);
  const card = cards[index];

  useEffect(() => {
    flipAnim.value = withSpring(showBack ? 1 : 0, {
      damping: 12,
      mass: 1,
      overshootClamping: false,
    });
  }, [showBack, flipAnim]);

  // Flip animation
  const animatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(flipAnim.value, [0, 1], [0, 180]);
    return {
      transform: [
        { rotateY: `${rotation}deg` },
        { translateX: translateX.value },
      ],
    };
  });

  // Swipe indicators opacity
  const leftIndicatorStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-80, 0], [1, 0], "clamp"),
  }));
  const rightIndicatorStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, 80], [0, 1], "clamp"),
  }));

  const goNext = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setShowBack(false);
  };

  const goPrevious = () => {
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setShowBack(false);
  };

  // Pan gesture pour swipe gauche/droite
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX * 0.4;
    })
    .onEnd((e) => {
      if (e.translationX < -60) {
        // Swipe gauche → carte suivante
        translateX.value = withTiming(-300, { duration: 200 }, () => {
          runOnJS(goNext)();
          translateX.value = 300;
          translateX.value = withSpring(0, { damping: 14 });
        });
      } else if (e.translationX > 60) {
        // Swipe droite → carte précédente
        translateX.value = withTiming(300, { duration: 200 }, () => {
          runOnJS(goPrevious)();
          translateX.value = -300;
          translateX.value = withSpring(0, { damping: 14 });
        });
      } else {
        translateX.value = withSpring(0, { damping: 14 });
      }
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {/* Indicateurs de swipe */}
      <View style={styles.swipeHints}>
        <Animated.Text style={[styles.swipeHintLeft, leftIndicatorStyle]}>
          ← Précédent
        </Animated.Text>
        <Animated.Text style={[styles.swipeHintRight, rightIndicatorStyle]}>
          Suivant →
        </Animated.Text>
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Text style={styles.counter}>{`Carte ${index + 1} / ${cards.length}`}</Text>
          {!showBack ? (
            <Animated.View entering={FadeIn.duration(300)}>
              <Text style={styles.front}>{card.front}</Text>
              <Text style={styles.hint}>👆 Appuie pour voir · Glisse pour naviguer</Text>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeIn.duration(300)}>
              <View style={styles.backContainer}>
                <Text style={styles.backLabel}>Traduction</Text>
                <Text style={styles.back}>{card.back}</Text>
                {card.note ? <Text style={styles.note}>{card.note}</Text> : null}
                {card.example ? (
                  <Text style={styles.example}>{card.example}</Text>
                ) : null}
              </View>
            </Animated.View>
          )}
        </Animated.View>
      </GestureDetector>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.controlButton} onPress={goPrevious}>
          <Text style={styles.controlButtonText}>← Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowBack((prev) => !prev)}
        >
          <Text style={styles.actionButtonText}>
            {showBack ? "Cacher" : "Voir la réponse"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={goNext}>
          <Text style={styles.controlButtonText}>Suivant →</Text>
        </TouchableOpacity>
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
    marginBottom: 4,
  },
  swipeHints: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  swipeHintLeft: {
    fontSize: 12,
    color: "#3F51B5",
    fontWeight: "600",
  },
  swipeHintRight: {
    fontSize: 12,
    color: "#3F51B5",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  counter: {
    fontSize: 12,
    color: "#555",
    marginBottom: 10,
  },
  front: {
    fontSize: 24,
    fontWeight: "800",
    color: "#212121",
    marginBottom: 16,
  },
  backContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
  },
  backLabel: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  back: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 8,
  },
  note: {
    fontSize: 13,
    color: "#616161",
    marginBottom: 4,
  },
  example: {
    fontSize: 13,
    color: "#424242",
  },
  hint: {
    fontSize: 13,
    color: "#9E9E9E",
    fontStyle: "italic",
  },
  buttonsRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  controlButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#E8EAF6",
  },
  controlButtonText: {
    color: "#303F9F",
    fontWeight: "600",
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: "#1A237E",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
