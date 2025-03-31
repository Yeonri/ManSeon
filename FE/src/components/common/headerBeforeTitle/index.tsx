import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import IconBack from "../../../assets/images/icon_back.svg";

export function HeaderBeforeTitle({ name }: { name: string }) {
  const navigation = useNavigation();

  function handleBackPress() {
    navigation.goBack();
  }

  return (
    <View className="px-5 h-16 flex-row items-center relative">
      <TouchableOpacity onPress={handleBackPress} className="z-10">
        <IconBack />
      </TouchableOpacity>

      <Text className="absolute left-0 right-0 text-center font-bold text-xl color-blue-600">
        {name}
      </Text>
    </View>
  );
}
