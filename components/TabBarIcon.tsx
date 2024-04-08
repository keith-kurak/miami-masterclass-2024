import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: {
  name:
    | React.ComponentProps<typeof FontAwesome>["name"]
    | React.ComponentProps<typeof MaterialIcons>["name"];
  type?: "FontAwesome" | "MaterialIcons";
  color?: string;
}) {
  const IconComponent =
    props.type === "MaterialIcons" ? MaterialIcons : FontAwesome;
    const myColor = props.color || "black";
  // @ts-ignore
  return <IconComponent size={28} style={{ marginBottom: -3 }} {...props} color={myColor} />;
}