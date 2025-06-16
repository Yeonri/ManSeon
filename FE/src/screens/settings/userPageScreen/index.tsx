import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserPageScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>타 유저 정보</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
