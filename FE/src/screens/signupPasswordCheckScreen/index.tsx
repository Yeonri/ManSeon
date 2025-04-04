import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParams } from "../../api/types/AuthStackParams";
import { SignupStackParams } from "../../api/types/SignupStackParams";
import { ErrorMessage } from "../../components/common/errorMessage";
import { FullButton } from "../../components/common/fullButton";
import { HeaderBefore } from "../../components/common/headerBefore";
import { ProgressBar } from "../../components/signup/progressBar";
import { useSignup } from "../../api/quries/useSignup";

interface SignupPasswordCheckScreenNavigationProps
  extends NativeStackNavigationProp<AuthStackParams> {}

export function SignupPasswordCheckScreen() {
  const navigation = useNavigation<SignupPasswordCheckScreenNavigationProps>();
  const route = useRoute<RouteProp<SignupStackParams, "PasswordCheck">>();
  const { name, phone, email, password } = route.params;
  const [NewPassword, setNewPassword] = useState<string>("");
  const [touchedPassword, setTouchedPassword] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [seeOption1, setSeeOption1] = useState<boolean>(true);
  const { mutate: signup } = useSignup();

  function handlePassword(text: string) {
    setTouchedPassword(true);
    const newText = text.replace(/[^a-zA-Z0-9]/g, "");
    setNewPassword(newText);

    setValidPassword(
      newText.length >= 6 && text === newText && newText === password
    );
  }

  function handleSignup() {
    signup(
      { email, password, name, phoneNum: phone },
      {
        onSuccess: () => {
          Alert.alert("회원가입 성공", "로그인 후 이용해주세요.");
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
        onError: () => {
          Alert.alert("회원가입 실패", "잠시 후 다시 시도해주세요.");
        },
      }
    );
  }

  return (
    <SafeAreaView>
      <HeaderBefore />
      <View className="mx-10 gap-24">
        <View>
          <View className="mt-10 mb-10 gap-1">
            <Text className="font-bold text-4xl text-blue-500">비밀번호를</Text>
            <Text className="font-bold text-4xl text-blue-500">
              다시 입력해주세요
            </Text>
          </View>
          <ProgressBar num={4} />
        </View>
        <View className="relative">
          <TextInput
            placeholder="영어 대/소문자, 숫자 6자리 이상"
            placeholderTextColor="#A1A1A1"
            value={NewPassword}
            onChangeText={(text) => handlePassword(text)}
            secureTextEntry={seeOption1}
            className={`p-4 rounded-2xl text-neutral-800 bg-neutral-100 ${touchedPassword && !validPassword ? "border-2 border-error" : ""}`}
          />
          {touchedPassword && !validPassword ? (
            <ErrorMessage content="비밀번호가 동일하지 않습니다" />
          ) : (
            <View />
          )}
          <TouchableOpacity
            onPress={() => setSeeOption1(!seeOption1)}
            className="absolute top-5 right-5"
          >
            {seeOption1 ? <Eye color="#525252" /> : <EyeOff color="#525252" />}
          </TouchableOpacity>
        </View>
        <FullButton
          name="회원가입"
          disable={!validPassword}
          onPress={handleSignup}
        />
      </View>
    </SafeAreaView>
  );
}
