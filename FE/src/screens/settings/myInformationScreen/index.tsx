import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyInformationScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>내 정보 수정</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
