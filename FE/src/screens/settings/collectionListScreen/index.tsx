import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMyFishes } from "../../../api/quries/useMyFishes";
import CollectionCard from "../../../components/collection/collectionCard";
import Dropdown from "../../../components/common/dropdown";
import { HeaderBeforeTitle } from "../../../components/common/headerBeforeTitle";
import fishBaseData from "../../../data/fish";
import { SettingStackParams } from "../../../navigation/types";
import fishImageMap from "../../../utils/fishImageMap";
import mergeCollectedFishData from "../../../utils/mergeCollectedFishData";

const sortOptions = ["가나다순", "잡은 물고기순", "최신순"];

export function CollectionListScreen() {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  const navigation =
    useNavigation<NativeStackNavigationProp<SettingStackParams>>();

  // 내 물고기 데이터 가져오기
  const { data: collectedData, isLoading } = useMyFishes();

  // 병합된 도감 리스트
  const mergedFishList = useMemo(() => {
    if (!collectedData) return fishBaseData;
    return mergeCollectedFishData(fishBaseData, collectedData);
  }, [collectedData]);

  const sortedData = useMemo(() => {
    const copyData = [...mergedFishList];

    if (selectedSort === "가나다순") {
      return copyData.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (selectedSort === "잡은 물고기순") {
      return copyData
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => Number(b.is_collected) - Number(a.is_collected));
    }

    if (selectedSort === "최신순") {
      return copyData.sort((a, b) => {
        const aDate =
          a.collection_info.length > 0
            ? new Date(
                a.collection_info[a.collection_info.length - 1].caught_at
              ).getTime()
            : 0;
        const bDate =
          b.collection_info.length > 0
            ? new Date(
                b.collection_info[b.collection_info.length - 1].caught_at
              ).getTime()
            : 0;
        return bDate - aDate;
      });
    }

    return copyData;
  }, [selectedSort, mergedFishList]);

  console.log("정렬 데이터", sortedData);

  if (isLoading) {
    return (
      <SafeAreaView
        edges={["top"]}
        className="flex-1 justify-center items-center"
      >
        <Text>도감 정보를 불러오는 중입니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <HeaderBeforeTitle name="낚시 도감" />

      <View className="px-5 mt-4 mb-5 items-end">
        <Dropdown
          options={sortOptions}
          selected={selectedSort}
          onSelect={setSelectedSort}
        />
      </View>
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className="flex-1 px-5"
        contentContainerClassName="gap-y-5 pb-2"
        columnWrapperClassName="justify-between"
        renderItem={({ item }) => (
          <CollectionCard
            id={item.id}
            name={item.name}
            image={fishImageMap[item.image]}
            isCollected={item.is_collected}
            onPress={() => {
              navigation.navigate("CollectionDetail", {
                name: item.name,
                description: item.description,
                image: fishImageMap[item.image],
                collection_info: item.collection_info,
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}
