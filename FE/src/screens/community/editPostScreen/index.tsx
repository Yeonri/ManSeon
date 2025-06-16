import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditPostScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>게시글 수정</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
