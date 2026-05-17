import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

interface Particle {
    id: number;
    x: number;
    y: number;
    rotate: number;
    delay: number;
}

type ConfettiProps = {
    duration?: number;
    size?: number;
};

export function Confetti({ duration = 2000, size = 100 }: ConfettiProps) {
    const particles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        rotate: Math.random() * 360,
        delay: Math.random() * 200,
    }));

    return (
        <View style={[confettiStyles.container, { width: size, height: size }]}>
            {particles.map((particle) => (
                <ConfettiPiece
                    key={particle.id}
                    particle={particle}
                    duration={duration}
                    size={size}
                />
            ))}
        </View>
    );
}

function ConfettiPiece({
    particle,
    duration,
    size,
}: {
    particle: Particle;
    duration: number;
    size: number;
}) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(1);
    const rotate = useSharedValue(0);

    useEffect(() => {
        const delayedDuration = duration - particle.delay;

        translateX.value = withTiming(particle.x, {
            duration: delayedDuration,
            easing: (t: number) => t * (2 - t),
        });

        translateY.value = withTiming(particle.y * 2, {
            duration: delayedDuration,
            easing: (t: number) => t * t,
        });

        rotate.value = withTiming(particle.rotate + 360, {
            duration: delayedDuration,
        });

        opacity.value = withTiming(0, {
            duration: 300,
            easing: (t: number) => 1 - t,
        });

        return () => {
            cancelAnimation(translateX);
            cancelAnimation(translateY);
            cancelAnimation(opacity);
            cancelAnimation(rotate);
        };
    }, [duration, opacity, particle.delay, particle.rotate, particle.x, particle.y, rotate, translateX, translateY]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { rotateZ: `${rotate.value}deg` },
            ],
            opacity: opacity.value,
        };
    });

    const colors = ["#FFD54F", "#FBC02D", "#FF9800", "#2E7D32"];

    return (
        <Animated.View
            style={[
                confettiStyles.confettiPiece,
                animatedStyle,
                {
                    left: size / 2,
                    top: size / 2,
                },
            ]}
        >
            <View
                style={[
                    confettiStyles.piece,
                    {
                        backgroundColor: colors[particle.id % 4],
                    },
                ]}
            />
        </Animated.View>
    );
}

const confettiStyles = StyleSheet.create({
    container: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
    },
    confettiPiece: {
        position: "absolute",
        width: 0,
        height: 0,
    },
    piece: {
        width: 8,
        height: 8,
        borderRadius: 4,
        position: "absolute",
        left: -4,
        top: -4,
    },
});
