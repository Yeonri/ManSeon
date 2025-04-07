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
  const [next, setNext] = useState(false);

  function handleName(text: string) {
    setTouchedName(true);
    setName(text);

    const hasSpace = /\s/.test(text);
    const newText = text.replace(/[^가-힣]/g, "");

    if (!hasSpace && newText.length >= 2 && newText) {
      setNext(true);
    } else setNext(false);
  }

  function handleNext() {
    if (name) {
      navigation.navigate("PhoneNum", { username: name });
    }
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
            value={name}
            onChangeText={(text) => handleName(text)}
            className={`p-4 rounded-2xl text-neutral-800 bg-neutral-100 ${!next && touchedName ? "border-2 border-error" : ""}`}
          />
          {!next && touchedName ? (
            <ErrorMessage content="공백 없이 한글 2자 이상을 입력해 주세요" />
          ) : (
            <View />
          )}
        </View>
        <FullButton name="다음" disable={!next} onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
}
