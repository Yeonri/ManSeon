import { Image, Text, TouchableOpacity, View } from "react-native";

interface ChatbotButtonProps {
  onPress: () => void;
}

export function ChatbotButton({ onPress }: ChatbotButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex items-center justify-center border border-neutral-200 rounded-2xl h-28 mb-5">
        <View className="flex-row justify-center">
          <Image
            source={require("../../../assets/images/mansun.png")}
            className="h-32 w-32"
            resizeMode="contain"
          />
          <View className="text-center justify-center">
            <Text className="text-center font-semibold text-2xl">챗봇이랑</Text>
            <Text className="font-semibold text-2xl">얘기하기</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
