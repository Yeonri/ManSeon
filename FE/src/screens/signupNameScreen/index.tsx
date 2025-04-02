import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignupStackParams } from "../../api/types/SignupStackParams";
import { ErrorMessage } from "../../components/common/errorMessage";
import { FullButton } from "../../components/common/fullButton";
import { HeaderBefore } from "../../components/common/headerBefore";
import { ProgressBar } from "../../components/signup/progressBar";

interface SignupNameScreenNavigationProps
  extends NativeStackNavigationProp<SignupStackParams> {}

export function SignupNameScreen() {
  const navigation = useNavigation<SignupNameScreenNavigationProps>();
  const [name, setName] = useState<string>("");
  const [touchedName, setTouchedName] = useState<boolean>(false);

  function handleName(text: string) {
    setTouchedName(true);
    // 이름은 한글만 허용
    const newText = text.replace(/[^가-힣]/g, "");
    setName(newText);
  }

  return (
    <SafeAreaView>
      <HeaderBefore />
      <View className="mx-10 gap-24">
        <View>
          <View className="mt-10 mb-10 gap-1">
            <Text className="font-bold text-4xl text-blue-500">이름을</Text>
            <Text className="font-bold text-4xl text-blue-500">
              입력해주세요
            </Text>
          </View>
          <ProgressBar num={1} />
        </View>
        <View>
          <TextInput
            placeholder="이름을 입력해 주세요"
            placeholderTextColor="#A1A1A1"
            onChangeText={(text) => handleName(text)}
            className={`p-4 rounded-2xl text-neutral-800 bg-neutral-100 ${!name && touchedName ? "border-2 border-error" : ""}`}
          />
          {!name && touchedName ? (
            <ErrorMessage content="입력 값이 올바르지 않습니다" />
          ) : (
            <View />
          )}
        </View>
        <FullButton
          name="다음"
          onPress={() => navigation.navigate("PhoneNum")}
        />
      </View>
    </SafeAreaView>
  );
}
