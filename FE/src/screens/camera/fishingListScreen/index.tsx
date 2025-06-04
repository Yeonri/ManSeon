import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useCallback } from "react";
import { Image, SectionList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetRecords } from "../../../api/quries/useRecord";
import { HeaderBeforeTitle } from "../../../components/common/headerBeforeTitle";
import { FishingStackParams } from "../../../navigation/types";

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
  const { data: response, refetch } = useGetRecords();
  console.log("응답 전체 :", response);

  const records = response?.data ?? [];
  console.log("전체 게시글:", records);

  function handleDetailClick(title: string, fishId: number) {
    navigation.navigate("Fishing", { title, fishId });
  }

  function formatDate(date: string) {
    return format(date, "yyyy.MM.dd (EEE)", { locale: ko });
  }

  const formattedSections = records.map((section) => ({
    title: section.title,
    data: groupItems(section.data, 3),
  }));

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <SafeAreaView className="mx-5">
      <HeaderBeforeTitle name="나의 낚시 기록" />
      <SectionList
        sections={formattedSections}
        renderItem={({ item, section }) => (
          <View className="flex-row justify-between mb-3">
            {item.map((fish, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() =>
                  handleDetailClick(formatDate(section.title), fish.fishId)
                }
                className="w-[30%] p-2 rounded-lg"
              >
                <Image
                  source={{ uri: fish.fishImg }}
                  className="w-full h-28 rounded-lg"
                />
                {/* <Image
                  source={fish.fishImg?{ uri: fish.fishImg }:require("../../assets/images/기본이미지파일")}
                  className="w-full h-28 rounded-lg"
                /> */}
                <Text className="font-bold text-lg text-neutral-800">
                  {fish.fishType}
                </Text>
                <Text className="text-neutral-600">({fish.size}cm)</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <>
            <Text className="text-xl font-bold my-3 text-neutral-600">
              {formatDate(title)}
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}
