import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignupStackParams } from "../../api/types/SignupStackParams";
import { ErrorMessage } from "../../components/common/errorMessage";
import { FullButton } from "../../components/common/fullButton";
import { HeaderBefore } from "../../components/common/headerBefore";
import { ProgressBar } from "../../components/signup/progressBar";
import { useGetCheckEmail } from "../../api/quries/useCheck";
import { handleError } from "../../utils/handleError";

interface SignupEmailScreenNavigationProps
  extends NativeStackNavigationProp<SignupStackParams> {}

export function SignupEmailScreen() {
  const navigation = useNavigation<SignupEmailScreenNavigationProps>();
  const route = useRoute<RouteProp<SignupStackParams, "Email">>();
  const { username, phone } = route.params;
  const [email, setEmail] = useState<string>("");
  const [touchedEmail, setTouchedEmail] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);
  const { refetch: checkEmail } = useGetCheckEmail(email);

  function handleEmail(text: string) {
    setTouchedEmail(true);
    const newText = text.replace(/[^a-zA-Z0-9@._-]/g, "");
    setEmail(newText);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newText);

    setNext(text === newText && isValid);
  }

  async function handleNext() {
    try {
      const { data } = await checkEmail();
      // console.log("이메일 중복 여부 확인(true가 가입 가능): ", data);
      if (data?.ableToUse === true) {
        navigation.navigate("Password", {
          username: username,
          phone: phone,
          email: email,
        });
      } else {
        Alert.alert("이메일 중복", "이미 사용 중인 이메일입니다.");
      }
    } catch (e: unknown) {
      handleError(e);
    }
  }

  return (
    <SafeAreaView>
      <HeaderBefore />
      <View className="mx-10 gap-24">
        <View>
          <View className="mt-10 mb-10 gap-1">
            <Text className="font-bold text-4xl text-blue-500">이메일을</Text>
            <Text className="font-bold text-4xl text-blue-500">
              입력해주세요
            </Text>
          </View>
          <ProgressBar num={3} />
        </View>
        <View>
          <TextInput
            placeholder="이메일을 입력해 주세요"
            placeholderTextColor="#A1A1A1"
            inputMode="email"
            value={email}
            onChangeText={(text) => handleEmail(text)}
            className={`p-4 rounded-2xl text-neutral-800 bg-neutral-100 ${touchedEmail && !next ? "border-2 border-error" : ""}`}
          />
          {touchedEmail && !next ? (
            <ErrorMessage content="입력 값이 올바르지 않습니다" />
          ) : (
            <View />
          )}
        </View>
        <FullButton name="다음" disable={!next} onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
}
