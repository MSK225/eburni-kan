import { ResizeMode, Video } from "expo-av";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { WebView } from "react-native-webview";
import { IconSymbol } from "./icon-symbol";

const { width } = Dimensions.get("window");

interface VideoPlayerProps {
  source: any; // Peut être une URI locale ou distante
  title?: string;
  onClose?: () => void;
}

export function VideoPlayer({ source, title, onClose }: VideoPlayerProps) {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  const [isPlaying, setIsPlaying] = useState(false);

  // Détecter si c'est une URL YouTube
  const isYouTubeUrl =
    typeof source === "string" &&
    (source.includes("youtube.com") || source.includes("youtu.be"));

  // Convertir les URLs YouTube en URLs embed
  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const togglePlayback = async () => {
    if (!isYouTubeUrl && videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const handlePlaybackStatusUpdate = (status: any) => {
    setStatus(status);
    setIsPlaying(status.isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Pour les vidéos YouTube, utiliser WebView
  if (isYouTubeUrl) {
    const embedUrl = getYouTubeEmbedUrl(source);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {onClose && (
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <IconSymbol name="chevron.right" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <WebView
          style={styles.webView}
          source={{ uri: embedUrl }}
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView error: ", nativeEvent);
          }}
        />

        <View style={styles.youtubeControls}>
          <Text style={styles.youtubeNote}>
            Vidéo YouTube - Utilisez les contrôles intégrés
          </Text>
        </View>
      </View>
    );
  }

  // Pour les vidéos locales/distantes normales, utiliser le composant Video
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {title && <Text style={styles.title}>{title}</Text>}
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <IconSymbol name="chevron.right" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <Video
        ref={videoRef}
        style={styles.video}
        source={source}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onLoad={() => console.log("Video loaded")}
        onError={(error) => console.log("Video error:", error)}
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
          <IconSymbol
            name={isPlaying ? "pause.circle.fill" : "play.circle.fill"}
            size={48}
            color="#FBC02D"
          />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>
            {formatTime(status.positionMillis / 1000 || 0)}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: status.durationMillis
                    ? `${(status.positionMillis / status.durationMillis) * 100}%`
                    : "0%",
                },
              ]}
            />
          </View>
          <Text style={styles.timeText}>
            {formatTime(status.durationMillis / 1000 || 0)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    borderRadius: 12,
    overflow: "hidden",
    margin: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1A237E",
  },
  title: {
    color: "#FBC02D",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  video: {
    width: width - 32,
    height: (width - 32) * 0.5625, // Ratio 16:9
  },
  controls: {
    padding: 16,
    backgroundColor: "#1A237E",
  },
  playButton: {
    alignSelf: "center",
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeText: {
    color: "#FBC02D",
    fontSize: 12,
    minWidth: 35,
    textAlign: "center",
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FBC02D",
    borderRadius: 2,
  },
  webView: {
    width: width - 32,
    height: (width - 32) * 0.5625, // Ratio 16:9
  },
  youtubeControls: {
    padding: 16,
    backgroundColor: "#1A237E",
    alignItems: "center",
  },
  youtubeNote: {
    color: "#FBC02D",
    fontSize: 12,
    textAlign: "center",
  },
});
