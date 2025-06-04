import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetFriendsPosts, useGetPosts } from "../../../api/quries/usePost";
import { HeaderLogo } from "../../../components/common/headerLogo";
import { FollowingPost } from "../../../components/community/followingPost";
import { PostList } from "../../../components/community/postList";
import { CommunityStackParams } from "../../../navigation/types";
import { useUserStore } from "../../../store/userStore";

interface CommunityScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "Community"> {}

export function CommunityScreen() {
  const navigation = useNavigation<CommunityScreenNavigationProps>();
  const userId = useUserStore((state) => state.user!.id);
  const [refreshing, setRefreshing] = useState(false);
  const { refetch: refetchPosts } = useGetPosts();
  const { refetch: refetchFriendsPosts } = useGetFriendsPosts(userId);

  async function onRefresh() {
    setRefreshing(true);
    await Promise.all([refetchPosts(), refetchFriendsPosts()]);
    setRefreshing(false);
  }

  return (
    <SafeAreaView>
      <HeaderLogo />
      <ScrollView
        className="px-5"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FollowingPost />
        <TouchableOpacity
          onPress={() => navigation.navigate("AddPost")}
          className="bg-blue-500 rounded-xl mt-3 py-3 items-center flex-row justify-center gap-2"
        >
          <Text className="text-white">게시글 작성하기</Text>
        </TouchableOpacity>
        <PostList />
        <View className="m-12" />
      </ScrollView>
    </SafeAreaView>
  );
}
