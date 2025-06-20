import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";

export default function UserPageScreen() {
  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={true} before={true} />

      <ScrollView>
        <View className="mx-5">
          <Text>타 유저 정보</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
