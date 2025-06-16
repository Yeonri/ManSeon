import { Image, Text, View } from "react-native";

interface FishingFishList {
  name: string;
  image_url: string;
  count: number;
}

interface FishingFishListProps {
  data: FishingFishList[];
}
export default function FishingFishList({ data }: FishingFishListProps) {
  return (
    <View className="flex-row flex-wrap mt-2">
      {data.map((fish, index) => (
        <View key={index} className="items-center w-[30%] my-2">
          <View className="w-24 h-24 rounded-full bg-blue-50 justify-center items-center mb-1">
            <Image
              source={{ uri: fish.image_url }}
              className="w-24 h-24 bg-white rounded-full"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-semibold text-neutral-800">
            {fish.name}
          </Text>
          <Text className="text-xs text-neutral-500">{fish.count}마리</Text>
        </View>
      ))}
    </View>
  );
}
