import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParams } from "../../api/types/AuthStackParams";
import { ErrorMessage } from "../../components/common/errorMessage";
import { FullButton } from "../../components/common/fullButton";
import { HeaderBefore } from "../../components/common/headerBefore";

interface SignupScreenNavigationProps
  extends NativeStackNavigationProp<AuthStackParams, "Signup"> {}

export function SignUpScreen() {
  const navigation = useNavigation<SignupScreenNavigationProps>();
  const [name, setName] = useState<string>("");
  const [touchedName, setTouchedName] = useState<boolean>(false);
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [touchedPhoneNum, setTouchedPhoneNum] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [touchedEmail, setTouchedEmail] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [touchedPassword, setTouchedPassword] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [seeOption1, setSeeOption1] = useState<boolean>(true);
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [touchedCheckPassword, setTouchedCheckPassword] =
    useState<boolean>(false);
  const [validCheckPassword, setValidCheckPassword] = useState<boolean>(false);
  const [seeOption2, setSeeOption2] = useState<boolean>(true);

  function handleName(text: string) {
    setTouchedName(true);
    // 이름은 한글만 허용
    const newText = text.replace(/[^가-힣]/g, "");
    setName(newText);
  }

  function handlePhoneNum(text: string) {
    setTouchedPhoneNum(true);
    // 번호는 숫자만 허용
    const newText = text.replace(/[^0-9]/g, "");
    setPhoneNum(newText);
  }

  function handleEmail(text: string) {
    setTouchedEmail(true);
    // 이메일은 한글 불가능
    const newText = text.replace(/[^a-zA-Z0-9@._-]/g, "");
    setEmail(newText);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    regex.test(newText) ? setValidEmail(true) : setValidEmail(false);
  }

  function handlePassword(text: string) {
    setTouchedPassword(true);
    // 비밀번호는 영어 대소문자, 숫자만 가능
    const newText = text.replace(/[^a-zA-Z0-9]/g, "");
    setPassword(newText);
    newText.length > 6 ? setValidPassword(true) : setValidPassword(false);
  }

  function handleCheckPassword(text: string) {
    setTouchedCheckPassword(true);
    // 비밀번호는 영어 대소문자, 숫자만 가능
    const newText = text.replace(/[^a-zA-Z0-9]/g, "");
    setCheckPassword(newText);
    newText === password
      ? setValidCheckPassword(true)
      : setValidCheckPassword(false);
  }

  return (
    <SafeAreaView>
      <HeaderBefore />
      <ScrollView>
        <View className="mx-10">
          <Text className="mb-14 font-bold text-4xl text-blue-500">
            회원가입
          </Text>
          <View className="gap-5 ㅡㅠ-40">
            <View>
              <Text className="font-bold text-lg text-neutral-600">이름</Text>
              <TextInput
                placeholder="이름을 입력해 주세요"
                placeholderTextColor="#A1A1A1"
                onChangeText={(text) => handleName(text)}
                className={`text-neutral-800 border-b ${!name && touchedName ? "border-error" : "border-neutral-200"}`}
              />
              {!name && touchedName ? (
                <ErrorMessage content="입력 값이 올바르지 않습니다" />
              ) : (
                <View />
              )}
            </View>
            <View className="gap-5">
              <View>
                <Text className="font-bold text-lg text-neutral-600">
                  전화번호
                </Text>
                <TextInput
                  placeholder="전화번호를 입력해 주세요 (숫자만 입력)"
                  placeholderTextColor="#A1A1A1"
                  inputMode="tel"
                  onChangeText={(text) => handlePhoneNum(text)}
                  className={`text-neutral-800 border-b ${!phoneNum && touchedPhoneNum ? "border-error" : "border-neutral-200"}`}
                />
                {!phoneNum && touchedPhoneNum ? (
                  <ErrorMessage content="입력 값이 올바르지 않습니다" />
                ) : (
                  <View />
                )}
              </View>
            </View>
            <View className="gap-5">
              <View>
                <Text className="font-bold text-lg text-neutral-600">
                  이메일
                </Text>
                <TextInput
                  placeholder="이메일을 입력해 주세요"
                  placeholderTextColor="#A1A1A1"
                  inputMode="email"
                  onChangeText={(text) => handleEmail(text)}
                  className={`text-neutral-800 border-b ${touchedEmail && (!email || !validEmail) ? "border-error" : "border-neutral-200"}`}
                />
                {touchedEmail && (!email || !validEmail) ? (
                  <ErrorMessage content="입력 값이 올바르지 않습니다" />
                ) : (
                  <View />
                )}
              </View>
            </View>
            <View className="gap-5">
              <View>
                <Text className="font-bold text-lg text-neutral-600">
                  비밀번호
                </Text>
                <TextInput
                  placeholder="영어 대소문자, 숫자 6자리 이상"
                  placeholderTextColor="#A1A1A1"
                  onChangeText={(text) => handlePassword(text)}
                  secureTextEntry={seeOption1}
                  className={`text-neutral-800 border-b ${touchedPassword && (!password || !validPassword) ? "border-error" : "border-neutral-200"}`}
                />
                {touchedPassword && (!password || !validPassword) ? (
                  <ErrorMessage content="입력 값이 올바르지 않습니다" />
                ) : (
                  <View />
                )}
              </View>
              <TouchableOpacity
                onPress={() => setSeeOption1(!seeOption1)}
                className="absolute top-11 right-5"
              >
                {seeOption1 ? <Eye /> : <EyeOff />}
              </TouchableOpacity>
            </View>
            <View className="gap-5">
              <View>
                <Text className="font-bold text-lg text-neutral-600">
                  비밀번호 확인
                </Text>
                <TextInput
                  placeholder="비밀번호를 다시 입력해주세요"
                  placeholderTextColor="#A1A1A1"
                  onChangeText={(text) => handleCheckPassword(text)}
                  secureTextEntry={seeOption2}
                  className={`text-neutral-800 border-b ${touchedPassword && (!password || !validPassword) ? "border-error" : "border-neutral-200"}`}
                />
                {touchedCheckPassword &&
                (!checkPassword || !validCheckPassword) ? (
                  <ErrorMessage content="비밀번호가 동일하지 않습니다" />
                ) : (
                  <View />
                )}
              </View>
              <TouchableOpacity
                onPress={() => setSeeOption2(!seeOption2)}
                className="absolute top-11 right-5"
              >
                {seeOption2 ? <Eye /> : <EyeOff />}
              </TouchableOpacity>
            </View>
          </View>
          <View className="m-10" />
          <FullButton
            name="다음"
            onPress={() => navigation.navigate("Nickname")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
