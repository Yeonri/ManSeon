import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommunityStackParams } from "../types";
import CommunityScreen from "../../screens/community/communityScreen";
import UserPageScreen from "../../screens/settings/userPageScreen";
import BoardDetailScreen from "../../screens/community/boardDetailScreen";
import AddBoardScreen from "../../screens/community/addBoardcreen";
import EditBoardScreen from "../../screens/community/editBoardScreen";

const Stack = createNativeStackNavigator<CommunityStackParams>();

export function CommunityStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 커뮤니티 */}
      <Stack.Screen name="Community" component={CommunityScreen} />

      {/* 게시글 상세 */}
      <Stack.Screen name="BoardDetail" component={BoardDetailScreen} />

      {/* 게시글 추가 */}
      <Stack.Screen name="AddBoard" component={AddBoardScreen} />

      {/* 게시글 수정 */}
      <Stack.Screen name="EditBoard" component={EditBoardScreen} />

      {/* 다른 유저페이지 */}
      <Stack.Screen name="UserPage" component={UserPageScreen} />
    </Stack.Navigator>
  );
}
