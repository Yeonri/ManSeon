import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsStackParams } from "../types";
import SettingsScreen from "../../screens/settings/settingsScreen";
import ProhibitedScreen from "../../screens/settings/prohibitedScreen";
import FishingRuleScreen from "../../screens/settings/fishingRuleScreen";
import FriendsScreen from "../../screens/settings/friendsScreen";
import MypageScreen from "../../screens/settings/mypageScreen";
import UserPageScreen from "../../screens/settings/userPageScreen";
import CollectionScreen from "../../screens/settings/collectionScreen";
import CollectionDetailScreen from "../../screens/settings/collectionDetailScreen";
import NoticeScreen from "../../screens/settings/noticeScreen";
import InquiryScreen from "../../screens/settings/inquiryScreen";
import TutorialScreen from "../../screens/settings/tutorialScreen";
import MyInformationScreen from "../../screens/settings/myInformationScreen";
import MyBoardScreen from "../../screens/settings/myBoardScreen";
import RecordScreen from "../../screens/camera/recordScreen";
import RecordDetailScreen from "../../screens/camera/recordDetailScreen";
import BoardDetailScreen from "../../screens/community/boardDetailScreen";

const Stack = createNativeStackNavigator<SettingsStackParams>();

export function SettingsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 설정 */}
      <Stack.Screen name="Settings" component={SettingsScreen} />

      {/* 마이페이지 */}
      <Stack.Screen name="Mypage" component={MypageScreen} />

      {/* 내 정보 */}
      <Stack.Screen name="MyInformation" component={MyInformationScreen} />

      {/* 게시글 상세 */}
      <Stack.Screen name="BoardDetail" component={BoardDetailScreen} />

      {/* 다른 유저페이지 */}
      <Stack.Screen name="UserPage" component={UserPageScreen} />

      {/* 친구 목록 */}
      <Stack.Screen name="Friends" component={FriendsScreen} />

      {/* 내 게시글 */}
      <Stack.Screen name="MyBoard" component={MyBoardScreen} />

      {/* 낚시 기록 전체*/}
      <Stack.Screen name="Record" component={RecordScreen} />

      {/* 낚시 기록 상세 */}
      <Stack.Screen name="RecordDetail" component={RecordDetailScreen} />

      {/* 도감 */}
      <Stack.Screen name="Collection" component={CollectionScreen} />

      {/* 도감 상세 */}
      <Stack.Screen
        name="CollectionDetail"
        component={CollectionDetailScreen}
      />

      {/* 금어기 */}
      <Stack.Screen name="Prohibited" component={ProhibitedScreen} />

      {/* 방생기준 */}
      <Stack.Screen name="FishingRule" component={FishingRuleScreen} />

      {/* 공지사항 */}
      <Stack.Screen name="Notice" component={NoticeScreen} />

      {/* 문의사항 */}
      <Stack.Screen name="Inquiry" component={InquiryScreen} />

      {/* 튜토리얼 */}
      <Stack.Screen name="Tutorial" component={TutorialScreen} />
    </Stack.Navigator>
  );
}
