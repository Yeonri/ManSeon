import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>카메라 화면</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
