import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../../src/context/AuthContext";
import { useProgress } from "../../src/context/ProgressContext";
import { getEarnedBadges, getNextBadge } from "../../src/data/badges";

export default function ProfilScreen() {
  const { progress, difficulty } = useProgress();
  const { user, logout, deleteAccount } = useAuth();
  const accuracy = progress.quizTotal
    ? Math.round((progress.quizCorrect / progress.quizTotal) * 100)
    : 0;

  const earnedBadges = getEarnedBadges(progress, difficulty);
  const nextBadge = getNextBadge(progress, difficulty);

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            Alert.alert("Erreur", "Impossible de se déconnecter");
          }
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Supprimer le compte",
      "⚠️ ATTENTION : Cette action est IRRÉVERSIBLE !\n\nTous vos progrès, badges et données seront supprimés définitivement.\n\nÊtes-vous absolument sûr ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer définitivement",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccount();
              Alert.alert(
                "Compte supprimé",
                "Votre compte a été supprimé avec succès.",
              );
            } catch (error: any) {
              Alert.alert(
                "Erreur",
                error.message || "Impossible de supprimer le compte",
              );
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <IconSymbol name="person.crop.circle.fill" size={48} color="#FBC02D" />
        <Text style={styles.title}>Profil</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Statut d'apprentissage</Text>
        <View style={styles.row}>
          <Text style={styles.metricLabel}>Leçons terminées</Text>
          <Text style={styles.metricValue}>
            {progress.completedLessons.length}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.metricLabel}>Questions répondues</Text>
          <Text style={styles.metricValue}>{progress.quizTotal}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.metricLabel}>Précision quiz</Text>
          <Text style={styles.metricValue}>{accuracy}%</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.metricLabel}>Niveau actuel</Text>
          <Text style={styles.metricValue}>{difficulty}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Badges obtenus ({earnedBadges.length})
        </Text>
        {earnedBadges.length > 0 ? (
          <View style={styles.badgesContainer}>
            {earnedBadges.map((badge) => (
              <View
                key={badge.id}
                style={[styles.badgeCard, { borderColor: badge.color }]}
              >
                <IconSymbol name={badge.icon} size={24} color={badge.color} />
                <Text style={[styles.badgeName, { color: badge.color }]}>
                  {badge.name}
                </Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noBadgesText}>
            Aucun badge obtenu pour le moment. Continuez à apprendre !
          </Text>
        )}
      </View>

      {nextBadge && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Prochain badge</Text>
          <View
            style={[
              styles.badgeCard,
              { borderColor: nextBadge.color, opacity: 0.7 },
            ]}
          >
            <IconSymbol
              name={nextBadge.icon}
              size={24}
              color={nextBadge.color}
            />
            <Text style={[styles.badgeName, { color: nextBadge.color }]}>
              {nextBadge.name}
            </Text>
            <Text style={styles.badgeDescription}>{nextBadge.description}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <IconSymbol name="arrow.right.square" size={20} color="#fff" />
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAccount}
      >
        <IconSymbol name="trash.fill" size={20} color="#fff" />
        <Text style={styles.deleteText}>Supprimer mon compte</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Conseils</Text>
        <Text style={styles.text}>
          Continue à apprendre une leçon à la fois, fais les quiz, et relis
          régulièrement les expressions les plus utiles.
        </Text>
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    margin: 16,
    elevation: 2,
  },
  cardTitle: {
    color: "#1A237E",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  metricLabel: {
    color: "#555",
    fontSize: 14,
  },
  metricValue: {
    color: "#1A237E",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    color: "#555",
    fontSize: 14,
    lineHeight: 22,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  badgeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    minWidth: 100,
    borderWidth: 2,
    elevation: 2,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
  },
  badgeDescription: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    marginTop: 2,
    lineHeight: 14,
  },
  noBadgesText: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    gap: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#8B0000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
