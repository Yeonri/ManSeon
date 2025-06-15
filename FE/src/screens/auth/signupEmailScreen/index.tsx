import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorMessage } from "../../../components/common/errorMessage";
import { FullButton } from "../../../components/common/fullButton";
import { HeaderBefore } from "../../../components/common/headerBefore";
import { ProgressBar } from "../../../components/signup/progressBar";
import { SignupStackParams } from "../../../navigation/types";
import { useCheckEmailDuplication } from "../../../api/queries/auth";
import handleError from "../../../utils/handleError";

interface SignupEmailScreenNavigationProps
  extends NativeStackNavigationProp<SignupStackParams> {}

export function SignupEmailScreen() {
  const navigation = useNavigation<SignupEmailScreenNavigationProps>();

  const [email, setEmail] = useState<string>("");
  const [touchedEmail, setTouchedEmail] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);

  const { mutate: checkEmail } = useCheckEmailDuplication();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 입력값 검증
  function handleEmail(text: string) {
    setTouchedEmail(true);
    const newText = text.replace(/[^a-zA-Z0-9@._-]/g, "");
    setEmail(newText);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newText);

    setNext(text === newText && isValid);
  }

  // 다음
  async function handleNext() {
    setIsLoading(true);
    try {
      // 이메일 중복 확인
      const response = await checkEmail(email);

      // 중복이 아닌 경우 핸드폰 번호 등록 화면으로 이동
      if (response) {
        navigation.navigate("Phone", {
          email: email,
        });
      } else {
        Alert.alert("이메일 중복", "이미 사용 중인 이메일입니다.");
      }
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <HeaderBefore />
      <View className="mx-10 gap-24">
        {/* 제목 */}
        <View>
          <View className="mt-10 mb-10 gap-1">
            <Text className="font-bold text-3xl text-blue-500">이메일을</Text>
            <Text className="font-bold text-3xl text-blue-500">
              입력해주세요
            </Text>
          </View>
          <ProgressBar num={1} />
        </View>

        {/* 입력창 */}
        <View>
          <TextInput
            placeholder="이메일을 입력해 주세요"
            placeholderTextColor="#A3A3A3"
            inputMode="email"
            value={email}
            onChangeText={(text) => handleEmail(text)}
            className={`px-5 py-3 bg-neutral-100 rounded-xl text-sm border-2 ${!next && touchedEmail ? "border-error" : "border-neutral-100"}`}
          />
          {!next && touchedEmail ? (
            <ErrorMessage content="입력 값이 올바르지 않습니다" />
          ) : (
            <View />
          )}
        </View>

        {/* 버튼 */}
        <FullButton
          name={isLoading ? "확인 중..." : "다음"}
          disable={!next || isLoading}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}
