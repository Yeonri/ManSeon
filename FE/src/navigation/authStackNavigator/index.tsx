import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParams } from "../types";
import { LoginScreen } from "../../screens/auth/loginScreen";
import { SignupScreen } from "../../screens/auth/signupScreen";

const Stack = createNativeStackNavigator<AuthStackParams>();

export function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 로그인 */}
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* 회원가입 */}
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
