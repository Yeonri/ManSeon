import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParams } from "../../api/types/AuthStackParams";
import LogoKakao from "../../assets/images/logo_kakao.svg";
import LogoNaver from "../../assets/images/logo_naver.svg";
import { FullButton } from "../../components/common/fullButton";
import { HeaderCenter } from "../../components/common/headerCenter";
import { useLoginStore } from "../../store/loginStore";

interface LoginScreenNavigationProps
  extends NativeStackNavigationProp<AuthStackParams, "Login"> {}

export function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const { login } = useLoginStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <SafeAreaView className="gap-20 m-5">
      <View />
      <HeaderCenter />
      <View className="mx-10 gap-2">
        <View className="gap-5">
          <TextInput
            placeholder="이메일을 입력해 주세요"
            onChangeText={setEmail}
            placeholderTextColor="#A1A1A1"
            inputMode="email"
            className="text-neutral-800 border-b border-neutral-200"
          />
          <TextInput
            placeholder="비밀번호를 입력해 주세요"
            onChangeText={setPassword}
            placeholderTextColor="#A1A1A1"
            className="text-neutral-800 border-b border-neutral-200"
          />
        </View>
        <View className="mt-5 flex-row justify-between">
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-neutral-600">비밀번호 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text className="text-neutral-600">회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FullButton name="로그인" onPress={login} />
      <View className="gap-10">
        <Text className="text- font-semibold text-center text-neutral-800">
          SNS 계정으로 시작하기
        </Text>
        <View className="flex-row gap-5 justify-center">
          <TouchableOpacity onPress={() => {}}>
            <LogoKakao />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <LogoNaver />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
