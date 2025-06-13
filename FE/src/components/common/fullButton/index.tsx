import { Text, TouchableOpacity, View } from "react-native";

interface FullButtonProps {
  name: string;
  disable: boolean;
  onPress: () => void;
}

export function FullButton({ name, disable, onPress }: FullButtonProps) {
  return (
    <View
      className={`p-4 rounded-xl ${disable ? "bg-neutral-500" : "bg-blue-500"}`}
    >
      <TouchableOpacity disabled={disable} onPress={onPress}>
        <Text className="text-center text-white text-sm">{name}</Text>
      </TouchableOpacity>
    </View>
  );
}
