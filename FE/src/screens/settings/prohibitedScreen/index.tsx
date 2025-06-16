import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProhibitedScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>금어기</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
