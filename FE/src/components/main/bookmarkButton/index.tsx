import { MapPin } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface BookmarkButtonProps {
  name: string;
  onPress?: () => void;
}

export function BookmarkButton({ name, onPress }: BookmarkButtonProps) {
  return (
    <TouchableOpacity
      className="border border-neutral-500 py-1 rounded-xl bg-white px-2"
      onPress={onPress}
    >
      <View className="flex-row items-center justify-center">
        <MapPin height={18} color="#3A84EF" />
        <Text className="text-center text-neutral-600">{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
