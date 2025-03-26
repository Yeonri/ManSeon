import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainScreen } from "../../screens/mainScreen";
import { MapScreen } from "../../screens/mapScreen";
import { RecordScreen } from "../../screens/recordScreen";
import { CommunityStackNavigator } from "../communityStackNavigator";
import { MoreStackNavigator } from "../moreStackNavigator";

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="홈" component={MainScreen} />
      <Tab.Screen name="지도" component={MapScreen} />
      <Tab.Screen name="기록 추가" component={RecordScreen} />
      <Tab.Screen name="커뮤니티" component={CommunityStackNavigator} />
      <Tab.Screen name="더 보기" component={MoreStackNavigator} />
    </Tab.Navigator>
  );
}
