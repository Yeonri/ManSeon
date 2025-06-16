import { useNavigation } from "@react-navigation/native";
import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HomeStackParams } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FishingPointCard from "../fishingPointCard";

interface RecommendFishingPointNavigationProps
  extends NativeStackNavigationProp<HomeStackParams> {}

export default function RecommendFishingPoint() {
  const navigation = useNavigation<RecommendFishingPointNavigationProps>();

  // 임시 데이터
  const todayFishingPoint = [
    {
      name: "제주 협재해수욕장",
      pointId: 11,
      latitude: 33.3943,
      longitude: 126.2396,
    },
    {
      name: "속초 대포항",
      pointId: 2,
      latitude: 38.1912,
      longitude: 128.5903,
    },
  ];

  return (
    <View className="p-5 border border-neutral-100 rounded-xl gap-3">
      <View className="flex-row justify-between">
        <Text className="text-neutral-600 font-bold">오늘의 추천 포인트</Text>

        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => navigation.navigate("Map")}
        >
          <Text className="text-neutral-400 text-xs font-semibold -translate-y-[1px]">
            더 보기
          </Text>
          <ChevronRight color="#A3A3A3" width={18} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal className="mt-2">
        <View className="flex-row gap-x-3 px-1">
          {todayFishingPoint.map((point) => (
            <FishingPointCard
              key={point.pointId}
              name={point.name}
              latitude={point.latitude}
              longitude={point.longitude}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
