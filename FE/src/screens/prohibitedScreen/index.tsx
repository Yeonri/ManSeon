import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import prohibitedList from "../../data/prohibitedList";

export function ProhibitedScreen() {
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
      <HeaderBeforeTitle name="금어기" />
      <View className="self-center bg-blue-500 rounded-full w-60 h-10 mt-4 mb-6 items-center justify-center">
        <Text className="text-white font-bold text-base"> {month}월</Text>
      </View>
      {monthProhibitedList.map((item) => (
        <View
          key={item.id}
          className="flex-row items-center p-4 shadow-sm shadow-blue-300 mb-4"
        >
          <Image
            source={item.img}
            className="w-[100px] h-[100px] mr-4"
            resizeMode="contain"
          />
          <View className="flex-1">
            <Text className="text-lg font-bold mb-1">{item.name}</Text>
            {item.info ? (
              <Text className="text-neutral-600 leading-relaxed text-sm">
                기간 : {item.period}
                {"\n"}
                {item.info}
              </Text>
            ) : (
              <Text className="text-neutral-600 mb-1">
                기간 : {item.period}
              </Text>
            )}
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
}
