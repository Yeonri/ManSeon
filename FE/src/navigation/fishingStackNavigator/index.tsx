import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FishingListScreen } from "../../screens/fishingListScreen";
import { FishingScreen } from "../../screens/fishingScreen";
import { FishingStackParams } from "../../types/FishingStackParams";

const Stack = createNativeStackNavigator<FishingStackParams>();

export function FishingStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FishingList" component={FishingListScreen} />
      <Stack.Screen name="Fishing" component={FishingScreen} />
    </Stack.Navigator>
  );
}
