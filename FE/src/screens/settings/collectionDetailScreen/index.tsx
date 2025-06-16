import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CollectionDetailScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>도감 상세</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
