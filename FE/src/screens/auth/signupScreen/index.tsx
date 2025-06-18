import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParams } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Header from "../../../components/common/header";
import CustomButton from "../../../components/common/customButton";
import { ScrollView } from "react-native-gesture-handler";
import {
  validateCheckPassword,
  validateEmail,
  validateNickname,
  validatePassword,
  validatePhone,
} from "../../../utils/validateion";
import {
  useCheckEmailDuplication,
  useCheckNicknameDuplication,
  useSignup,
} from "../../../api/queries/auth";
import FormField from "../../../components/auth/formField";

interface SignupScreenNavigationProps
  extends NativeStackNavigationProp<AuthStackParams, "Signup"> {}

export function SignupScreen() {
  const navigation = useNavigation<SignupScreenNavigationProps>();

  const [isFormValid, setIsFormValid] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [option1, setOption1] = useState(true);

  const [checkPassword, setCheckPassword] = useState("");
  const [checkPasswordError, setCheckPasswordError] = useState("");
  const [option2, setOption2] = useState(true);

  const { refetch: emailDuplication } = useCheckEmailDuplication(email);
  const { refetch: nicknameDuplication } =
    useCheckNicknameDuplication(nickname);
  const { mutate: signup } = useSignup();

  // 이메일 유효성 검증
  function handleEmailChange(text: string) {
    setEmail(text);
    setEmailError(validateEmail(text));
  }

  // 닉네임 유효성 검증
  function handleNicknameChange(text: string) {
    setNickname(text);
    setNicknameError(validateNickname(text));
  }

  // 전화번호 유효성 검증
  function handlePhoneChange(text: string) {
    const cleaned = text.replace(/[^0-9]/g, "");
    setPhone(cleaned);
    setPhoneError(validatePhone(cleaned));
  }

  // 비밀번호 유효성 검증
  function handlePasswordChange(text: string) {
    setPassword(text);
    setPasswordError(validatePassword(text));
  }

  // 비밀번호 확인 유효성 검증
  function handleCheckPasswordChange(text: string) {
    setCheckPassword(text);
    setCheckPasswordError(validateCheckPassword(text, password));
  }

  // 이메일 중복 확인
  function handleEmailDuplication() {
    if (emailError || email === "") return;
    emailDuplication().then(({ data }) => {
      if (data?.isDuplicate) {
        setEmailError("이미 사용 중인 이메일입니다.");
      } else {
        setEmailError("");
      }
    });
  }

  // 닉네임 중복 확인
  function handleNicknameDuplication() {
    if (nicknameError || nickname === "") return;
    nicknameDuplication().then(({ data }) => {
      if (data?.isDuplicate) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
      } else {
        setNicknameError("");
      }
    });
  }

  // 회원가입
  function handleSubmit() {
    if (!isFormValid) return;

    signup(
      { email, password, nickname, phone },
      {
        onSuccess: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      }
    );
  }

  useEffect(() => {
    const isValid =
      !emailError &&
      !nicknameError &&
      !phoneError &&
      !passwordError &&
      !checkPasswordError &&
      email !== "" &&
      nickname !== "" &&
      phone !== "" &&
      password !== "" &&
      checkPassword !== "";
    setIsFormValid(isValid);
  }, [
    email,
    nickname,
    phone,
    password,
    checkPassword,
    emailError,
    nicknameError,
    phoneError,
    passwordError,
    checkPasswordError,
  ]);

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <Header logo={false} before={true} />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="mx-10 text-blue-500 text-3xl font-bold">
            회원가입
          </Text>

          {/* 입력창 */}
          <View className="m-10 gap-5">
            {/* 이메일 입력창 */}
            <FormField
              label="이메일"
              value={email}
              onChangeText={handleEmailChange}
              error={emailError}
              placeholder="이메일을 입력해 주세요"
              hasButton
              onButtonPress={handleEmailDuplication}
              buttonLabel="중복 확인"
              buttonDisabled={!!emailError || email.trim() === ""}
            />

            {/* 닉네임 입력창 */}
            <FormField
              label="닉네임"
              value={nickname}
              onChangeText={handleNicknameChange}
              error={nicknameError}
              placeholder="닉네임을 입력해 주세요"
              hasButton
              onButtonPress={handleNicknameDuplication}
              buttonLabel="중복 확인"
              buttonDisabled={!!nicknameError || nickname.trim() === ""}
            />

            {/* 전화번호 입력창 */}
            <FormField
              label="전화번호"
              value={phone}
              onChangeText={handlePhoneChange}
              error={phoneError}
              placeholder="전화번호를 입력해 주세요"
            />

            {/* 비밀번호 입력창 */}
            <FormField
              label="비밀번호"
              value={password}
              onChangeText={handlePasswordChange}
              error={passwordError}
              placeholder="비밀번호를 입력해 주세요"
              secure={option1}
              toggleSecure={() => setOption1(!option1)}
              showSecureToggle
            />

            {/* 비밀번호 확인 입력창 */}
            <FormField
              label="비밀번호 확인"
              value={checkPassword}
              onChangeText={handleCheckPasswordChange}
              error={checkPasswordError}
              placeholder="비밀번호를 다시 입력해 주세요"
              secure={option2}
              toggleSecure={() => setOption2(!option2)}
              showSecureToggle
            />
          </View>
        </ScrollView>

        <View className="absolute bottom-6 left-10 right-10">
          <CustomButton
            title="확인"
            fill
            full
            disable={!isFormValid}
            onPress={handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
