import { Pressable, Text, View } from "react-native";

interface ToggleButtonProps {
  option1: string;
  option2: string;
  selected: string;
  onSelect: (value: string) => void;
}

export function ToggleButton({
  option1,
  option2,
  selected,
  onSelect,
}: ToggleButtonProps) {
  return (
    <View className="flex-row bg-blue-50 rounded-full p-1">
      <Pressable
        onPress={() => onSelect(option1)}
        className={`flex-1 items-center py-2 rounded-full ${selected === option1 ? "bg-blue-500" : ""}`}
      >
        <Text
          className={`${selected === option1 ? "text-white font-bold" : "text-blue-500 font-medium"} `}
        >
          {option1}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onSelect(option2)}
        className={`flex-1 items-center py-2 rounded-full ${selected === option2 ? "bg-blue-500" : ""}`}
      >
        <Text
          className={`${selected === option2 ? "text-white font-bold" : "text-blue-500 font-medium"}`}
        >
          {option2}
        </Text>
      </Pressable>
    </View>
  );
}
