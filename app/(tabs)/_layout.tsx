import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import customColors from "@/constants/colors";
import { useMediaQuery } from "@/constants/useMediaQuery";
import { TabBarIcon } from "@/components/TabBarIcon";

export default function TabLayout() {
  const { isLarge } = useMediaQuery();

  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        lazy: false,
        tabBarStyle: {
          display: isLarge ? "none" : "flex",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Exhibits",
          tabBarActiveTintColor: customColors.tint,
          tabBarIcon: ({ color }) => (
            <TabBarIcon type="MaterialIcons" name="museum" color={color} />
          ),
          headerRight: () => (
            <Link className="sm:hidden" href="/visit" asChild>
              <Pressable>
                {({ pressed }: { pressed: boolean }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={customColors.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <TabBarIcon type="FontAwesome" name="star" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
