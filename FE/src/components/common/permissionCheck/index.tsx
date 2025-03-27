import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBeforeLogo } from "../headerBeforeLogo";
import { ActivityIndicator, Text, View } from "react-native";

export function PermissionCheck({ name }: { name: string }) {
  return (
    <SafeAreaView className="flex-1">
      <HeaderBeforeLogo />
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-lg font-bold">{name} 권한 확인 중...</Text>
      </View>
    </SafeAreaView>
  );
}
