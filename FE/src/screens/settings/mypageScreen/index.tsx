import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MypageScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>마이페이지</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
