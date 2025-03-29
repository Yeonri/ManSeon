import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigator } from "../bottomTabNavigator";
import { RecordScreen } from "../../screens/recordScreen";

export function AppNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bottomTabs" component={BottomTabNavigator} />
      <Stack.Screen name="record" component={RecordScreen} />
    </Stack.Navigator>
  );
}
