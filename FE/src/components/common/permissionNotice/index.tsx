import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBeforeLogo } from "../headerBeforeLogo";
import { Text, View } from "react-native";

export function PermissionNotice({ name }: { name: string }) {
  return (
    <SafeAreaView className="flex-1">
      <HeaderBeforeLogo />
      <View className="flex-1 justify-center items-center">
        <View className="bg-neutral-100 p-5 rounded-xl">
          <Text className="text-2xl text-center mb-2">⚠️</Text>
          <Text className="text-lg text-center font-bold">
            {name} 권한이 필요합니다.
          </Text>
          <Text className="text-lg text-center font-bold">
            설정에서 허용해 주세요.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
