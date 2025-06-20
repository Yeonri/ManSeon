import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";
import UserInquriy from "../../../components/settings/userInquriy";

export default function InquiryScreen() {
  // const { user } = useLoginStore();
  // console.log("계정: ", user?.role);

  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={true} before={true} />

      <ScrollView>
        <View className="mx-5 gap-10">
          {/* 문의사항 정보 설명 */}
          <View>
            <Text className="text-neutral-800 text-lg font-bold">문의사항</Text>
            <Text className="text-neutral-600 text-sm">
              만선에 의견이 있다면 남겨주세요.
            </Text>
          </View>

          {/* 사용자 */}
          <UserInquriy />

          {/* 관리자 */}
          {/* <AdminInquriy /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
