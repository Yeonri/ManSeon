import { Image, Text, TouchableOpacity, View } from "react-native";

interface ChatbotButtonProps {
  onPress: () => void;
}

export function ChatbotButton({ onPress }: ChatbotButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="pl-8 pr-5 py-3 flex-row justify-center bg-blue-50 rounded-xl">
        <View className="flex-1 text-center justify-center gap-2">
          <Text className="font-bold text-2xl text-blue-500">
            챗봇 시작하기
          </Text>
          <Text className="text-sm text-neutral-400">
            궁금한 점을 질문해 보세요!
          </Text>
        </View>
        <Image
          source={require("../../../assets/images/chatbot.png")}
          className="h-20 w-20"
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}
