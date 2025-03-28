import { Alert } from "react-native";

export function DeleteAlert(name: string) {
  Alert.alert(`${name} 삭제`, `${name}을 삭제하시겠습니까?`, [
    { text: "아니오", onPress: () => {} },
    { text: "네", onPress: () => {} },
  ]);
}
