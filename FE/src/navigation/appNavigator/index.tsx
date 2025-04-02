import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CameraScreen } from "../../screens/cameraScreen";
import { RecordScreen } from "../../screens/recordScreen";
import { BottomTabNavigator } from "../bottomTabNavigator";

export function AppNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Record" component={RecordScreen} />
    </Stack.Navigator>
  );
}
