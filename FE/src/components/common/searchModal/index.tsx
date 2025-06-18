import { useEffect, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, Text, View } from "react-native";
import SearchInput from "../searchInput";
import { useGetFishingPointSearch } from "../../../api/queries/fishingPoint";

interface SearchModalProps {
  visible: boolean;
  keyword: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  onClose: () => void;
}

export default function SearchModal({
  visible,
  keyword,
  onChangeText,
  onSearch,
  onClose,
}: SearchModalProps) {
  const modalRef = useRef<Modalize>(null);
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = Dimensions.get("window");

  //   const { data: searchResults = [], isLoading } =
  //     useGetFishingPointSearch(keyword);

  useEffect(() => {
    if (visible) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
    }
  }, [visible]);

  function handleClosed() {
    onClose();
  }

  return (
    <Modalize
      ref={modalRef}
      modalHeight={screenHeight}
      snapPoint={screenHeight * 0.7}
      adjustToContentHeight={false}
      panGestureEnabled
      withHandle
      handlePosition="inside"
      onClosed={handleClosed}
      modalStyle={{
        paddingBottom: insets.bottom,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#fff",
      }}
      overlayStyle={{
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
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
