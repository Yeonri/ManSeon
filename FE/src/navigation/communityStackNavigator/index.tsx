import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommunityStackParams } from "../../api/types/CommunityStackParams";
import { CommunityScreen } from "../../screens/communityScreen";
import { PostAddScreen } from "../../screens/postAddScreen";
import { PostEditScreen } from "../../screens/postEditScreen";
import { PostScreen } from "../../screens/postScreen";

const Stack = createNativeStackNavigator<CommunityStackParams>();

export function CommunityStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Community" component={CommunityScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="AddPost" component={PostAddScreen} />
      <Stack.Screen name="EditPost" component={PostEditScreen} />
    </Stack.Navigator>
  );
}
