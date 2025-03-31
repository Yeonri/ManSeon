import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";

export function FishingScreen() {
  return (
    <SafeAreaView>
      <HeaderBeforeTitle name="날짜" />
      <Text>임시</Text>
    </SafeAreaView>
  );
}
