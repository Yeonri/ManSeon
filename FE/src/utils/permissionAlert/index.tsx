import { Alert } from "react-native";
import { openSettings } from "react-native-permissions";

export function PermissionAlert(name: string) {
  Alert.alert(
    `${name} 권한이 필요합니다.`,
    "설정에서 위치 권한을 허용해주세요.",
    [
      { text: "취소", style: "cancel" },
      { text: "설정으로 이동", onPress: () => openSettings() },
    ]
  );
}
