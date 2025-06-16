import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigator } from "../bottomTabNavigator";
import { RootStackParams } from "../types";
import CameraScreen from "../../screens/camera/cameraScreen";
import AddRecordScreen from "../../screens/camera/addRecordScreen";

export function RootNavigator() {
  const Stack = createNativeStackNavigator<RootStackParams>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="AddRecord" component={AddRecordScreen} />
    </Stack.Navigator>
  );
}
