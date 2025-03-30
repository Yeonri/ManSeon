import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigator } from "../bottomTabNavigator";
import { CameraScreen } from "../../screens/cameraScreen";
import { RecordScreen } from "../../screens/recordScreen";

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
