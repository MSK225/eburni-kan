import React, { useState, useMemo } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { BodyText, NavText } from "@/components/design-system";
import { EburniSection } from "@/components/layout";
import { TALE_VIDEOS, TALE_THUMBNAILS } from "@/constants/media-assets";
import { EburniKanColors, EburniKanRadii, EburniKanSpacing } from "@/constants/theme";
import { VideoPlayer } from "@/components/ui/video-player";
import { DuotoneImage, PagneBackground } from "@/components/immersion";

interface VideoCategory {
    id: string;
    title: string;
    icon: string;
    description: string;
    videos: {
        id: number;
        title: string;
        description: string;
        source: any;
        thumbnail: any;
        duration: string;
    }[];
}

// Déplacer la définition en dehors du component pour éviter les re-renders inutiles
const createVideoCategories = (): VideoCategory[] => [
    {
        id: "contes",
        title: "🎬 Contes Traditionnels",
        icon: "📖",
        description: "Histoires de sagesse du Nord de la Côte d'Ivoire",
        videos: [
            {
                id: 1,
                title: "Conte traditionnel I",
                description: "Sagesse et transmission",
                source: TALE_VIDEOS[0],
                thumbnail: TALE_THUMBNAILS[0],
                duration: "5 min",
            },
            {
                id: 2,
                title: "Conte traditionnel II",
                description: "Valeurs communautaires",
                source: TALE_VIDEOS[1],
                thumbnail: TALE_THUMBNAILS[1],
                duration: "7 min",
            },
            {
                id: 3,
                title: "Conte traditionnel III",
                description: "Intelligence et patience",
                source: TALE_VIDEOS[2],
                thumbnail: TALE_THUMBNAILS[2],
                duration: "6 min",
            },
            {
                id: 4,
                title: "Conte traditionnel IV",
                description: "Patrimoine oral mandingue",
                source: TALE_VIDEOS[3],
                thumbnail: TALE_THUMBNAILS[3],
                duration: "8 min",
            },
            {
                id: 5,
                title: "Conte traditionnel V",
                description: "Leçons de vie ancestrales",
                source: TALE_VIDEOS[4],
                thumbnail: TALE_THUMBNAILS[4],
                duration: "7 min",
            },
        ],
    },
    {
        id: "intro",
        title: "🎓 Introductions aux Leçons",
        icon: "🎥",
        description: "Vidéos de présentation pour chaque module",
        videos: [
            {
                id: 1,
                title: "Alphabet Bambara — Introduction",
                description: "Découvrez les bases du système alphabétique",
                source: TALE_VIDEOS[0],
                thumbnail: TALE_THUMBNAILS[0],
                duration: "5 min",
            },
            {
                id: 2,
                title: "Vocabulaire Fondamental",
                description: "Les mots essentiels pour communiquer",
                source: TALE_VIDEOS[1],
                thumbnail: TALE_THUMBNAILS[1],
                duration: "5 min",
            },
            {
                id: 3,
                title: "Grammaire Basique",
                description: "Structures grammaticales simples",
                source: TALE_VIDEOS[2],
                thumbnail: TALE_THUMBNAILS[2],
                duration: "6 min",
            },
            {
                id: 4,
                title: "Prononciation Correcte",
                description: "Maîtrisez les sons du bambara",
                source: TALE_VIDEOS[3],
                thumbnail: TALE_THUMBNAILS[3],
                duration: "5 min",
            },
            {
                id: 5,
                title: "Culture & Expressions",
                description: "Comprendre le contexte culturel",
                source: TALE_VIDEOS[4],
                thumbnail: TALE_THUMBNAILS[4],
                duration: "7 min",
            },
        ],
    },
    {
        id: "prononciation",
        title: "🗣️ Tutoriels Prononciation",
        icon: "🎤",
        description: "Perfectionnez votre accent bambara",
        videos: [
            {
                id: 1,
                title: "Les Voyelles Bambara",
                description: "Prononciation des 5 voyelles essentielles",
                source: TALE_VIDEOS[0],
                thumbnail: TALE_THUMBNAILS[0],
                duration: "4 min",
            },
            {
                id: 2,
                title: "Consonnes & Nasales",
                description: "Sons particuliers du bambara",
                source: TALE_VIDEOS[1],
                thumbnail: TALE_THUMBNAILS[1],
                duration: "5 min",
            },
            {
                id: 3,
                title: "L'Accent & l'Intonation",
                description: "Rythme naturel de la langue",
                source: TALE_VIDEOS[2],
                thumbnail: TALE_THUMBNAILS[2],
                duration: "5 min",
            },
            {
                id: 4,
                title: "Phrases Courantes",
                description: "Saluations & formules polies",
                source: TALE_VIDEOS[3],
                thumbnail: TALE_THUMBNAILS[3],
                duration: "6 min",
            },
            {
                id: 5,
                title: "Dialogue Naturel",
                description: "Conversations du quotidien",
                source: TALE_VIDEOS[4],
                thumbnail: TALE_THUMBNAILS[4],
                duration: "7 min",
            },
        ],
    },
];

export default function VideosScreen() {
    const [selectedVideo, setSelectedVideo] = useState<any>(null);
    const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);

    // Utiliser useMemo pour mémoriser les catégories
    const videoCategories = useMemo(() => createVideoCategories(), []);

    const playVideo = (video: any) => {
        setSelectedVideo(video);
        setIsVideoModalVisible(true);
    };

    const closeVideo = () => {
        setIsVideoModalVisible(false);
        setSelectedVideo(null);
    };

    return (
        <PagneBackground>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <NavText style={styles.headerTitle}>📹 Vidéothèque</NavText>
                    <BodyText size="sm" style={styles.headerSub}>
                        Apprentissage par la vidéo
                    </BodyText>
                </View>

                {videoCategories.map((category) => (
                    <EburniSection key={category.id} title={category.title}>
                        <BodyText size="sm" muted style={styles.categoryDesc}>
                            {category.description}
                        </BodyText>

                        {category.videos.map((video) => (
                            <TouchableOpacity
                                key={`${category.id}-${video.id}`}
                                style={styles.videoCard}
                                onPress={() => playVideo(video)}
                                accessibilityRole="button"
                            >
                                {video.thumbnail && (
                                    <View style={styles.thumbnailWrap}>
                                        <DuotoneImage
                                            source={video.thumbnail}
                                            style={styles.videoThumbnail}
                                        />
                                        <View style={styles.playIcon}>
                                            <NavText style={styles.playText}>▶</NavText>
                                        </View>
                                    </View>
                                )}
                                <View style={styles.videoInfo}>
                                    <NavText style={styles.videoTitle}>{video.title}</NavText>
                                    <BodyText size="sm" muted style={styles.videoDesc}>
                                        {video.description}
                                    </BodyText>
                                    <BodyText size="sm" style={styles.videoDuration}>
                                        ⏱ {video.duration}
                                    </BodyText>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </EburniSection>
                ))}

                <View style={styles.footer}>
                    <BodyText size="sm" style={styles.footerText}>
                        💡 Astuce : Regardez les introductions avant de commencer chaque leçon
                        pour une meilleure compréhension !
                    </BodyText>
                </View>
            </ScrollView>

            {/* Modal lecteur vidéo */}
            <Modal
                visible={isVideoModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeVideo}
            >
                <View style={styles.modalOverlay}>
                    <TouchableOpacity style={styles.closeArea} onPress={closeVideo} />
                    <View style={styles.modalContent}>
                        {selectedVideo && (
                            <>
                                <VideoPlayer
                                    source={selectedVideo.source}
                                    title={selectedVideo.title}
                                    onClose={closeVideo}
                                />
                                <View style={styles.videoDetails}>
                                    <NavText style={styles.modalTitle}>
                                        {selectedVideo.title}
                                    </NavText>
                                    <BodyText size="sm" style={styles.modalDesc}>
                                        {selectedVideo.description}
                                    </BodyText>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </PagneBackground>
    );
}

const styles = StyleSheet.create({
    scroll: { flex: 1 },
    content: { paddingBottom: EburniKanSpacing.xl },
    header: {
        backgroundColor: EburniKanColors.primary,
        paddingTop: 50,
        padding: EburniKanSpacing.lg,
        alignItems: "center",
    },
    headerTitle: {
        color: EburniKanColors.accent,
        fontSize: 28,
        fontWeight: "bold",
    },
    headerSub: {
        color: EburniKanColors.onPrimary,
        marginTop: EburniKanSpacing.xs,
    },
    categoryDesc: {
        marginBottom: EburniKanSpacing.md,
        fontStyle: "italic",
        color: EburniKanColors.primary,
    },
    videoCard: {
        backgroundColor: EburniKanColors.background,
        borderRadius: EburniKanRadii.md,
        marginBottom: EburniKanSpacing.md,
        borderLeftWidth: 4,
        borderLeftColor: EburniKanColors.accent,
        overflow: "hidden",
    },
    thumbnailWrap: {
        position: "relative",
        width: "100%",
        height: 150,
    },
    videoThumbnail: {
        width: "100%",
        height: "100%",
    },
    playIcon: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -20 }, { translateY: -20 }],
        width: 40,
        height: 40,
        backgroundColor: "rgba(31, 38, 126, 0.9)",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    playText: {
        color: EburniKanColors.accent,
        fontSize: 20,
    },
    videoInfo: {
        padding: EburniKanSpacing.md,
    },
    videoTitle: {
        marginBottom: EburniKanSpacing.xs,
    },
    videoDesc: {
        marginBottom: EburniKanSpacing.xs,
    },
    videoDuration: {
        color: EburniKanColors.accent,
    },
    footer: {
        backgroundColor: EburniKanColors.secondary,
        padding: EburniKanSpacing.md,
        borderRadius: EburniKanRadii.md,
        marginHorizontal: EburniKanSpacing.md,
        marginBottom: EburniKanSpacing.xl,
    },
    footerText: {
        color: EburniKanColors.primary,
        textAlign: "center",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(26, 35, 126, 0.95)",
        justifyContent: "center",
        alignItems: "center",
    },
    closeArea: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalContent: {
        width: "90%",
        backgroundColor: EburniKanColors.background,
        borderRadius: EburniKanRadii.lg,
        overflow: "hidden",
    },
    fullscreenVideo: {
        width: "100%",
        height: 220,
    },
    videoDetails: {
        padding: EburniKanSpacing.md,
    },
    modalTitle: {
        marginBottom: EburniKanSpacing.sm,
        color: EburniKanColors.primary,
    },
    modalDesc: {
        color: EburniKanColors.primary,
    },
});
