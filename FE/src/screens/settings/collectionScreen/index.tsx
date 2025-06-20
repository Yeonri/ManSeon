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
        fishName: "감성돔",
        lat: 35.046101,
        lng: 125.21441,
        createdAt: "2024-03-19T00:00:00Z",
      },
      {
        fishId: 3,
        fishName: "게",
        lat: 34.176337,
        lng: 130.624856,
        createdAt: "2025-02-17T00:00:00Z",
      },
      {
        fishId: 5,
        fishName: "쥐치",
        lat: 34.008425,
        lng: 130.814003,
        createdAt: "2024-04-24T00:00:00Z",
      },
      {
        fishId: 7,
        fishName: "우럭",
        lat: 35.807542,
        lng: 126.691235,
        createdAt: "2024-01-18T00:00:00Z",
      },
      {
        fishId: 9,
        fishName: "줄가자미",
        lat: 37.685626,
        lng: 128.518522,
        createdAt: "2025-06-05T00:00:00Z",
      },
      {
        fishId: 11,
        fishName: "돌돔",
        lat: 35.489036,
        lng: 126.163245,
        createdAt: "2025-01-01T00:00:00Z",
      },
      {
        fishId: 13,
        fishName: "주꾸미",
        lat: 37.984471,
        lng: 124.779151,
        createdAt: "2025-05-30T00:00:00Z",
      },
      {
        fishId: 16,
        fishName: "옥돔",
        lat: 34.56588,
        lng: 128.885956,
        createdAt: "2025-03-15T00:00:00Z",
      },
      {
        fishId: 19,
        fishName: "무늬오징어",
        lat: 33.865256,
        lng: 129.738428,
        createdAt: "2024-11-13T00:00:00Z",
      },
      {
        fishId: 21,
        fishName: "볼락",
        lat: 36.30918,
        lng: 125.527796,
        createdAt: "2024-07-28T00:00:00Z",
      },
      {
        fishId: 24,
        fishName: "농어",
        lat: 36.764273,
        lng: 127.652838,
        createdAt: "2024-08-21T00:00:00Z",
      },
      {
        fishId: 11,
        fishName: "돌돔",
        lat: 36.662212,
        lng: 129.739133,
        createdAt: "2025-01-14T00:00:00Z",
      },
      {
        fishId: 11,
        fishName: "돌돔",
        lat: 37.782304,
        lng: 130.962535,
        createdAt: "2024-09-04T00:00:00Z",
      },
      {
        fishId: 16,
        fishName: "옥돔",
        lat: 38.586926,
        lng: 128.068675,
        createdAt: "2024-11-05T00:00:00Z",
      },
      {
        fishId: 7,
        fishName: "우럭",
        lat: 36.496871,
        lng: 125.049802,
        createdAt: "2024-09-07T00:00:00Z",
      },
      {
        fishId: 7,
        fishName: "우럭",
        lat: 36.268746,
        lng: 129.687665,
        createdAt: "2024-06-12T00:00:00Z",
      },
      {
        fishId: 13,
        fishName: "주꾸미",
        lat: 36.093897,
        lng: 127.122603,
        createdAt: "2024-09-24T00:00:00Z",
      },
      {
        fishId: 9,
        fishName: "줄가자미",
        lat: 35.536091,
        lng: 128.998693,
        createdAt: "2025-03-27T00:00:00Z",
      },
      {
        fishId: 3,
        fishName: "게",
        lat: 35.870482,
        lng: 125.332915,
        createdAt: "2024-05-21T00:00:00Z",
      },
      {
        fishId: 3,
        fishName: "게",
        lat: 33.739695,
        lng: 126.619187,
        createdAt: "2025-01-20T00:00:00Z",
      },
      {
        fishId: 9,
        fishName: "줄가자미",
        lat: 36.8171,
        lng: 126.115571,
        createdAt: "2025-06-08T00:00:00Z",
      },
      {
        fishId: 9,
        fishName: "줄가자미",
        lat: 37.758032,
        lng: 130.794862,
        createdAt: "2025-05-29T00:00:00Z",
      },
      {
        fishId: 3,
        fishName: "게",
        lat: 37.62356,
        lng: 125.262718,
        createdAt: "2024-01-11T00:00:00Z",
      },
      {
        fishId: 11,
        fishName: "돌돔",
        lat: 36.370421,
        lng: 125.052073,
        createdAt: "2024-08-13T00:00:00Z",
      },
      {
        fishId: 5,
        fishName: "쥐치",
        lat: 36.098445,
        lng: 131.187243,
        createdAt: "2025-01-03T00:00:00Z",
      },
      {
        fishId: 19,
        fishName: "무늬오징어",
        lat: 36.289587,
        lng: 126.156641,
        createdAt: "2024-05-24T00:00:00Z",
      },
      {
        fishId: 16,
        fishName: "옥돔",
        lat: 37.078876,
        lng: 129.484974,
        createdAt: "2025-01-10T00:00:00Z",
      },
      {
        fishId: 7,
        fishName: "우럭",
        lat: 37.900763,
        lng: 130.806172,
        createdAt: "2024-11-04T00:00:00Z",
      },
      {
        fishId: 5,
        fishName: "쥐치",
        lat: 34.755541,
        lng: 128.308977,
        createdAt: "2024-09-18T00:00:00Z",
      },
      {
        fishId: 21,
        fishName: "볼락",
        lat: 37.86852,
        lng: 130.00172,
        createdAt: "2024-01-14T00:00:00Z",
      },
      {
        fishId: 21,
        fishName: "볼락",
        lat: 33.8365,
        lng: 128.400792,
        createdAt: "2025-06-15T00:00:00Z",
      },
      {
        fishId: 1,
        fishName: "감성돔",
        lat: 37.39687,
        lng: 125.559083,
        createdAt: "2025-03-21T00:00:00Z",
      },
      {
        fishId: 11,
        fishName: "돌돔",
        lat: 37.87885,
        lng: 130.09409,
        createdAt: "2024-03-05T00:00:00Z",
      },
      {
        fishId: 1,
        fishName: "감성돔",
        lat: 34.69483,
        lng: 126.23561,
        createdAt: "2024-02-06T00:00:00Z",
      },
      {
        fishId: 21,
        fishName: "볼락",
        lat: 36.828334,
        lng: 124.706423,
        createdAt: "2025-01-01T00:00:00Z",
      },
      {
        fishId: 3,
        fishName: "게",
        lat: 37.527012,
        lng: 125.251475,
        createdAt: "2024-06-09T00:00:00Z",
      },
      {
        fishId: 19,
        fishName: "무늬오징어",
        lat: 33.74591,
        lng: 126.165631,
        createdAt: "2024-12-17T00:00:00Z",
      },
      {
        fishId: 24,
        fishName: "농어",
        lat: 37.292092,
        lng: 126.231358,
        createdAt: "2025-04-29T00:00:00Z",
      },
      {
        fishId: 9,
        fishName: "줄가자미",
        lat: 37.840003,
        lng: 130.035279,
        createdAt: "2024-06-13T00:00:00Z",
      },
      {
        fishId: 21,
        fishName: "볼락",
        lat: 34.101081,
        lng: 126.453353,
        createdAt: "2024-06-24T00:00:00Z",
      },
      {
        fishId: 19,
        fishName: "무늬오징어",
        lat: 38.33478,
        lng: 126.07933,
        createdAt: "2024-05-09T00:00:00Z",
      },
      {
        fishId: 21,
        fishName: "볼락",
        lat: 37.420977,
        lng: 129.013305,
        createdAt: "2024-09-15T00:00:00Z",
      },
      {
        fishId: 24,
        fishName: "농어",
        lat: 37.622537,
        lng: 124.553905,
        createdAt: "2024-10-17T00:00:00Z",
      },
      {
        fishId: 1,
        fishName: "감성돔",
        lat: 34.134298,
        lng: 127.562049,
        createdAt: "2024-06-30T00:00:00Z",
      },
      {
        fishId: 19,
        fishName: "무늬오징어",
        lat: 37.357287,
        lng: 126.025539,
        createdAt: "2024-09-16T00:00:00Z",
      },
      {
        fishId: 21,
        fishName: "볼락",
        lat: 34.64362,
        lng: 126.638366,
        createdAt: "2025-06-20T00:00:00Z",
      },
      {
        fishId: 13,
        fishName: "주꾸미",
        lat: 34.021006,
        lng: 127.425723,
        createdAt: "2024-10-03T00:00:00Z",
      },
      {
        fishId: 7,
        fishName: "우럭",
        lat: 34.123157,
        lng: 126.661407,
        createdAt: "2024-05-04T00:00:00Z",
      },
      {
        fishId: 1,
        fishName: "감성돔",
        lat: 36.984565,
        lng: 130.438311,
        createdAt: "2024-01-04T00:00:00Z",
      },
      {
        fishId: 3,
        fishName: "게",
        lat: 37.359339,
        lng: 125.07755,
        createdAt: "2024-07-05T00:00:00Z",
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
    console.log(mergedFishList);

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
