import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorMessage } from "../../../components/common/errorMessage";
import { FullButton } from "../../../components/common/fullButton";
import { HeaderBefore } from "../../../components/common/headerBefore";
import { ProgressBar } from "../../../components/signup/progressBar";
import { SignupStackParams } from "../../../navigation/types";
import handleError from "../../../utils/handleError";

interface SignupPhoneScreenNavigationProps
  extends NativeStackNavigationProp<SignupStackParams> {}

export function SignupPhoneScreen() {
  const navigation = useNavigation<SignupPhoneScreenNavigationProps>();
  const route = useRoute<RouteProp<SignupStackParams, "Phone">>();
  const { email } = route.params;

  const [phone, setPhone] = useState<string>("");
  const [touchedPhone, setTouchedPhone] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 입력값 검증
  function handlePhone(text: string) {
    setTouchedPhone(true);
    const newText = text.replace(/[^0-9]/g, "");
    setPhone(newText);

    if (text === newText && newText.length >= 7) {
      setNext(true);
    } else {
      setNext(false);
    }
  }

  // 다음
  async function handleNext() {
    setIsLoading(true);
    try {
      navigation.navigate("Nickname", { email: email, phone: phone });
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
            <Text className="font-bold text-3xl text-blue-500">전화번호를</Text>
            <Text className="font-bold text-3xl text-blue-500">
              입력해주세요
            </Text>
          </View>
          <ProgressBar num={2} />
        </View>

        {/* 입력창 */}
        <View>
          <TextInput
            placeholder="숫자만 입력해 주세요"
            placeholderTextColor="#A3A3A3"
            inputMode="tel"
            value={phone}
            onChangeText={(text) => handlePhone(text)}
            className={`px-5 py-3 bg-neutral-100 rounded-xl text-sm border-2 ${!next && touchedPhone ? "border-error" : "border-neutral-100"}`}
          />
          {!next && touchedPhone ? (
            <ErrorMessage content="7자리 이상 숫자를 입력해 주세요" />
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
