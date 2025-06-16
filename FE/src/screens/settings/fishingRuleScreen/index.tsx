import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FishingRuleScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>방생기준</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
