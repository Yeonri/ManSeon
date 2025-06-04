import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CollectionListScreen } from "../../screens/settings/collectionListScreen";
import { CollectionScreen } from "../../screens/settings/collectionScreen";
import { FriendsScreen } from "../../screens/settings/friendsScreen";
import { MyPostsScreen } from "../../screens/settings/myPostsScreen";
import { ProfileEditScreen } from "../../screens/settings/profileEditScreen";
import { ProfileScreen } from "../../screens/settings/profileScreen";
import { ProhibitedScreen } from "../../screens/settings/prohibitedScreen";
import { RuleScreen } from "../../screens/settings/ruleScreen";
import { SettingScreen } from "../../screens/settings/settingScreen";
import { SuggestionsScreen } from "../../screens/settings/suggestionsScreen";
import { TutorialScreen } from "../../screens/settings/tutorialScreen";
import { FishingStackNavigator } from "../fishingStackNavigator";
import { SettingStackParams } from "../types";

const Stack = createNativeStackNavigator<SettingStackParams>();

export function SettingStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="MyPosts" component={MyPostsScreen} />
      <Stack.Screen name="Prohibited" component={ProhibitedScreen} />
      <Stack.Screen name="Rule" component={RuleScreen} />
      <Stack.Screen name="Tutorial" component={TutorialScreen} />
      <Stack.Screen name="Fishings" component={FishingStackNavigator} />
      <Stack.Screen name="CollectionList" component={CollectionListScreen} />
      <Stack.Screen name="CollectionDetail" component={CollectionScreen} />
      <Stack.Screen name="Suggestions" component={SuggestionsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      <Stack.Screen name="Friends" component={FriendsScreen} />
    </Stack.Navigator>
  );
}
