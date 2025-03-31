import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FishingStackParams } from "../../api/types/FishingStackParams";

interface FishingListScreenNavigationProps
  extends NativeStackNavigationProp<FishingStackParams, "FishingList"> {}

export function FishingListScreen() {
  const navigation = useNavigation<FishingListScreenNavigationProps>();

  return (
    <SafeAreaView>
      <HeaderBeforeTitle name="나의 낚시 기록" />
      <TouchableOpacity onPress={() => navigation.navigate("Fishing")}>
        <Text>상세기록[확인용 버튼]</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
