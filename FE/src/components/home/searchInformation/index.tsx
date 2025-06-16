import { Text, View } from "react-native";
import SearchInput from "../../common/searchInput";

interface SearchInformationProps {
  keyword: string;
  setKeyword: (text: string) => void;
  handleSearch: () => void;
}

export default function SearchInformation({
  keyword,
  setKeyword,
  handleSearch,
}: SearchInformationProps) {
  return (
    <View className="px-5 pt-3 pb-5 bg-blue-500 rounded-xl gap-5">
      {/* 안내멘트 */}
      <View className="flex-row items-end">
        <Text className="text-white font-bold">닉네임</Text>
        <Text className="text-white text-sm">
          님 오늘의 도착지를 확인해 보세요!
        </Text>
      </View>

      {/*검색창*/}
      <SearchInput
        value={keyword}
        onChangeText={setKeyword}
        onSearchPress={handleSearch}
      />
    </View>
  );
}
