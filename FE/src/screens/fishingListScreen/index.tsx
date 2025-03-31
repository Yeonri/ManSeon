import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import { Image, SectionList, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FishingStackParams } from "../../api/types/FishingStackParams";
import fishingListRecordMocks from "../../mocks/fishingRecordListMocks.json";

interface FishingListScreenNavigationProps
  extends NativeStackNavigationProp<FishingStackParams, "FishingList"> {}

function groupItems<T>(items: T[], count: number): T[][] {
  // 타입 임시(T) => 수정 필요
  const grouped = [];
  for (let i = 0; i < items.length; i += count) {
    grouped.push(items.slice(i, i + count));
  }
  return grouped;
}

export function FishingListScreen() {
  const navigation = useNavigation<FishingListScreenNavigationProps>();

  function handleDetailClick(fishId: number) {
    navigation.navigate("Fishing", { fishId });
  }

  const formattedSections = fishingListRecordMocks.map((section) => ({
    title: section.title,
    data: groupItems(section.data, 3),
  }));

  return (
    <SafeAreaView className="mx-5">
      <HeaderBeforeTitle name="나의 낚시 기록" />
      <SectionList
        sections={formattedSections}
        keyExtractor={(item, index) => `row-${index}`}
        renderItem={({ item }) => (
          <View className="flex-row justify-between mb-3">
            {item.map((fish, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleDetailClick(fish.fishId)}
                className="w-[30%] p-2 bg-blue-100 rounded-lg"
              >
                <Image
                  source={{ uri: fish.fishImg }}
                  className="w-full h-28 rounded-lg"
                />
                <Text className="font-bold text-lg">{fish.fishType}</Text>
                <Text>({fish.size}cm)</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-2xl font-bold my-3">{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}
