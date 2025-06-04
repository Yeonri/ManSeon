import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../../screens/auth/loginScreen";
import { SignupStackNavigator } from "../signupStackNavigator";
import { AuthStackParams } from "../types";

const Stack = createNativeStackNavigator<AuthStackParams>();

export function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupStackNavigator} />
    </Stack.Navigator>
  );
}
