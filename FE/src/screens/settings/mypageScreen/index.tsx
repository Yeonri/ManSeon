import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsStackParams } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useGetMyInformtaion } from "../../../api/queries/auth";
import { useGetMyBoards } from "../../../api/queries/board";
import Collection from "../../../components/home/collection";
import ProfileCard from "../../../components/settings/profileCard";
import BadgeList from "../../../components/settings/badgeList";
import { MyBoardList } from "../../../components/settings/myBoardList";

interface MypageScreenNavigationProps
  extends NativeStackNavigationProp<SettingsStackParams, "Mypage"> {}

export default function MypageScreen() {
  // const navigation = useNavigation<MypageScreenNavigationProps>();

  // const { data: user } = useGetMyInformtaion();
  // const { data: boards } = useGetMyBoards();

  // const collectionCount = Object.values(
  //   user.fishCollections as Record<string, any[]>
  // ).filter((arr) => arr.length > 0).length;

  // const progress = (collectionCount / 24) * 100;

  // 임시 데이터
  const user = {
    nickname: "만선이",
    profileImg: "",
    boardCount: 32,
    followingCount: 123,
    followerCount: 50,
    fishing_total: 15,
    fishCollections: {
      1: [3, 5, 8],
      2: [1, 4],
    },
  };

  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={true} before={true} />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 52 }}>
        <View className="mx-5 gap-3">
          {/* 프로필 */}
          <ProfileCard
            edit={true}
            nickname={user.nickname}
            profileImg={user.profileImg}
            boardCount={user.boardCount}
            followingCount={user.followingCount}
            followerCount={user.followerCount}
          />

          {/* 도감 */}
          <Collection style={true} />

          {/* 활동 뱃지 */}
          <BadgeList badgeIds={[1, 2, 3, 4, 5, 6, 7, 8, 9]} user={user} />

          {/* 내 게시글 */}
          <MyBoardList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
