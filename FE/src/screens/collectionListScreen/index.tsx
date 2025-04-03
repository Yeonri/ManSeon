import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { MoreStackParams } from "../../api/types/MoreStackParams";
import CollectionCard from "../../components/collection/collectionCard";
import Dropdown from "../../components/common/dropdown";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import processedFishData from "../../utils/processedFishData";

const sortOptions = ["가나다순", "잡은 물고기순", "최신순"];

export function CollectionListScreen() {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  const navigation =
    useNavigation<NativeStackNavigationProp<MoreStackParams>>();

  const sortedData = useMemo(() => {
    const copyData = [...processedFishData];

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
  }, [selectedSort]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
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
            image={item.image}
            isCollected={item.is_collected}
            onPress={() => {
              navigation.navigate("CollectionDetail", {
                name: item.name,
                description: item.description,
                image: item.image,
                collection_info: item.collection_info,
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}
