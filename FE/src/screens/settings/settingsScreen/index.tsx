import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>설정</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
