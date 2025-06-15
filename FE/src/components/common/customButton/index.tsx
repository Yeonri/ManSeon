import { Text, TouchableOpacity, View } from "react-native";

interface CustomButtonProps {
  title: string;
  full: boolean;
  fill: boolean;
  disable?: boolean;
  onPress: () => void;
}

function CustomButton({
  title,
  full,
  fill,
  disable,
  onPress,
}: CustomButtonProps) {
  return (
    <View
      className={`p-3 rounded-xl border ${disable ? "border-neutral-500 bg-neutral-500" : `border-blue-500 ${fill ? "bg-blue-500" : "bg-white"}`} ${!full && "w-44"}`}
    >
      <TouchableOpacity disabled={disable} onPress={onPress}>
        <Text
          className={`text-center text-sm ${fill ? "text-white" : "text-blue-500"}`}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default CustomButton;
