import { ChevronRight } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HomeStackParams } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

interface CommunityNavigationProps
  extends NativeStackNavigationProp<HomeStackParams> {}

export default function Community() {
  const navigation = useNavigation<CommunityNavigationProps>();

  // 임시 데이터
  const latestBoards = [
    {
      boardId: "1",
      boardImg:
        "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
    },
    {
      boardId: "2",
      boardImg:
        "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
    },
  ];

  return (
    <View className="p-5 border border-neutral-100 rounded-xl gap-3">
      <View className="flex-row justify-between">
        <Text className="text-neutral-600 font-bold">커뮤니티</Text>

        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => navigation.navigate("Community")}
        >
          <Text className="text-neutral-400 text-xs font-semibold -translate-y-[1px]">
            더 보기
          </Text>
          <ChevronRight color="#A3A3A3" width={18} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal className="mt-2">
        <View className="flex-row gap-x-3 px-1">
          {latestBoards.slice(0, 10).map((board) => (
            <Image
              key={board.boardId}
              source={{ uri: board.boardImg }}
              className="w-24 h-24 rounded-md"
            />
          ))}
        </View>
        <View className="flex-row gap-x-3 px-1" />
      </ScrollView>
    </View>
  );
}
