import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  const card = cards[index];

  const goNext = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setShowBack(false);
  };

  const goPrevious = () => {
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setShowBack(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>
        <Text
          style={styles.counter}
        >{`Carte ${index + 1} / ${cards.length}`}</Text>
        <Text style={styles.front}>{card.front}</Text>
        {showBack ? (
          <View style={styles.backContainer}>
            <Text style={styles.backLabel}>Traduction</Text>
            <Text style={styles.back}>{card.back}</Text>
            {card.note ? <Text style={styles.note}>{card.note}</Text> : null}
            {card.example ? (
              <Text style={styles.example}>{card.example}</Text>
            ) : null}
          </View>
        ) : (
          <Text style={styles.hint}>Appuie sur « Voir la réponse »</Text>
        )}
      </View>
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
    marginBottom: 12,
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
    fontSize: 14,
    color: "#616161",
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
