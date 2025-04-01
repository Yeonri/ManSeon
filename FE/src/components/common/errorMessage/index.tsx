import { CircleAlert } from "lucide-react-native";
import { Text, View } from "react-native";

export function ErrorMessage({ content }: { content: string }) {
  return (
    <View className="m-1 flex-row gap-1 items-center">
      <CircleAlert color="#EC6344" size={16} />
      <Text className="text-sm text-error">{content}</Text>
    </View>
  );
}
