import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CollectionListScreen } from "../../screens/collectionListScreen";
import { CollectionScreen } from "../../screens/collectionScreen";
import { FriendsScreen } from "../../screens/friendsScreen";
import { MoreScreen } from "../../screens/moreScreen";
import { MyPostsScreen } from "../../screens/myPostsScreen";
import { ProfileEditScreen } from "../../screens/profileEditScreen";
import { ProfileScreen } from "../../screens/profileScreen";
import { ProhibitedScreen } from "../../screens/prohibitedScreen";
import { RuleScreen } from "../../screens/ruleScreen";
import { SuggestionsScreen } from "../../screens/suggestionsScreen";
import { TutorialScreen } from "../../screens/tutorialScreen";
import { MoreStackParams } from "../../types/MoreStackParams";
import { FishingStackNavigator } from "../fishingStackNavigator";

const Stack = createNativeStackNavigator<MoreStackParams>();

export function MoreStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="More" component={MoreScreen} />
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
