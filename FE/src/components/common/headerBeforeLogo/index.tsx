import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export function HeaderBeforeLogo() {
  const navigation = useNavigation();

  function handleBackPress() {
    navigation.goBack();
  }

  return (
    <View className="px-5 h-16 flex-row items-center relative">
      <TouchableOpacity onPress={handleBackPress} className="z-10">
        <ChevronLeft />
      </TouchableOpacity>
      <Text className="absolute left-0 right-0 text-center font-custom text-4xl color-blue-800">
        만선
      </Text>
    </View>
  );
}
