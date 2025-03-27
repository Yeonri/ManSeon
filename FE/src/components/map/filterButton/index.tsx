import { Text, TouchableOpacity, View } from "react-native";
import IconMarker from "../../../assets/images/icon_marker.svg";

interface FilterButtonProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export function FilterButton({
  label,
  active = false,
  onPress,
}: FilterButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center self-auto px-4 py-2 mx-1 rounded-full bg-white shadow-sm"
    >
      <View className="mr-2">
        <IconMarker />
      </View>

      <Text
        className={`font-medium text-sm  ${active ? "text-neutral-900" : "text-neutral-400"}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
