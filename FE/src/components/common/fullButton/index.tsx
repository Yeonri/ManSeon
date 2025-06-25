import { Text, TouchableOpacity, View } from "react-native";

interface FullButtonProps {
  name: string;
  disable: boolean;
  onPress: () => void;
}

export function FullButton({ name, disable, onPress }: FullButtonProps) {
  return (
    <View
      className={`mx-5 p-4 rounded-2xl ${disable ? "bg-neutral-500" : "bg-blue-500"}`}
    >
      <TouchableOpacity disabled={disable} onPress={onPress}>
        <Text className="text-white text-center">{name}</Text>
      </TouchableOpacity>
    </View>
  );
}
