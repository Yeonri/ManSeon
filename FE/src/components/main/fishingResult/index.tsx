import { Text, TouchableOpacity, View } from "react-native";

interface FishingResultItem {
  name: string;
  count: number;
}

interface FishingResultProps {
  fishingResultList: FishingResultItem[] | undefined;
  totalCount: number;
}

export function FishingResult({ fishingResultList }: FishingResultProps) {
  if (!fishingResultList || fishingResultList.length === 0) {
    return <Text>데이터가 없습니다.</Text>;
  }

  const sortedList = [...fishingResultList].sort((a, b) => b.count - a.count);
  const top3 = sortedList.slice(0, 4);

  return (
    <View className="flex gap-3">
      {/* 1위*/}
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          className="bg-blue-500 border border-blue-500 px-3 py-0.5 rounded-xl"
          disabled
        >
          <Text className="text-white text-base font-medium"> 1위</Text>
        </TouchableOpacity>
        <View className="flex-row items-center gap-1">
          <Text className="text-blue-500 font-medium text-lg">
            {top3[0].name}
          </Text>
          <Text className="text-blue-500"> {top3[0].count}마리</Text>
        </View>
      </View>

      {/*2위*/}
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          className="border border-blue-500 px-3 py-0.5 rounded-xl"
          disabled
        >
          <Text className=" text-base font-medium text-blue-500"> 2위</Text>
        </TouchableOpacity>
        <View className="flex-row items-center gap-1">
          <Text className="text-neutral-600 font-medium text-lg">
            {top3[1].name}
          </Text>
          <Text className="text-neutral-400"> {top3[1].count}마리</Text>
        </View>
      </View>

      {/*3위*/}
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          className="border border-blue-500 px-3 py-0.5 rounded-xl"
          disabled
        >
          <Text className=" text-base font-medium text-blue-500"> 3위</Text>
        </TouchableOpacity>
        <View className="flex-row items-center gap-1">
          <Text className="text-neutral-600 font-medium text-lg">
            {top3[2].name}
          </Text>
          <Text className="text-neutral-400"> {top3[2].count}마리</Text>
        </View>
      </View>
    </View>
  );
}
