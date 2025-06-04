import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NicknameScreen } from "../../screens/auth/nicknameScreen";
import { SignupEmailScreen } from "../../screens/auth/signupEmailScreen";
import { SignupNameScreen } from "../../screens/auth/signupNameScreen";
import { SignupPasswordScreen } from "../../screens/auth/signupPasswordScreen";
import { SignupPhoneNumScreen } from "../../screens/auth/signupPhoneNumScreen";
import { SignupStackParams } from "../types";

const Stack = createNativeStackNavigator<SignupStackParams>();

export function SignupStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Name" component={SignupNameScreen} />
      <Stack.Screen name="PhoneNum" component={SignupPhoneNumScreen} />
      <Stack.Screen name="Email" component={SignupEmailScreen} />
      <Stack.Screen name="Password" component={SignupPasswordScreen} />
      <Stack.Screen name="Nickname" component={NicknameScreen} />
    </Stack.Navigator>
  );
}
