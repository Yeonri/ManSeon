import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";
import Dropdown from "../../../components/common/dropdown";
import CollectionCard from "../../../components/settings/collectionCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { SettingsStackParams } from "../../../navigation/types";
import mergeCollectedFishData from "../../../utils/mergeCollectedFishData";
import fishBaseData from "../../../data/fish";
import { fishImageMap } from "../../../utils/imageMaps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CollectionScreen() {
  const sortOptions = ["가나다순", "잡은 물고기순", "최신순"];
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParams>>();

  // 내 물고기 데이터 가져오기
  // const { data, isLoading } = useGetMyFishes();
  const insets = useSafeAreaInsets();

  // 임시 데이터
  const data = useMemo(
    () => [
      {
        fishId: 1,
        fishName: "광어",
        size: 38.5,
        bait: "새우",
        equipment: "루어 낚시대",
        fishImg: "flounder",
        lat: 33.4996,
        lng: 126.5312,
        createdAt: "2025-06-10T09:00:00Z",
      },
      {
        fishId: 3,
        fishName: "우럭",
        size: 42.1,
        bait: "오징어",
        equipment: "찌낚시",
        fishImg: "rockfish",
        lat: 34.7599,
        lng: 127.6604,
        createdAt: "2025-06-15T14:45:00Z",
      },
    ],
    []
  );

  // 병합된 도감 리스트
  const mergedFishList = useMemo(() => {
    if (!data) return fishBaseData;
    return mergeCollectedFishData(fishBaseData, data);
  }, [data]);

  const sortedData = useMemo(() => {
    const copyData = [...mergedFishList];

    console.log("물고기 정보", copyData);

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

  // if (isLoading) {
  //   return (
  //     <SafeAreaView
  //       edges={["top"]}
  //       className="flex-1 justify-center items-center"
  //     >
  //       <Text>도감 정보를 불러오는 중입니다.</Text>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={false} title="낚시 도감" before={true} />

      <View className="mx-5 items-end">
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
        className="mx-5"
        contentContainerClassName="gap-y-5 pb-2"
        columnWrapperClassName="justify-between"
        contentContainerStyle={{
          paddingBottom: insets.bottom + 60,
        }}
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
