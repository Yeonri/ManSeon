import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLogin } from "../../api/quries/useLogin";
import { AuthStackParams } from "../../types/AuthStackParams";
// import LogoKakao from "../../assets/images/logo_kakao.svg";
// import LogoNaver from "../../assets/images/logo_naver.svg";
import { Eye, EyeOff } from "lucide-react-native";
import { FullButton } from "../../components/common/fullButton";
import { HeaderCenter } from "../../components/common/headerCenter";
import { useLoginStore } from "../../store/loginStore";
import tokenStorage from "../../utils/tokenStorage";

interface LoginScreenNavigationProps
  extends NativeStackNavigationProp<AuthStackParams, "Login"> {}

export function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [seeOption, setSeeOption] = useState<boolean>(true);
  const { mutate: login } = useLogin();
  const { setLogin } = useLoginStore();

  function handleLogin() {
    if (!email || !password) {
      Alert.alert("입력 오류", "이메일과 비밀번호 모두 입력해주세요.");
      return;
    }
    login(
      { email, password },
      {
        onSuccess: async (auth) => {
          await tokenStorage.save(auth.accessToken, auth.refreshToken);
          setLogin(auth);
        },
        onError: () => {
          Alert.alert("로그인 실패", "로그인 정보를 다시 확인해주세요.");
        },
      }
    );
  }

  return (
    <SafeAreaView className="gap-20 m-5">
      <View />
      <HeaderCenter />
      <View className="mx-5 gap-2">
        <View className="gap-5">
          <TextInput
            placeholder="이메일을 입력해 주세요"
            placeholderTextColor="#A1A1A1"
            inputMode="email"
            value={email}
            onChangeText={setEmail}
            className="p-4 rounded-2xl text-neutral-800 bg-neutral-100"
          />
          <View className="relative gap-4">
            <TextInput
              placeholder="비밀번호를 입력해 주세요"
              placeholderTextColor="#A1A1A1"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={seeOption}
              className="p-4 rounded-2xl text-neutral-800 bg-neutral-100"
            />

            <TouchableOpacity
              onPress={() => setSeeOption(!seeOption)}
              className="absolute top-5 right-5"
            >
              {seeOption ? <Eye color="#525252" /> : <EyeOff color="#525252" />}
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-5 flex-row justify-end">
          {/* <TouchableOpacity onPress={() => {}}>
            <Text className="text-neutral-600">비밀번호 찾기</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text className="font-semibold text-neutral-600">회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FullButton name="로그인" disable={false} onPress={handleLogin} />
      {/* <View className="gap-10">
        <Text className="font-semibold text-center text-neutral-600">
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
      </View> */}
    </SafeAreaView>
  );
}
