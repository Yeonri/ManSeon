import { Search } from "lucide-react-native";
import { TextInput, TouchableOpacity, View } from "react-native";

interface SearchInputProps {
  modal?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onSearchPress: () => void;
  placeholder?: string;
}

export default function SearchInput({
  modal,
  value,
  onChangeText,
  onSearchPress,
  placeholder = "장소를 입력해 주세요",
}: SearchInputProps) {
  return (
    <View
      className={`h-12 flex-row items-center px-4 bg-white rounded-full ${modal ? "border border-neutral-400" : ""}`}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="flex-1 text-neutral-800 text-sm"
      />
      <TouchableOpacity onPress={onSearchPress}>
        <Search color="#3B82F6" size={20} strokeWidth={3} />
      </TouchableOpacity>
    </View>
  );
}
