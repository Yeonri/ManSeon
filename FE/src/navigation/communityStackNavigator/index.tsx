import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommunityScreen } from "../../screens/community/communityScreen";
import { PostAddScreen } from "../../screens/community/postAddScreen";
import { PostEditScreen } from "../../screens/community/postEditScreen";
import { PostScreen } from "../../screens/community/postScreen";
import { ProfileScreen } from "../../screens/settings/profileScreen";
import { UserProfileScreen } from "../../screens/settings/userProfileScreen";
import { CommunityStackParams } from "../types";

const Stack = createNativeStackNavigator<CommunityStackParams>();

export function CommunityStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Community" component={CommunityScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="AddPost" component={PostAddScreen} />
      <Stack.Screen name="EditPost" component={PostEditScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
}
