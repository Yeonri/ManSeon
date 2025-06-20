import { useEffect, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { Text, useWindowDimensions, View } from "react-native";
import SearchInput from "../searchInput";
import { searchData } from "../../../data/searchData";
import { MapPin } from "lucide-react-native";
// import { useGetFishingPointSearch } from "../../../api/queries/fishingPoint";

interface SearchModalProps {
  visible: boolean;
  keyword: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

export default function SearchModal({
  visible,
  keyword,
  onChangeText,
  onSearch,
}: SearchModalProps) {
  const sheetRef = useRef<Modalize>(null);
  const { height } = useWindowDimensions();

  //   const { data: searchResults = [], isLoading } =
  //     useGetFishingPointSearch(keyword);

  const fishingPointList = searchData;

  const filteredResults = fishingPointList.filter((item) =>
    item.name.includes(keyword)
  );

  useEffect(() => {
    if (visible) {
      sheetRef.current?.open();
    } else {
      sheetRef.current?.close();
    }
  }, [visible]);

  const renderItem = ({ item }: any) => (
    <View className="mb-3">
      <View className="flex-row items-center px-4">
        <View className="mr-2">
          <MapPin />
        </View>
        <Text className="font-semibold text-xl text-neutral-600">
          {item.name}
        </Text>
      </View>
      <Text className="ml-10 mt-2">
        N {item.latitude} / E {item.longitude}
      </Text>
    </View>
  );

  const ListHeaderComponent = (
    <View className="mb-4">
      <Text className="pt-5 text-neutral-800 text-lg font-semibold text-center">
        검색 결과
      </Text>
      <View className="p-4">
        <SearchInput
          modal={true}
          value={keyword}
          onChangeText={onChangeText}
          onSearchPress={onSearch}
        />
      </View>
    </View>
  );

  return (
    <Modalize
      ref={sheetRef}
      snapPoint={height * 0.7}
      flatListProps={{
        data: filteredResults,
        keyExtractor: (item) => String(item.pointId),
        renderItem: renderItem,
        ListHeaderComponent,
      }}
    />
  );
}
