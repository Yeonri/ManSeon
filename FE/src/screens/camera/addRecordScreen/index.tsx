import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddRecordScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>기록 추가 화면</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
