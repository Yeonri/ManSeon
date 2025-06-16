import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FriendsScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>친구 목록</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
