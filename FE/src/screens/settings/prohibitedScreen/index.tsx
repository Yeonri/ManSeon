import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";
import prohibitedList from "../../../data/prohibitedList";

export default function ProhibitedScreen() {
  const date = new Date();
  const month = date.getMonth() + 1;

  const monthProhibitedList = prohibitedList.filter((fish) => {
    if (fish.start <= fish.end) {
      return month >= fish.start && month <= fish.end;
    } else {
      return month >= fish.start || month <= fish.end;
    }
  });

  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={false} title="금어기" before={true} />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <View className="mx-5 gap-5">
          <Text className="px-8 py-2 self-center bg-blue-500 rounded-full text-white font-bold">
            {month}월
          </Text>
          {monthProhibitedList.map((item) => (
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
                {item.info ? (
                  <Text className="text-neutral-600 text-sm">
                    기간 : {item.period}
                    {"\n"}
                    {item.info}
                  </Text>
                ) : (
                  <Text className="text-neutral-600 text-sm">
                    기간 : {item.period}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
