import { View, Text, FlatList, Pressable } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { useDepartmentsQuery } from "@/data/hooks/useDepartmentsQuery";
import { useMediaQuery } from "@/constants/useMediaQuery";

export default function TabOneScreen() {
  const query = useDepartmentsQuery();

  const { isLarge } = useMediaQuery();

  return (
    <View className="flex-1">
      <FlatList<{ department: string; imageUrl: string }>
        key={isLarge ? "large" : "small"}
        numColumns={isLarge ? 2 : 1}
        data={query.data}
        contentContainerClassName="mb-safe"
        keyExtractor={(item) => item.department}
        renderItem={({ item }) => (
          <Link asChild href={`/departments/${item.department}/`}>
            <Pressable className="sm:flex-1">
              <Image
                className="h-24 w-full sm:h-56"
                source={{
                  uri: item.imageUrl,
                }}
              />
              <Text className="absolute right-2 bottom-2 text-3xl text-white font-semibold text-right">
                {item.department}
              </Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
