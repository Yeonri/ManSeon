import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CameraScreen } from "../../screens/cameraScreen";
import { ChatbotScreen } from "../../screens/chatbotScreen";
import { RecordScreen } from "../../screens/recordScreen";
import { BottomTabNavigator } from "../bottomTabNavigator";
import { RootStackParams } from "../../api/types/RootStackParams";

export function AppNavigator() {
  const Stack = createNativeStackNavigator<RootStackParams>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Record" component={RecordScreen} />
      <Stack.Screen name="Chatbot" component={ChatbotScreen} />
    </Stack.Navigator>
  );
}
