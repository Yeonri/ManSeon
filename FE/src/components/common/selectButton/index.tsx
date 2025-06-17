import { Text, TouchableOpacity } from "react-native";

interface SelectButtonProps {
  name: string;
  fill: boolean;
  follow?: boolean;
  onPress: () => void;
}

function SelectButton({ name, fill, follow, onPress }: SelectButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        self-start rounded-full border border-blue-500 
        ${fill ? "bg-blue-500" : "bg-white"} ${follow ? "px-2 py-0.5" : "px-3 py-1"}
      `}
    >
      <Text
        className={`text-center text-xs ${fill ? "text-white" : "text-blue-500"}`}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

export default SelectButton;
