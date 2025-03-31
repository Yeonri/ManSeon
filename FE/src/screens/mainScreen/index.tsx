import { Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocationPermission } from "../../hooks/useLocationPermission";
import { PermissionCheck } from "../../components/common/permissionCheck";

export function MainScreen() {
  const hasLocationPermission = useLocationPermission();

  if (hasLocationPermission === null) {
    return <PermissionCheck name="위치" />;
  }

  return (
    <SafeAreaView>
      <Text className="bg-blue-500">메인</Text>
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/88/75/dc/8875dcbcd3ffe823e095f06cc03f679d.jpg",
        }}
        className="w-96 h-96"
      />
    </SafeAreaView>
  );
}
