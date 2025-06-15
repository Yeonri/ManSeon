import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParams } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { ProgressBar } from "../../../components/signup/progressBar";
import { TextInput } from "react-native-gesture-handler";
import { ErrorMessage } from "../../../components/common/errorMessage";
import { FullButton } from "../../../components/common/fullButton";

interface SignupScreenNavigationProps
  extends NativeStackNavigationProp<AuthStackParams, "Signup"> {}

export function SignupScreen() {
  const navigation = useNavigation<SignupScreenNavigationProps>();

  return (
    <SafeAreaView>
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
        {/* <View>
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
        </View> */}

        {/* 버튼 */}
        {/* <FullButton
          name={isLoading ? "확인 중..." : "다음"}
          disable={!next || isLoading}
          onPress={handleNext}
        /> */}
      </View>
    </SafeAreaView>
  );
}
