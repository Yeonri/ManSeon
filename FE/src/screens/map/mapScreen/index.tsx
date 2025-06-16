import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MapScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>지도</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
