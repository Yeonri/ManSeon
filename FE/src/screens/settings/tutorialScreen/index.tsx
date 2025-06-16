import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TutorialScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>튜토리얼</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
