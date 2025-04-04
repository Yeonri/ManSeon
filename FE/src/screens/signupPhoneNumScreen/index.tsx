import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignupStackParams } from "../../api/types/SignupStackParams";
import { ErrorMessage } from "../../components/common/errorMessage";
import { FullButton } from "../../components/common/fullButton";
import { HeaderBefore } from "../../components/common/headerBefore";
import { ProgressBar } from "../../components/signup/progressBar";

interface SignupPhoneNumScreenNavigationProps
  extends NativeStackNavigationProp<SignupStackParams> {}

export function SignupPhoneNumScreen() {
  const navigation = useNavigation<SignupPhoneNumScreenNavigationProps>();
  const route = useRoute<RouteProp<SignupStackParams, "PhoneNum">>();
  const { name } = route.params;
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [touchedPhoneNum, setTouchedPhoneNum] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);

  function handlePhoneNum(text: string) {
    setTouchedPhoneNum(true);
    const newText = text.replace(/[^0-9]/g, "");
    setPhoneNum(newText);

    if (text === newText && newText.length >= 7) {
      setNext(true);
    } else {
      setNext(false);
    }
  }

  function handleNext() {
    navigation.navigate("Email", { name: name, phone: phoneNum });
  }

  return (
    <SafeAreaView>
      <HeaderBefore />
      <View className="mx-10 gap-24">
        <View>
          <View className="mt-10 mb-10 gap-1">
            <Text className="font-bold text-4xl text-blue-500">전화번호를</Text>
            <Text className="font-bold text-4xl text-blue-500">
              입력해주세요
            </Text>
          </View>
          <ProgressBar num={2} />
        </View>
        <View>
          <TextInput
            placeholder="숫자만 입력해 주세요"
            placeholderTextColor="#A1A1A1"
            inputMode="tel"
            value={phoneNum}
            onChangeText={(text) => handlePhoneNum(text)}
            className={`p-4 rounded-2xl text-neutral-800 bg-neutral-100 ${!next && touchedPhoneNum ? "border-2 border-error" : ""}`}
          />
          {!next && touchedPhoneNum ? (
            <ErrorMessage content="7자리 이상 숫자를 입력해 주세요" />
          ) : (
            <View />
          )}
        </View>
        <FullButton
          name="다음"
          disable={!next ? true : false}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}
