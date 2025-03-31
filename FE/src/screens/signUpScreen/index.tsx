import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBefore } from "../../components/common/headerBefore";
import { FullButton } from "../../components/common/fullButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../api/types/AuthStackParams";

interface SignupScreenNavigationProps
  extends NativeStackNavigationProp<AuthStackParams, "Signup"> {}

export function SignUpScreen() {
  const navigation = useNavigation<SignupScreenNavigationProps>();

  return (
    <SafeAreaView>
      <HeaderBefore />
      <View className="mx-10">
        <Text className="mb-14 font-bold text-4xl text-blue-500">회원가입</Text>
        <View className="gap-5">
          <View>
            <Text className="font-bold text-lg">이름</Text>
            <TextInput
              placeholder="이름을 입력해 주세요"
              className="border-b-2 border-neutral-100"
            />
          </View>
          <View>
            <Text className="font-bold text-lg">전화번호</Text>
            <TextInput
              placeholder="전화번호를 입력해 주세요 (숫자만 입력)"
              className="border-b-2 border-neutral-100"
            />
          </View>
          <View>
            <Text className="font-bold text-lg">이메일</Text>
            <TextInput
              placeholder="이메일을 입력해 주세요"
              className="border-b-2 border-neutral-100"
            />
          </View>
          <View>
            <Text className="font-bold text-lg">비밀번호</Text>
            <TextInput
              placeholder="비밀번호를 입력해 주세요"
              className="border-b-2 border-neutral-100"
            />
          </View>
          <View>
            <Text className="font-bold text-lg">비밀번호 확인</Text>
            <TextInput
              placeholder="비밀번호를 다시 입력해 주세요"
              className="border-b-2 border-neutral-100"
            />
          </View>
        </View>
        <View className="m-10" />
        <FullButton
          name="다음"
          onPress={() => navigation.navigate("Nickname")}
        />
      </View>
    </SafeAreaView>
  );
}
