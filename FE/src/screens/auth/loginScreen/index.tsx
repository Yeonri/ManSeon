import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoKakao from "../../../assets/images/logo_kakao.svg";
import LogoNaver from "../../../assets/images/logo_naver.svg";
import { Eye, EyeOff } from "lucide-react-native";
import { AuthStackParams } from "../../../navigation/types";
import { useEmailLogin, useKakaologin } from "../../../api/queries/auth";
import { login } from "@react-native-seoul/kakao-login";
import Header from "../../../components/common/header";
import CustomButton from "../../../components/common/customButton";

interface LoginScreenNavigationProps
  extends NativeStackNavigationProp<AuthStackParams, "Login"> {}

export function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProps>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [option, setOption] = useState<boolean>(true);

  const { mutate: emailLogin } = useEmailLogin();
  const { mutate: kakaoLogin } = useKakaologin();

  // 이메일 로그인
  function handleLogin() {
    if (!email || !password) {
      Alert.alert("입력 오류", "이메일과 비밀번호 모두 입력해주세요.");
      return;
    }

    emailLogin({ email, password });
  }

  // 카카오 로그인
  async function handleKakaoLogin() {
    try {
      const token = await login();
      console.log("카카오 accessToken: ", token.accessToken);

      await kakaoLogin(token.accessToken);
      console.log("카카오 로그인: ", token.accessToken);
    } catch (error) {
      console.log("카카오 로그인 오류: ", error);
    }
  }

  // 네이버 로그인
  function handleNaverLogin() {
    console.log("네이버 로그인");
  }

  return (
    <SafeAreaView className="mx-10 py-20 gap-20">
      {/* 헤더 */}
      <Header logo={true} before={false} />

      {/* 로그인 */}
      <View className="gap-3">
        <TextInput
          placeholder="이메일을 입력해 주세요"
          placeholderTextColor="#A3A3A3"
          inputMode="email"
          value={email}
          onChangeText={setEmail}
          className="px-5 py-3 bg-neutral-50 rounded-xl text-sm text-neutral-800"
        />
        <View className="relative gap-4">
          <TextInput
            placeholder="비밀번호를 입력해 주세요"
            placeholderTextColor="#A3A3A3"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={option}
            className="px-5 py-3 bg-neutral-50 rounded-xl text-sm text-neutral-800"
          />

          <TouchableOpacity
            onPress={() => setOption(!option)}
            className="absolute top-4 right-5"
          >
            {option ? (
              <Eye color="#A3A3A3" size={20} />
            ) : (
              <EyeOff color="#A3A3A3" size={20} />
            )}
          </TouchableOpacity>
          <View className="p-1" />

          <View className="gap-3">
            {/* 로그인 버튼 */}
            <CustomButton
              title="로그인"
              fill={true}
              full={true}
              disable={false}
              onPress={handleLogin}
            />

            {/* 회원가입 버튼 */}
            <CustomButton
              title="회원가입"
              fill={false}
              full={true}
              disable={false}
              onPress={() => navigation.navigate("Signup")}
            />
          </View>
        </View>
      </View>

      {/* 간편 로그인 */}
      <View className="gap-10">
        <View className="w-full h-[1px] bg-neutral-200" />
        <Text className="text-center text-sm font-semibold text-neutral-800">
          간편 로그인
        </Text>
        <View className="flex-row gap-5 justify-center">
          <TouchableOpacity onPress={handleKakaoLogin}>
            <LogoKakao />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNaverLogin}>
            <LogoNaver />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
