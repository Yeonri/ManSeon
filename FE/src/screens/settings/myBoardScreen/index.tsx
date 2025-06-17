import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyBoardScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>내가 쓴 게시글</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
