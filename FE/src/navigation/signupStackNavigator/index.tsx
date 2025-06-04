import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NicknameScreen } from "../../screens/nicknameScreen";
import { SignupEmailScreen } from "../../screens/signupEmailScreen";
import { SignupNameScreen } from "../../screens/signupNameScreen";
import { SignupPasswordScreen } from "../../screens/signupPasswordScreen";
import { SignupPhoneNumScreen } from "../../screens/signupPhoneNumScreen";
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
