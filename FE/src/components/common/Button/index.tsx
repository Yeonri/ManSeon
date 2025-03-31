import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  type: "default" | "line";
  onPress?: () => void;
}

function Button({ title, type, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={
        type === "default"
          ? "rounded-2xl py-3 w-36 items-center bg-blue-500"
          : "rounded-2xl py-3 w-36 items-center border border-blue-500 bg-white"
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

export default Button;
