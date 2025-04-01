import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FishingStackParams } from "../../api/types/FishingStackParams";
import { FishingListScreen } from "../../screens/fishingListScreen";
import { FishingScreen } from "../../screens/fishingScreen";

const Stack = createNativeStackNavigator<FishingStackParams>();

export function FishingStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FishingList" component={FishingListScreen} />
      <Stack.Screen name="Fishing" component={FishingScreen} />
    </Stack.Navigator>
  );
}
