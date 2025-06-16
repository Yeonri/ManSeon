import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CollectionScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>도감 전체</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
