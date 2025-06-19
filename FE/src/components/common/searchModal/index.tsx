import { useEffect, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { Text, useWindowDimensions, View } from "react-native";
import SearchInput from "../searchInput";
import { useGetFishingPointSearch } from "../../../api/queries/fishingPoint";

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

  useEffect(() => {
    if (visible) {
      sheetRef.current?.open();
    } else {
      sheetRef.current?.close();
    }
  }, [visible]);

  return (
    <Modalize ref={sheetRef} snapPoint={height * 0.7}>
      <View className="m-5 gap-5">
        <Text className="pt-3 text-neutral-800 text-lg font-semibold text-center">
          검색 결과
        </Text>

        <SearchInput
          modal={true}
          value={keyword}
          onChangeText={onChangeText}
          onSearchPress={onSearch}
        />

        {/* 검색 결과 */}
        {/* {isLoading ? (
            <Text>검색 중...</Text>
          ) : (
            <SearchResult results={searchResults} />
          )} */}
      </View>
    </Modalize>
  );
}
