import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import IconBack from "../../../assets/images/icon_back.svg";

export function HeaderBeforeTitle({ name }: { name: string }) {
  const navigation = useNavigation();

  function handleBackPress() {
    navigation.goBack();
  }

  return (
    <View className="h-10 flex-row items-center relative my-2">
      <TouchableOpacity onPress={handleBackPress}>
        <IconBack />
      </TouchableOpacity>
      <Text className="absolute left-0 right-0 text-center font-bold text-xl color-blue-600">
        {name}
      </Text>
    </View>
  );
}
