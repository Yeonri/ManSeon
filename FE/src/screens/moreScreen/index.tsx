import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MoreStackParams } from "../../api/types/moreStackParams";
import { HeaderLogo } from "../../components/common/headerLogo";

interface MoreScreenNavigationProps
  extends NativeStackNavigationProp<MoreStackParams, "More"> {}

export function MoreScreen() {
  const navigation = useNavigation<MoreScreenNavigationProps>();

  return (
    <SafeAreaView>
      <HeaderLogo />
      <View className="gap-2">
        <View className="flex-row gap-2 justify-center">
          <TouchableOpacity onPress={() => navigation.navigate("Myposts")}>
            <Text className="p-5 bg-blue-50 text-blue-600 text-center text-xl">
              내 게시글
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Prohibited")}>
            <Text className="p-5 bg-blue-50 text-blue-600 text-center text-xl">
              금어기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Rule")}>
            <Text className="p-5 bg-blue-50 text-blue-600 text-center text-xl">
              방생기준
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Tutorial")}>
            <Text className="p-5 bg-blue-50 text-blue-600 text-center text-xl">
              튜토리얼
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-2 justify-center">
          <TouchableOpacity onPress={() => navigation.navigate("FishingList")}>
            <Text className="p-5 bg-blue-50 text-blue-600 text-center text-xl">
              낚시 기록
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("CollectionList")}
          >
            <Text className="p-5 px-10 bg-blue-50 text-blue-600 text-center text-xl">
              도감
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
