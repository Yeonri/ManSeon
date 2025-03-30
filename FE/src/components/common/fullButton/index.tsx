import { Text, TouchableOpacity, View } from "react-native";

interface FullButtonProps {
  name: string;
  onPress: () => void;
}

export function FullButton({ name, onPress }: FullButtonProps) {
  return (
    <View className="bg-blue-500 mx-5 p-4 rounded-2xl">
      <TouchableOpacity onPress={onPress}>
        <Text className="text-white text-center">{name}</Text>
      </TouchableOpacity>
    </View>
  );
}
