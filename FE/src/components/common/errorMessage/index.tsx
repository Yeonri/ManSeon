import { CircleAlert } from "lucide-react-native";
import { Text, View } from "react-native";

function ErrorMessage({ content }: { content: string }) {
  return (
    <View className="m-2 flex-row gap-1 items-center">
      <CircleAlert color="#EC6344" size={12} />
      <Text className="text-xs text-error">{content}</Text>
    </View>
  );
}

export default ErrorMessage;
