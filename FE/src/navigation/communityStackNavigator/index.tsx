import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommunityStackParams } from "../types";
import CommunityScreen from "../../screens/community/communityScreen";
import PostDetailScreen from "../../screens/community/postDetailScreen";
import AddPostScreen from "../../screens/community/addPostScreen";
import EditPostScreen from "../../screens/community/editPostScreen";
import MypageScreen from "../../screens/settings/mypageScreen";
import UserPageScreen from "../../screens/settings/userPageScreen";

const Stack = createNativeStackNavigator<CommunityStackParams>();

export function CommunityStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 커뮤니티 */}
      <Stack.Screen name="Community" component={CommunityScreen} />

      {/* 게시글 상세 */}
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />

      {/* 게시글 추가 */}
      <Stack.Screen name="AddPost" component={AddPostScreen} />

      {/* 게시글 수정 */}
      <Stack.Screen name="EditPost" component={EditPostScreen} />

      {/* 마이페이지 */}
      <Stack.Screen name="Mypage" component={MypageScreen} />

      {/* 다른 유저페이지 */}
      <Stack.Screen name="UserPage" component={UserPageScreen} />
    </Stack.Navigator>
  );
}
