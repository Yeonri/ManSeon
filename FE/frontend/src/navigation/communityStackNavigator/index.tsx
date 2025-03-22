import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommunityScreen } from "../../screens/communityScreen";
import { PostScreen } from "../../screens/postScreen";
import { CommunityStackParams } from "../../api/types/communityStackParams";

const Stack = createNativeStackNavigator<CommunityStackParams>();

export function CommunityStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Community" component={CommunityScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  );
}
