import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { ToggleButton } from "../../components/common/toggleButton";
import ruleFreashwaterList from "../../data/ruleFreashwaterList";
import ruleSeaList from "../../data/ruleSeaList";

export function RuleScreen() {
  const [selected, setSelected] = useState("바다");
  const selectList = selected === "바다" ? ruleSeaList : ruleFreashwaterList;

  return (
    <ScrollView className="bg-white">
      <View className="bg-white flex-1 px-4 pt-4">
        <ToggleButton
          option1="바다"
          option2="민물"
          selected={selected}
          onSelect={setSelected}
        />

        <View className="mt-6">
          {selectList.map((item) => (
            <View key={item.id} className="flex-row items-center p-4">
              <Image
                source={item.img}
                className="w-[100px] h-[100px] mr-4"
                resizeMode="contain"
              />
              <View className="flex-1">
                <Text className="text-lg font-bold mb-1">{item.name}</Text>
                <Text className="text-neutral-600 leading-relaxed text-sm">
                  길이: {item.length}
                  {item.info ? `\n${item.info}` : ""}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
