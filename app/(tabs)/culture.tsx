import React, { useState, useCallback, useMemo } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { BodyText, MalinkeText, NavText } from "@/components/design-system";
import { EburniSection } from "@/components/layout";
import { DuotoneImage, PagneBackground } from "@/components/immersion";
import { CULTURE_GALLERY, DUOTONE_IMAGES, TALE_VIDEOS, TALE_THUMBNAILS } from "@/constants/media-assets";
import { EburniKanColors, EburniKanRadii, EburniKanSpacing } from "@/constants/theme";
import { VideoPlayer } from "../../components/ui/video-player";
import {
  getDailyExpression,
  getDailyProverb,
  tales,
} from "../../src/data/culture";

export default function CultureScreen() {
  const dailyProverb = getDailyProverb();
  const dailyExpression = getDailyExpression();
  const [selectedTale, setSelectedTale] = useState<(typeof tales)[0] | null>(null);
  const [selectedPronunciation, setSelectedPronunciation] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [currentVideoType, setCurrentVideoType] = useState<"tale" | "pronunciation" | "lesson">("tale");

  const pronunciationTutorials = useMemo(() => [
    { id: 1, title: "Les Voyelles Bambara", description: "Prononciation des 5 voyelles essentielles", duration: "4 min" },
    { id: 2, title: "Consonnes & Nasales", description: "Sons particuliers du bambara", duration: "5 min" },
    { id: 3, title: "L'Accent & l'Intonation", description: "Rythme naturel de la langue", duration: "5 min" },
  ], []);

  const lessonIntroVideos = useMemo(() => [
    { id: 1, title: "Alphabet Bambara", description: "Découvrez les bases du système alphabétique", duration: "5 min" },
    { id: 2, title: "Vocabulaire Fondamental", description: "Les mots essentiels pour communiquer", duration: "5 min" },
    { id: 3, title: "Grammaire Basique", description: "Structures grammaticales simples", duration: "6 min" },
  ], []);

  const playVideo = useCallback((tale: (typeof tales)[0]) => {
    setSelectedTale(tale);
    setCurrentVideoType("tale");
    setIsVideoModalVisible(true);
  }, []);

  const playPronunciation = useCallback((tutorial: any) => {
    setSelectedPronunciation(tutorial);
    setCurrentVideoType("pronunciation");
    setIsVideoModalVisible(true);
  }, []);

  const playLesson = useCallback((lesson: any) => {
    setSelectedLesson(lesson);
    setCurrentVideoType("lesson");
    setIsVideoModalVisible(true);
  }, []);

  const closeVideo = useCallback(() => {
    setIsVideoModalVisible(false);
    setSelectedTale(null);
    setSelectedPronunciation(null);
    setSelectedLesson(null);
  }, []);

  return (
    <PagneBackground>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.heroWrap}>
          <DuotoneImage source={DUOTONE_IMAGES.culture} style={styles.heroImage} />
          <View style={styles.heroOverlay}>
            <NavText style={styles.heroTitle}>Culture & Tradition</NavText>
            <BodyText size="sm" style={styles.heroSub}>
              Patrimoine du Nord de la Côte d&apos;Ivoire
            </BodyText>
          </View>
        </View>

        <EburniSection title="Proverbe du jour">
          <MalinkeText>&ldquo;{dailyProverb.malinke}&rdquo;</MalinkeText>
          <BodyText style={styles.translation}>{dailyProverb.francais}</BodyText>
          <BodyText size="sm" muted>
            {dailyProverb.explication}
          </BodyText>
        </EburniSection>

        <EburniSection title="Expression du jour">
          <MalinkeText>&ldquo;{dailyExpression.malinke}&rdquo;</MalinkeText>
          <BodyText style={styles.translation}>{dailyExpression.francais}</BodyText>
          <BodyText size="sm" muted>
            {dailyExpression.contexte}
          </BodyText>
        </EburniSection>

        <EburniSection title="Galerie du Nord">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CULTURE_GALLERY.map((img, i) => (
              <DuotoneImage key={i} source={img} style={styles.galleryItem} />
            ))}
          </ScrollView>
        </EburniSection>

        <EburniSection title="Contes traditionnels (vidéos)">
          <BodyText size="sm" muted style={styles.talesIntro}>
            Découvrez les contes qui transmettent la sagesse de génération en
            génération.
          </BodyText>
          {tales.map((tale) => (
            <TouchableOpacity
              key={tale.id}
              style={styles.taleCard}
              onPress={() => playVideo(tale)}
              accessibilityRole="button"
            >
              {tale.thumbnail ? (
                <DuotoneImage source={tale.thumbnail} style={styles.taleThumb} />
              ) : null}
              <View style={styles.taleInfo}>
                <NavText>{tale.title}</NavText>
                <BodyText size="sm" muted>
                  {tale.description}
                </BodyText>
                <BodyText size="sm" style={styles.taleDuration}>
                  ▶ {tale.duration}
                </BodyText>
              </View>
            </TouchableOpacity>
          ))}
        </EburniSection>

        <EburniSection title="🗣️ Tutoriels Prononciation">
          <BodyText size="sm" muted style={styles.talesIntro}>
            Perfectionnez votre accent et maîtrisez les sons du bambara.
          </BodyText>
          {pronunciationTutorials.map((tutorial, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.taleCard}
              onPress={() => playPronunciation(tutorial)}
              accessibilityRole="button"
            >
              <DuotoneImage
                source={TALE_THUMBNAILS[idx % TALE_THUMBNAILS.length]}
                style={styles.taleThumb}
              />
              <View style={styles.taleInfo}>
                <NavText>{tutorial.title}</NavText>
                <BodyText size="sm" muted>
                  {tutorial.description}
                </BodyText>
                <BodyText size="sm" style={styles.taleDuration}>
                  ▶ {tutorial.duration}
                </BodyText>
              </View>
            </TouchableOpacity>
          ))}
        </EburniSection>

        <EburniSection title="🎓 Introductions aux Leçons">
          <BodyText size="sm" muted style={styles.talesIntro}>
            Commencez chaque leçon par une vidéo d&apos;introduction.
          </BodyText>
          {lessonIntroVideos.map((lesson, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.taleCard}
              onPress={() => playLesson(lesson)}
              accessibilityRole="button"
            >
              <DuotoneImage
                source={TALE_THUMBNAILS[(idx + 2) % TALE_THUMBNAILS.length]}
                style={styles.taleThumb}
              />
              <View style={styles.taleInfo}>
                <NavText>{lesson.title}</NavText>
                <BodyText size="sm" muted>
                  {lesson.description}
                </BodyText>
                <BodyText size="sm" style={styles.taleDuration}>
                  ▶ {lesson.duration}
                </BodyText>
              </View>
            </TouchableOpacity>
          ))}
        </EburniSection>

        <EburniSection title="À propos">
          <BodyText>
            La culture bambara est riche en traditions orales, musique, danse et
            artisanat. Les contes, proverbes et expressions sont des outils
            essentiels pour transmettre les valeurs sociales, morales et
            spirituelles du peuple mandingue.
          </BodyText>
        </EburniSection>
      </ScrollView>

      <Modal
        visible={isVideoModalVisible}
        animationType="slide"
        onRequestClose={closeVideo}
      >
        <View style={styles.modalContainer}>
          {currentVideoType === "tale" && selectedTale ? (
            <VideoPlayer
              source={selectedTale.videoSource}
              title={selectedTale.title}
              onClose={closeVideo}
            />
          ) : currentVideoType === "pronunciation" && selectedPronunciation ? (
            <VideoPlayer
              source={TALE_VIDEOS[selectedPronunciation.id - 1]}
              title={selectedPronunciation.title}
              onClose={closeVideo}
            />
          ) : currentVideoType === "lesson" && selectedLesson ? (
            <VideoPlayer
              source={TALE_VIDEOS[selectedLesson.id - 1]}
              title={selectedLesson.title}
              onClose={closeVideo}
            />
          ) : null}
        </View>
      </Modal>
    </PagneBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: EburniKanSpacing.xl,
  },
  heroWrap: {
    margin: EburniKanSpacing.md,
    borderRadius: EburniKanRadii.lg,
    overflow: "hidden",
    height: 160,
  },
  heroImage: {
    height: 160,
    borderRadius: EburniKanRadii.lg,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: EburniKanSpacing.md,
    backgroundColor: "rgba(26, 35, 126, 0.35)",
  },
  heroTitle: {
    color: EburniKanColors.accent,
  },
  heroSub: {
    color: EburniKanColors.onPrimary,
    marginTop: EburniKanSpacing.xs,
  },
  translation: {
    color: EburniKanColors.primary,
    fontStyle: "italic",
    marginVertical: EburniKanSpacing.sm,
  },
  galleryItem: {
    width: 140,
    height: 100,
    borderRadius: EburniKanRadii.sm,
    marginRight: EburniKanSpacing.sm,
  },
  talesIntro: {
    marginBottom: EburniKanSpacing.md,
  },
  taleCard: {
    flexDirection: "row",
    backgroundColor: EburniKanColors.background,
    borderRadius: EburniKanRadii.md,
    marginBottom: EburniKanSpacing.sm,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: EburniKanColors.border,
  },
  taleThumb: {
    width: 100,
    height: 100,
  },
  taleInfo: {
    flex: 1,
    padding: EburniKanSpacing.sm,
    justifyContent: "center",
  },
  taleDuration: {
    color: EburniKanColors.primary,
    marginTop: EburniKanSpacing.xs,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
});
