import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

export function HeaderBefore() {
  const navigation = useNavigation();

  function handleBackPress() {
    navigation.goBack();
  }

  return (
    <View className="px-5 h-16 flex-row items-center relative">
      <TouchableOpacity onPress={handleBackPress} className="z-10">
        <ChevronLeft />
      </TouchableOpacity>
    </View>
  );
}
