import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBeforeLogo } from "../headerBeforeLogo";

export function Loading({ name }: { name: string }) {
  return (
    <SafeAreaView className="flex-1">
      <HeaderBeforeLogo />
      <View className="flex-1 justify-center items-center">
        <Text className="mt-2 text-lg font-bold">{name} 로딩 중...</Text>
      </View>
    </SafeAreaView>
  );
}
