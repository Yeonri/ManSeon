import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParams } from "../types";
import { LoginScreen } from "../../screens/auth/loginScreen";
import { SignupScreen } from "../../screens/auth/signupScreen";

const Stack = createNativeStackNavigator<AuthStackParams>();

export function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
