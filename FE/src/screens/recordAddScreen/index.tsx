import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { Text } from "react-native";

export function RecordAddScreen() {
  return (
    <SafeAreaView>
      <HeaderLogo />
      <Text>여기서 잡은 물고기 정보 입력</Text>
    </SafeAreaView>
  );
}
