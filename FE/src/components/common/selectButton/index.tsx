import { Text, TouchableOpacity } from "react-native";

interface SelectButtonProps {
  name: string;
  fill: boolean;
  onPress: () => void;
}

function SelectButton({ name, fill, onPress }: SelectButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        self-start px-3 py-1 rounded-full border border-blue-500 
        ${fill ? "bg-blue-500" : "bg-white"}
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
