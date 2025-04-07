import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUploadNickname } from "../../api/quries/useUploadNickname";
import { SignupStackParams } from "../../api/types/SignupStackParams";
import { ErrorMessage } from "../../components/common/errorMessage";
import { FullButton } from "../../components/common/fullButton";
import { HeaderBefore } from "../../components/common/headerBefore";

interface SignupNameScreenNavigationProps
  extends NativeStackNavigationProp<SignupStackParams> {}

export function NicknameScreen() {
  const navigation = useNavigation<SignupNameScreenNavigationProps>();
  const route = useRoute<RouteProp<SignupStackParams, "Nickname">>();
  const { email } = route.params;
  const [nickname, setNickname] = useState<string>("");
  const [touchedNickname, setTouchedNickname] = useState<boolean>(false);
  const [next, setNext] = useState(false);
  const { mutate: uploadNickname } = useUploadNickname();

  function handleNickname(text: string) {
    setTouchedNickname(true);
    setNickname(text);

    const isValid = text.length > 0 && !text.includes(" ");
    setNext(isValid);
  }

  function handleUploadNickname() {
    uploadNickname(
      { email, nickname },
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
          name="다음"
          disable={!next}
          onPress={handleUploadNickname}
        />
      </View>
    </SafeAreaView>
  );
}
