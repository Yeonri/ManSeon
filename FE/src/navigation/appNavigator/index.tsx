import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CameraScreen } from "../../screens/camera/cameraScreen";
import { RecordScreen } from "../../screens/camera/recordScreen";
import { ChatbotScreen } from "../../screens/chat/chatbotScreen";
import { BottomTabNavigator } from "../bottomTabNavigator";
import { AppStackParams } from "../types";

export function AppNavigator() {
  const Stack = createNativeStackNavigator<AppStackParams>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Record" component={RecordScreen} />
      <Stack.Screen name="Chatbot" component={ChatbotScreen} />
    </Stack.Navigator>
  );
}
