import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignupStackParams } from "../../api/types/SignupStackParams";
import { ErrorMessage } from "../../components/common/errorMessage";
import { FullButton } from "../../components/common/fullButton";
import { HeaderBefore } from "../../components/common/headerBefore";
import { ProgressBar } from "../../components/signup/progressBar";

interface SignupPasswordScreenNavigationProps
  extends NativeStackNavigationProp<SignupStackParams> {}

export function SignupPasswordScreen() {
  const navigation = useNavigation<SignupPasswordScreenNavigationProps>();
  const route = useRoute<RouteProp<SignupStackParams, "Password">>();
  const { name, phone, email } = route.params;
  const [password, setPassword] = useState<string>("");
  const [touchedPassword, setTouchedPassword] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [seeOption1, setSeeOption1] = useState<boolean>(true);

  function handlePassword(text: string) {
    setTouchedPassword(true);
    const newText = text.replace(/[^a-zA-Z0-9]/g, "");
    setPassword(newText);
    setValidPassword(newText.length >= 6 && text === newText);
  }

  return (
    <SafeAreaView>
      <HeaderBefore />
      <View className="mx-10 gap-24">
        <View>
          <View className="mt-10 mb-10 gap-1">
            <Text className="font-bold text-4xl text-blue-500">비밀번호를</Text>
            <Text className="font-bold text-4xl text-blue-500">
              입력해주세요
            </Text>
          </View>
          <ProgressBar num={4} />
        </View>
        <View className="relative">
          <TextInput
            placeholder="영어 대/소문자, 숫자 6자리 이상"
            placeholderTextColor="#A1A1A1"
            value={password}
            onChangeText={(text) => handlePassword(text)}
            secureTextEntry={seeOption1}
            className={`p-4 rounded-2xl text-neutral-800 bg-neutral-100 ${touchedPassword && (!password || !validPassword) ? "border-2 border-error" : ""}`}
          />
          {touchedPassword && (!password || !validPassword) ? (
            <ErrorMessage content="입력 값이 올바르지 않습니다" />
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
          name="다음"
          disable={!validPassword}
          onPress={() =>
            navigation.navigate("PasswordCheck", {
              name: name,
              phone: phone,
              email: email,
              password: password,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}
