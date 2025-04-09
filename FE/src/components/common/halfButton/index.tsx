import { Text, TouchableOpacity } from "react-native";

interface HalfButtonProps {
  title: string;
  type: "default" | "line";
  onPress?: () => void;
}

export function HalfButton({ title, type, onPress }: HalfButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={
        type === "default"
          ? "rounded-2xl py-3 w-44 items-center bg-blue-500"
          : "rounded-2xl py-3 w-44 items-center border-2 border-blue-500 bg-white"
      }
    >
      <Text
        className={
          type === "default"
            ? "font-bold text-white"
            : "font-bold text-blue-500"
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
