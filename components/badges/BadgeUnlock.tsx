import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
    FadeIn,
} from "react-native-reanimated";
import { Confetti } from "./Confetti";

export interface Badge {
    id: string;
    name: string;
    description: string;
    emoji: string;
    unlocked: boolean;
    unlockedAt?: number;
    progress?: number;
}

type BadgeUnlockProps = {
    badge: Badge;
    size?: "small" | "medium" | "large";
    showConfetti?: boolean;
};

export function BadgeUnlock({
    badge,
    size = "medium",
    showConfetti = true,
}: BadgeUnlockProps) {
    const isNew = badge.unlockedAt && Date.now() - badge.unlockedAt < 5000;

    const sizeConfig = {
        small: { container: 70, emoji: 24 },
        medium: { container: 100, emoji: 36 },
        large: { container: 140, emoji: 52 },
    };

    const config = sizeConfig[size];

    return (
        <View style={{ alignItems: "center" }}>
            <Animated.View
                style={[
                    badgeStyles.badgeContainer,
                    {
                        width: config.container,
                        height: config.container,
                    },
                    badge.unlocked ? badgeStyles.badgeUnlocked : badgeStyles.badgeLocked,
                ]}
                entering={FadeIn.duration(300)}
            >
                <Text style={{ fontSize: config.emoji }}>{badge.emoji}</Text>
                {!badge.unlocked && badge.progress && badge.progress > 0 && (
                    <View style={[badgeStyles.progressRing, { opacity: 0.6 }]}>
                        <Text style={badgeStyles.progressText}>{badge.progress}%</Text>
                    </View>
                )}
            </Animated.View>

            {isNew && showConfetti && (
                <Confetti size={config.container * 2} duration={2000} />
            )}

            <Animated.Text
                style={[
                    styles.badgeName,
                    {
                        fontSize: size === "small" ? 12 : size === "medium" ? 14 : 16,
                    },
                ]}
                entering={FadeIn.delay(100).duration(300)}
            >
                {badge.name}
            </Animated.Text>

            {size !== "small" && (
                <Animated.Text
                    style={[styles.badgeDescription]}
                    entering={FadeIn.delay(150).duration(300)}
                >
                    {badge.description}
                </Animated.Text>
            )}
        </View>
    );
}

const badgeStyles = StyleSheet.create({
    badgeContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    badgeUnlocked: {
        backgroundColor: "#FFD54F",
        borderWidth: 2,
        borderColor: "#FBC02D",
    },
    badgeLocked: {
        backgroundColor: "#E8E8E8",
        borderWidth: 1,
        borderColor: "#BDBDBD",
    },
    progressRing: {
        position: "absolute",
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(251, 192, 45, 0.8)",
        justifyContent: "center",
        alignItems: "center",
        bottom: -8,
        right: -8,
    },
    progressText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#fff",
    },
    badgeName: {
        fontWeight: "700",
        marginTop: 8,
        textAlign: "center",
        color: "#1A237E",
    },
    badgeDescription: {
        marginTop: 4,
        textAlign: "center",
        fontSize: 12,
        color: "#666",
    },
});

const styles = badgeStyles;
