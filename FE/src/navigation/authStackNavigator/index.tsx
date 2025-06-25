import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../api/types/AuthStackParams";
import { LoginScreen } from "../../screens/loginScreen";
import { SignupStackNavigator } from "../signupStackNavigator";

const Stack = createNativeStackNavigator<AuthStackParams>();

export function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupStackNavigator} />
    </Stack.Navigator>
  );
}
