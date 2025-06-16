import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecordScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>기록 목록 화면</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
