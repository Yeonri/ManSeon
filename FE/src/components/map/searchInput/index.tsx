import { Search } from "lucide-react-native";
import { TextInput, TouchableOpacity, View } from "react-native";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearchPress: () => void;
  placeholder?: string;
}

function SearchInput({
  value,
  onChangeText,
  onSearchPress,
  placeholder = "검색어를 입력해 주세요",
}: SearchInputProps) {
  return (
    <View className="flex-row items-center px-4 bg-white rounded-full w-[340px] h-[45px] mb-3 border border-neutral-400">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="flex-1 text-base text-neutral-900"
      />
      <TouchableOpacity onPress={onSearchPress} className="pl-2">
        <Search />
      </TouchableOpacity>
    </View>
  );
}

export default SearchInput;
