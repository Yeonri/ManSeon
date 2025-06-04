import { Alert } from "react-native";

function deleteAlert(name: string, onConfirm: () => void) {
  Alert.alert(`${name} 삭제`, `${name}을 삭제하시겠습니까?`, [
    { text: "취소", style: "cancel" },
    {
      text: "삭제",
      style: "destructive",
      onPress: onConfirm,
    },
  ]);
}

export default deleteAlert