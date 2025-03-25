import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import IconBack from "../../../assets/images/icon_back.svg";

export function HeaderBeforeLogo() {
  const navigation = useNavigation();

  function handleBackPress() {
    navigation.goBack();
  }

  return (
    <View className="mx-5 h-10 flex-row items-center relative my-2">
      <TouchableOpacity onPress={() => handleBackPress}>
        <IconBack />
      </TouchableOpacity>
      <Text className="absolute left-0 right-0 text-center font-custom text-4xl color-blue-800">
        만선
      </Text>
    </View>
  );
}
