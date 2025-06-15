import { Text, View } from "react-native";

function PermissionNotice({ name }: { name: string }) {
  return (
    <View className="justify-center items-center">
      <View className="bg-neutral-100 p-5 rounded-xl">
        <Text className="text-neutral-800 text-center mb-2">⚠️</Text>
        <View className="flex-row justify-center">
          <Text className="text-blue-500 text-sm text-center font-bold">
            {name}{" "}
          </Text>
          <Text className="text-neutral-800 text-sm text-center font-bold">
            권한이 필요합니다.
          </Text>
        </View>

        <Text className="text-neutral-800 text-sm text-center font-bold">
          [설정]에서 권한을 허용해주세요.
        </Text>
      </View>
    </View>
  );
}

export default PermissionNotice;
