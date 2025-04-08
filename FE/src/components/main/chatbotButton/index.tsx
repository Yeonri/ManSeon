import { Image, Text, TouchableOpacity, View } from "react-native";

interface ChatbotButtonProps {
  onPress: () => void;
}

export function ChatbotButton({ onPress }: ChatbotButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex items-center justify-center border border-blue-50 rounded-2xl h-40 mb-5 bg-blue-50">
        <View className="flex-row justify-center">
          <View className="text-center justify-center gap-2">
            <Text
              className="text-center font-semibold text-3xl text-blue-500
            "
            >
              챗봇 시작하기
            </Text>
            <Text className="font-normal text-base">
              낚시터 정보를 알아보세요
            </Text>
          </View>
          <Image
            source={require("../../../assets/images/chatbot.png")}
            className="h-36 w-36 -mr-3"
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
