import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title?: string;
  logo: boolean;
  before: boolean;
}

function Header({ title, logo, before }: HeaderProps) {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <View className="mx-5 h-16 flex-row items-center">
      {before && (
        <TouchableOpacity onPress={handleBack} className="z-10">
          <ChevronLeft color="#737373" size={25} />
        </TouchableOpacity>
      )}
      {logo && (
        <Text className="absolute left-0 right-0 text-center font-custom text-4xl color-blue-800">
          만선
        </Text>
      )}
      {title && (
        <Text className="absolute left-0 right-0 text-center font-bold text-xl color-blue-600">
          {title}
        </Text>
      )}
    </View>
  );
}

export default Header;
