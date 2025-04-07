import { MessageCircle } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

interface ChatbotButtonProps {
  onPress: () => void;
}

export function ChatbotButton({ onPress }: ChatbotButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex items-center justify-center w-9 h-9 bg-blue-500 rounded-full">
        <MessageCircle color="white" size={20} />
      </View>
    </TouchableOpacity>
  );
}
