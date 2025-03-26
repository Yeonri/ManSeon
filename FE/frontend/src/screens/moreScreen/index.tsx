import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MoreStackParams } from "../../api/types/moreStackParams";

interface MoreScreenNavigationProps
  extends NativeStackNavigationProp<MoreStackParams, "More"> {}

export function MoreScreen() {
  const navigation = useNavigation<MoreScreenNavigationProps>();

  return (
    <SafeAreaView className="gap-2">
      <TouchableOpacity onPress={() => navigation.navigate("Tutorial")}>
        <Text className="bg-blue-500 text-white text-center text-xl">
          튜토리얼
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Prohibited")}>
        <Text className="bg-blue-500 text-white text-center text-xl">
          금어기
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Rule")}>
        <Text className="bg-blue-500 text-white text-center text-xl">
          방생기준
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
