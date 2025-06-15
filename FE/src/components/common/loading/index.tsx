import { ActivityIndicator, Text, View } from "react-native";

function Loading() {
  return (
    <View className="justify-center items-center">
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text className="mt-4 text-lg font-bold text-neutral-600">
        로딩 중...
      </Text>
    </View>
  );
}

export default Loading;
