import { X } from "lucide-react-native";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useFishingPointsSearch } from "../../../api/quries/useFishingpointSearch";
import { SearchInput } from "../searchInput";
import { SearchResult } from "../searchResult";

interface SearchModalProps {
  visible: boolean;
  keyword: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  onClose: () => void;
}

export function SearchModal({
  visible,
  keyword,
  onChangeText,
  onSearch,
  onClose,
}: SearchModalProps) {
  const { data: searchResults = [], isLoading } =
    useFishingPointsSearch(keyword);
  return (
    <Modal visible={visible} transparent>
      <View className="flex-1 bg-black/60 justify-center items-center px-4">
        <View className="w-full max-w-md bg-white rounded-2xl p-4 shadow-md h-[600px]">
          <View className="flex mb-7">
            <TouchableOpacity
              onPress={onClose}
              className="right-0 top-0 p-1 flex-row-reverse -mb-4"
            >
              <X />
            </TouchableOpacity>

            <Text className="text-center text-lg font-semibold text-neutral-900">
              검색 결과
            </Text>
          </View>

          <View className="mb-5">
            <SearchInput
              value={keyword}
              onChangeText={onChangeText}
              onSearchPress={onSearch}
            />
          </View>

          {/* 검색 결과 */}
          {isLoading ? (
            <Text>검색 중...</Text>
          ) : (
            <SearchResult results={searchResults} />
          )}
        </View>
      </View>
    </Modal>
  );
}
