import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParams } from "../types";
import HomeScreen from "../../screens/home/homeScreen";
import MapScreen from "../../screens/map/mapScreen";
import CollectionScreen from "../../screens/settings/collectionScreen";
import CollectionDetailScreen from "../../screens/settings/collectionDetailScreen";
import ChatbotScreen from "../../screens/home/chatbotScreen";
import MypageScreen from "../../screens/settings/mypageScreen";
import { CommunityStackNavigator } from "../communityStackNavigator";
import BoardDetailScreen from "../../screens/community/boardDetailScreen";

const Stack = createNativeStackNavigator<HomeStackParams>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 홈 */}
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* 지도 */}
      <Stack.Screen name="Map" component={MapScreen} />

      {/* 도감 */}
      <Stack.Screen name="Collection" component={CollectionScreen} />

      {/* 도감 상세 */}
      <Stack.Screen
        name="CollectionDetail"
        component={CollectionDetailScreen}
      />

      {/* 마이페이지 */}
      <Stack.Screen name="Mypage" component={MypageScreen} />

      {/* 커뮤니티 */}
      <Stack.Screen name="Community" component={CommunityStackNavigator} />

      {/* 게시글 상세 */}
      <Stack.Screen name="BoardDetail" component={BoardDetailScreen} />

      {/* 챗봇 */}
      <Stack.Screen name="Chatbot" component={ChatbotScreen} />
    </Stack.Navigator>
  );
}
