import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddPostScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>게시글 추가</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
