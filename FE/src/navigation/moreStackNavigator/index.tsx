import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MoreStackParams } from "../../api/types/moreStackParams";
import { CollectionListScreen } from "../../screens/collectionListScreen";
import { FishingListScreen } from "../../screens/fishingListScreen";
import { MoreScreen } from "../../screens/moreScreen";
import { MyPostsScreen } from "../../screens/myPostsScreen";
import { ProhibitedScreen } from "../../screens/prohibitedScreen";
import { RuleScreen } from "../../screens/ruleScreen";
import { TutorialScreen } from "../../screens/tutorialScreen";

const Stack = createNativeStackNavigator<MoreStackParams>();

export function MoreStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="More" component={MoreScreen} />
      <Stack.Screen name="Myposts" component={MyPostsScreen} />
      <Stack.Screen name="Prohibited" component={ProhibitedScreen} />
      <Stack.Screen name="Rule" component={RuleScreen} />
      <Stack.Screen name="Tutorial" component={TutorialScreen} />
      <Stack.Screen name="FishingList" component={FishingListScreen} />
      <Stack.Screen name="CollectionList" component={CollectionListScreen} />
    </Stack.Navigator>
  );
}
