import { Image, Text, View } from "react-native";
import FishingDonutChart from "../donutChart";

export default function Statistics() {
  // 임시 데이터
  const countingresult = {
    fishingList: [
      { name: "광어", count: 10 },
      { name: "고등어", count: 5 },
      { name: "감성돔", count: 3 },
      { name: "우럭", count: 2 },
      { name: "기타", count: 1 },
    ],
    totalCount: 21,
  };

  return (
    <View className="gap-3">
      <Text className="text-neutral-600 font-bold">내가 잡은 물고기</Text>
      {countingresult.totalCount === 0 ? (
        <View className="items-center justify-center gap-1">
          <Image
            source={require("../../../assets/images/chatbot2.png")}
            className="h-20 w-20"
            resizeMode="contain"
          />
          <Text className="text-sm text-neutral-400">
            아직 잡은 물고기가 없어요!
          </Text>
        </View>
      ) : (
        <FishingDonutChart
          fishingList={countingresult.fishingList}
          totalCount={countingresult.totalCount}
        />
      )}
    </View>
  );
}
