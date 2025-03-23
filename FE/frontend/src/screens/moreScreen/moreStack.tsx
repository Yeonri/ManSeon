import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MoreScreen } from "../../screens/moreScreen";
import { TutorialScreen } from "../../screens/tutorialScreen";
import { ProhibitedScreen } from "../prohibitedScreen";

type MoreStackList = {
  More: undefined;
  Tutorial: undefined;
  Prohibited: undefined;
};

const Stack = createNativeStackNavigator<MoreStackList>();

export function MoreStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="More"
        component={MoreScreen}
        options={{ title: "더 보기" }}
      />
      <Stack.Screen
        name="Tutorial"
        component={TutorialScreen}
        options={{ title: "튜토리얼" }}
      />
      <Stack.Screen
        name="Prohibited"
        component={ProhibitedScreen}
        options={{ title: "금어기" }}
      />
    </Stack.Navigator>
  );
}
