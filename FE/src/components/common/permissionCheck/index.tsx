import { ActivityIndicator, Text, View } from "react-native";

function PermissionCheck({ name }: { name: string }) {
  return (
    <View className="justify-center items-center">
      <ActivityIndicator size="large" />
      <Text className="mt-2 text-lg font-bold">{name} 권한 확인 중...</Text>
    </View>
  );
}

export default PermissionCheck;
