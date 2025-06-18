import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";
import FormField from "../../../components/auth/formField";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsStackParams } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import {
  validateCheckPassword,
  validateNickname,
  validatePassword,
  validatePhone,
} from "../../../utils/validateion";
import { useCheckNicknameDuplication } from "../../../api/queries/auth";
import CustomButton from "../../../components/common/customButton";
import DefaultImage from "../../../assets/images/image_default.svg";
import selectImage from "../../../utils/selectImage";

interface MyInformationScreenNavigationProps
  extends NativeStackNavigationProp<SettingsStackParams, "MyInformation"> {}

export default function MyInformationScreen() {
  const navigation = useNavigation<MyInformationScreenNavigationProps>();

  const [isFormValid, setIsFormValid] = useState(false);

  // 임시 데이터
  const user = {
    nickname: "만선이",
    profileImg: "",
    email: "B210@naver.com",
    phone: "01012345678",
  };

  const [addImage, setAddImage] = useState<string>("");
  const [addImageBase64, setAddImageBase64] = useState<string>("");

  const [nickname, setNickname] = useState(user.nickname);
  const [nicknameError, setNicknameError] = useState("");

  const [phone, setPhone] = useState(user.phone);
  const [phoneError, setPhoneError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [option1, setOption1] = useState(true);

  const [checkPassword, setCheckPassword] = useState("");
  const [checkPasswordError, setCheckPasswordError] = useState("");
  const [option2, setOption2] = useState(true);

  const { refetch: nicknameDuplication } =
    useCheckNicknameDuplication(nickname);

  // 이미지 삭제
  function deleteImage() {
    Alert.alert("사진 삭제", "사진을 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          setAddImage("");
          setAddImageBase64("");
        },
      },
    ]);
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

  // 취소
  function handleCancel() {}

  // 저장
  function handleSubmit() {
    if (!isFormValid) return;

    // signup(
    //   { email, password, nickname, phone },
    //   {
    //     onSuccess: () => {
    //       navigation.reset({
    //         index: 0,
    //         routes: [{ name: "Login" }],
    //       });
    //     },
    //   }
    // );
  }

  useEffect(() => {
    const isValid =
      !nicknameError &&
      !phoneError &&
      !passwordError &&
      !checkPasswordError &&
      nickname !== "" &&
      phone !== "" &&
      password !== "" &&
      checkPassword !== "";
    setIsFormValid(isValid);
  }, [
    nickname,
    phone,
    password,
    checkPassword,
    nicknameError,
    phoneError,
    passwordError,
    checkPasswordError,
  ]);

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* 헤더 */}
        <Header logo={true} before={true} />

        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 입력창 */}
          <View className="mx-5">
            <View className="p-5 self-center gap-2 items-center">
              {/* 프로필 이미지 */}
              {addImage ? (
                <TouchableOpacity onPress={deleteImage}>
                  <Image
                    source={{ uri: addImage }}
                    className="w-[80px] h-[80px] rounded-full"
                    resizeMode="center"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    selectImage((uri, base64) => {
                      setAddImage(uri);
                      setAddImageBase64(base64);
                    });
                  }}
                >
                  <View
                    style={{
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <DefaultImage width={80} height={80} />
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <View className="flex-1 p-5 gap-5 mb-10">
              {/* 이메일 */}
              <View className="flex-1">
                <Text className="text-neutral-800 font-semibold">이메일</Text>
                <Text className="flex-1 px-3 py-4 text-sm text-neutral-400 border-b border-neutral-100">
                  {user.email}
                </Text>
              </View>

              {/* 닉네임 입력창 */}
              <FormField
                label="닉네임"
                value={nickname}
                onChangeText={handleNicknameChange}
                error={nicknameError}
                placeholder="닉네임을 입력해 주세요"
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

            <View className="flex-row justify-between items-center">
              <CustomButton
                title="취소"
                fill={false}
                full={false}
                onPress={handleCancel}
              />
              <CustomButton
                title="확인"
                fill={true}
                full={false}
                disable={!isFormValid}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
