import { Pressable, Text, View } from "react-native";

interface ToggleProps {
  selected: "공개" | "비공개";
  onSelect: (value: "공개" | "비공개") => void;
}

export function Toggle({ selected, onSelect }: ToggleProps) {
  return (
    <View className="flex-row bg-blue-50 rounded-full p-0.5 self-start">
      <Pressable
        onPress={() => onSelect("공개")}
        className={`w-20 items-center py-1 rounded-full ${
          selected === "공개" ? "bg-blue-500" : ""
        }`}
      >
        <Text
          className={`${
            selected === "공개"
              ? "text-white font-semibold"
              : "text-blue-500 font-medium"
          }`}
        >
          공개
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onSelect("비공개")}
        className={`w-20 items-center py-1 rounded-full ${
          selected === "비공개" ? "bg-blue-500" : ""
        }`}
      >
        <Text
          className={`${
            selected === "비공개"
              ? "text-white font-semibold"
              : "text-blue-500 font-medium"
          }`}
        >
          비공개
        </Text>
      </Pressable>
    </View>
  );
}
