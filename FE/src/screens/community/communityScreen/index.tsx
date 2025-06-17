import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommunityStackParams } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Header from "../../../components/common/header";
import { useGetBoards } from "../../../api/queries/board";
import Boards from "../../../components/community/boards";
import FollowingBoards from "../../../components/community/followingBoards";

interface CommunityScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "Community"> {}

export default function CommunityScreen() {
  const navigation = useNavigation<CommunityScreenNavigationProps>();
  const [refreshing, setRefreshing] = useState(false);

  const { refetch: refetchBoards } = useGetBoards();

  async function onRefresh() {
    setRefreshing(true);
    await Promise.all([refetchBoards()]);
    setRefreshing(false);
  }

  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={true} before={false} />
      <ScrollView
        className="px-5"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="gap-3">
          {/* 내가 팔로잉한 친구 게시글 */}
          <FollowingBoards />

          {/* 게시글 작성 버튼 */}
          <TouchableOpacity
            onPress={() => navigation.navigate("AddBoard")}
            className="bg-blue-500 rounded-xl py-3 items-center flex-row justify-center"
          >
            <Text className="text-white">게시글 작성</Text>
          </TouchableOpacity>

          {/* 최신 게시글 */}
          <Boards />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
