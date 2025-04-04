import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBefore } from "../../components/common/headerBefore";
import { FullButton } from "../../components/common/fullButton";

export function NicknameScreen() {
  return (
    <SafeAreaView>
      <HeaderBefore />
      <View className="mx-10">
        <Text className="mb-14 font-bold text-4xl text-blue-500">회원가입</Text>
        <View className="gap-5">
          <View>
            <Text className="font-bold text-lg">닉네임</Text>
            <TextInput
              placeholder="닉네임을 입력해 주세요"
              className="border-b-2 border-neutral-100"
            />
          </View>
        </View>
        <View className="m-10" />
        <FullButton name="다음" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}
