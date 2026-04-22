import { IconSymbol } from "@/components/ui/icon-symbol";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { VideoPlayer } from "../../components/ui/video-player";
import {
    getDailyExpression,
    getDailyProverb,
    tales,
} from "../../src/data/culture";

export default function CultureScreen() {
  const dailyProverb = getDailyProverb();
  const dailyExpression = getDailyExpression();
  const [selectedTale, setSelectedTale] = useState<any>(null);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);

  const playVideo = (tale: any) => {
    setSelectedTale(tale);
    setIsVideoModalVisible(true);
  };

  const closeVideo = () => {
    setIsVideoModalVisible(false);
    setSelectedTale(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <IconSymbol name="book.fill" size={48} color="#FBC02D" />
          <Text style={styles.title}>Culture Bambara</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Proverbe du jour</Text>
          <Text style={styles.proverb}>"{dailyProverb.malinke}"</Text>
          <Text style={styles.translation}>{dailyProverb.francais}</Text>
          <Text style={styles.explanation}>{dailyProverb.explication}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expression du jour</Text>
          <Text style={styles.expression}>"{dailyExpression.malinke}"</Text>
          <Text style={styles.translation}>{dailyExpression.francais}</Text>
          <Text style={styles.explanation}>{dailyExpression.contexte}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contes traditionnels</Text>
          <Text style={styles.description}>
            Découvrez les contes et légendes qui transmettent la sagesse bambara
            de génération en génération.
          </Text>
          {tales.map((tale) => (
            <TouchableOpacity
              key={tale.id}
              style={styles.taleCard}
              onPress={() => playVideo(tale)}
            >
              <View style={styles.taleContent}>
                <IconSymbol name="play.circle.fill" size={32} color="#FBC02D" />
                <View style={styles.taleInfo}>
                  <Text style={styles.taleTitle}>{tale.title}</Text>
                  <Text style={styles.taleDescription}>{tale.description}</Text>
                  <Text style={styles.taleDuration}>{tale.duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            À propos de la culture bambara
          </Text>
          <Text style={styles.story}>
            La culture bambara est riche en traditions orales, musique, danse et
            artisanat. Les contes, proverbes et expressions sont des outils
            essentiels pour transmettre les valeurs sociales, morales et
            spirituelles du peuple bambara.
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={isVideoModalVisible}
        animationType="slide"
        onRequestClose={closeVideo}
      >
        <View style={styles.modalContainer}>
          {selectedTale && (
            <VideoPlayer
              source={selectedTale.videoSource}
              title={selectedTale.title}
              onClose={closeVideo}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F7F2",
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    backgroundColor: "#1A237E",
    padding: 24,
    paddingTop: 50,
    alignItems: "center",
  },
  title: {
    color: "#FBC02D",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    margin: 16,
    elevation: 2,
  },
  sectionTitle: {
    color: "#1A237E",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  proverb: {
    color: "#333",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  expression: {
    color: "#4A148C",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  translation: {
    color: "#1A237E",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 12,
  },
  explanation: {
    color: "#555",
    lineHeight: 22,
    fontSize: 14,
  },
  description: {
    color: "#555",
    lineHeight: 22,
    fontSize: 14,
    marginBottom: 16,
  },
  story: {
    color: "#555",
    lineHeight: 22,
    fontSize: 14,
  },
  taleCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  taleContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  taleInfo: {
    flex: 1,
    marginLeft: 12,
  },
  taleTitle: {
    color: "#1A237E",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  taleDescription: {
    color: "#555",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  taleDuration: {
    color: "#888",
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
