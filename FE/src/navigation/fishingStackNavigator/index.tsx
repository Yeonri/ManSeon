import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FishingListScreen } from "../../screens/camera/fishingListScreen";
import { FishingScreen } from "../../screens/camera/fishingScreen";
import { FishingStackParams } from "../types";

const Stack = createNativeStackNavigator<FishingStackParams>();

export function FishingStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FishingList" component={FishingListScreen} />
      <Stack.Screen name="Fishing" component={FishingScreen} />
    </Stack.Navigator>
  );
}
