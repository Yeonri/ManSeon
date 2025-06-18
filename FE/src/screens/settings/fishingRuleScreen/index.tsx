import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";
import { useState } from "react";
import ruleSeaList from "../../../data/ruleSeaList";
import ruleFreashwaterList from "../../../data/ruleFreashwaterList";
import ToggleButton from "../../../components/common/toggleButton";

export default function FishingRuleScreen() {
  const [selected, setSelected] = useState("바다");
  const selectList = selected === "바다" ? ruleSeaList : ruleFreashwaterList;

  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={false} title="방생 기준" before={true} />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <View className="bg-white flex-1 px-4 pt-4">
          <ToggleButton
            option1="바다"
            option2="민물"
            selected={selected}
            onSelect={setSelected}
          />

          <View className="mt-6">
            {selectList.map((item) => (
              <View key={item.id} className="p-3 flex-row items-center gap-5">
                <Image
                  source={item.img}
                  className="w-20 h-20"
                  resizeMode="contain"
                />
                <View className="gap-1">
                  <Text className="text-neutral-800 text-lg font-bold">
                    {item.name}
                  </Text>
                  <Text className="text-neutral-600 text-sm">
                    길이: {item.length}
                    {item.info ? `\n${item.info}` : ""}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
