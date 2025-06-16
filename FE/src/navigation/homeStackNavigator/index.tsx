import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParams } from "../types";
import HomeScreen from "../../screens/home/homeScreen";
import MapScreen from "../../screens/map/mapScreen";
import CommunityScreen from "../../screens/community/communityScreen";
import CollectionScreen from "../../screens/settings/collectionScreen";
import CollectionDetailScreen from "../../screens/settings/collectionDetailScreen";
import ChatbotScreen from "../../screens/home/chatbotScreen";
import PostDetailScreen from "../../screens/community/postDetailScreen";
import MypageScreen from "../../screens/settings/mypageScreen";

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
      <Stack.Screen name="Community" component={CommunityScreen} />

      {/* 게시글 상세 */}
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />

      {/* 챗봇 */}
      <Stack.Screen name="Chatbot" component={ChatbotScreen} />
    </Stack.Navigator>
  );
}
