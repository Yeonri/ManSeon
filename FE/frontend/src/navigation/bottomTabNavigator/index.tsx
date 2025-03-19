import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainScreen } from "../../screens/mainScreen";
import { MapScreen } from "../../screens/mapScreen";
import { RecordScreen } from "../../screens/recordScreen";
import { CommunityListScreen } from "../../screens/communityListScreen";
import { MoreScreen } from "../../screens/moreScreen";

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="홈" component={MainScreen} />
      <Tab.Screen name="지도" component={MapScreen} />
      <Tab.Screen name="기록 추가" component={RecordScreen} />
      <Tab.Screen name="커뮤니티" component={CommunityListScreen} />
      <Tab.Screen name="더 보기" component={MoreScreen} />
    </Tab.Navigator>
  );
}
