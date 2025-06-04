import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetCheckNickname } from "../../../api/quries/useCheck";
import { useSignup } from "../../../api/quries/useSignup";
import { ErrorMessage } from "../../../components/common/errorMessage";
import { FullButton } from "../../../components/common/fullButton";
import { HeaderBefore } from "../../../components/common/headerBefore";
import { SignupStackParams } from "../../../navigation/types";


interface SignupNameScreenNavigationProps
  extends NativeStackNavigationProp<SignupStackParams> {}

export function NicknameScreen() {
  const navigation = useNavigation<SignupNameScreenNavigationProps>();
  const route = useRoute<RouteProp<SignupStackParams, "Nickname">>();
  const { name, email, phone, password } = route.params;
  const [nickname, setNickname] = useState<string>("");
  const [touchedNickname, setTouchedNickname] = useState<boolean>(false);
  const [next, setNext] = useState(false);
  const { mutate: signup } = useSignup();
  const { refetch: checkNickname } = useGetCheckNickname(nickname);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // console.log("입력 정보:", name, email, phone, password);

  function handleNickname(text: string) {
    setTouchedNickname(true);
    setNickname(text);

    const isValid = text.length > 0 && !text.includes(" ");
    setNext(isValid);
  }

  async function handleNext() {
    setIsLoading(true);
    try {
      const response = await checkNickname();
      console.log("응답 전체:", response);
      console.log(
        "닉네임 중복 여부 확인(true가 가입 가능)",
        response.isSuccess
      );
      if (response.isSuccess === true) {
        signup(
          { email, password, name, phoneNum: phone, nickname },
          {
            onSuccess: () => {
              Alert.alert("회원가입 성공", "로그인 후 이용해주세요.");
              navigation.getParent()?.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            },
          }
        );
      } else {
        Alert.alert("닉네임 중복", "이미 사용 중인 닉네임입니다.");
      }
    } catch (e: unknown) {
      if (
        typeof e === "object" &&
        e !== null &&
        "response" in e &&
        (e as any).response?.data?.message?.includes("이미")
      ) {
        Alert.alert("닉네임 중복", (e as any).response.data.message);
      } else {
        Alert.alert("오류", "닉네임 확인 중 문제가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <HeaderBefore />
      <View className="mx-10 gap-24">
        <View>
          <View className="mt-10 mb-10 gap-1">
            <Text className="font-bold text-4xl text-blue-500">닉네임을</Text>
            <Text className="font-bold text-4xl text-blue-500">
              입력해주세요
            </Text>
          </View>
        </View>
        <View>
          <TextInput
            placeholder="닉네임을 입력해 주세요"
            placeholderTextColor="#A1A1A1"
            value={nickname}
            onChangeText={(text) => handleNickname(text)}
            className={`p-4 rounded-2xl text-neutral-800 bg-neutral-100 ${!next && touchedNickname ? "border-2 border-error" : ""}`}
          />
          {!next && touchedNickname ? (
            <ErrorMessage content="공백 없이 입력해 주세요" />
          ) : (
            <View />
          )}
        </View>
        <FullButton
          name={isLoading ? "확인 중..." : "다음"}
          disable={!next || isLoading}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}
