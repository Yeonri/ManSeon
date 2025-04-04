import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import fishesMocks from "../../../mocks/fishesMocks.json";
import { useState } from "react";

interface ProbabilityProps {
  onSelectedFishName: (name: string) => void;
}

export function Probability({ onSelectedFishName }: ProbabilityProps) {
  const sortedData = [...fishesMocks].sort(
    (a, b) => b.probability - a.probability
  );
  const [selected, setSelected] = useState<number | null>(null);

  function handleSelect(index: number) {
    setSelected(index);
    onSelectedFishName(sortedData[index].fishName);
  }

  return (
    <FlatList
      data={sortedData}
      keyExtractor={(item) => item.fishName}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => handleSelect(index)}>
          <View
            className={`w-[300px] m-1 flex-row items-center p-7 gap-3 rounded-xl ${index === 0 ? "bg-blue-100" : "bg-neutral-100"} ${selected === index ? "border-4 border-blue-500" : "border-none"}`}
          >
            <Image
              source={{ uri: item.fishImg }}
              className="w-24 h-24 rounded-full"
            />
            <View className="flex-1 gap-1">
              <View className="flex-row justify-between">
                <Text className="text-3xl font-bold">{item.fishName}</Text>
                <Text
                  className={`text-3xl font-bold ${index === 0 ? "text-blue-500" : "text-neutral-500"}`}
                >
                  {item.probability}%
                </Text>
              </View>
              <Text className="text-lg text-neutral-600">{item.character}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      horizontal
    />
  );
}
