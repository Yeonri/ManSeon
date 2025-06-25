import { Image, Text, TouchableOpacity, View } from "react-native";

interface ChatbotButtonProps {
  onPress: () => void;
}

export function ChatbotButton({ onPress }: ChatbotButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex items-center justify-center border border-neutral-200 rounded-2xl h-40 mb-5">
        <View className="flex-row justify-center">
          <View className="text-center justify-center gap-2">
            <Text className="text-center font-semibold text-3xl text-blue-500">
              챗봇 시작하기
            </Text>
            <Text className="font-normal text-base">
              궁금한 점을 질문해 보세요!
            </Text>
          </View>
          <Image
            source={require("../../../assets/images/chatbot.png")}
            className="h-36 w-36"
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
