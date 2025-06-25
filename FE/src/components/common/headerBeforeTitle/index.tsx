import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export function HeaderBeforeTitle({ name }: { name: string }) {
  const navigation = useNavigation();

  function handleBackPress() {
    navigation.goBack();
  }

  return (
    <View className="px-5 h-16 flex-row items-center relative">
      <TouchableOpacity onPress={handleBackPress} className="z-10">
        <ChevronLeft />
      </TouchableOpacity>

      <Text className="absolute left-0 right-0 text-center font-bold text-xl color-blue-600">
        {name}
      </Text>
    </View>
  );
}
