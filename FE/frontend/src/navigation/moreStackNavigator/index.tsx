import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MoreStackParams } from "../../api/types/moreStackParams";
import { MoreScreen } from "../../screens/moreScreen";
import { ProhibitedScreen } from "../../screens/prohibitedScreen";
import { RuleScreen } from "../../screens/ruleScreen";
import { TutorialScreen } from "../../screens/tutorialScreen";

const Stack = createNativeStackNavigator<MoreStackParams>();

export function MoreStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="More" component={MoreScreen} />
      <Stack.Screen name="Tutorial" component={TutorialScreen} />
      <Stack.Screen name="Prohibited" component={ProhibitedScreen} />
      <Stack.Screen name="Rule" component={RuleScreen} />
    </Stack.Navigator>
  );
}
