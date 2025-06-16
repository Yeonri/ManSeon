import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NoticeScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>공지사항</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
