import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { lecons } from "../../src/data/lecons";

export default function CoursScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titre}>📚 Cours</Text>
        <Text style={styles.sousTitre}>Bambara — Niveau A1</Text>
      </View>

      {/* Liste des leçons */}
      <View style={styles.listeLecons}>
        {lecons.map((lecon) => (
          <TouchableOpacity
            key={lecon.id}
            style={styles.carteLecon}
            onPress={() => router.push(`/lecon?id=${lecon.id}`)}
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
        ))}
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
});
