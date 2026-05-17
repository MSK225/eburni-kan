import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { EburniKanColors, EburniKanFonts } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: EburniKanColors.primary,
        tabBarInactiveTintColor: EburniKanColors.textMuted,
        tabBarStyle: {
          backgroundColor: EburniKanColors.background,
          borderTopColor: EburniKanColors.border,
        },
        tabBarLabelStyle: {
          fontFamily: EburniKanFonts.navigation,
          fontSize: 12,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="culture"
        options={{
          title: "Culture",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="person.crop.circle.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="cours"
        options={{
          title: "Cours",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="graduationcap.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: "Vidéos",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="play.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
