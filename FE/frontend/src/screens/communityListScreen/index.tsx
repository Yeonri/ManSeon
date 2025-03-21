import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FollowingPost } from "../../components/community/followingPost";
import { PostList } from "../../components/community/postList";

export function CommunityListScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>내가 팔로잉한 친구 게시글</Text>
        <FollowingPost />
      </View>
      <View>
        <PostList />
      </View>
    </SafeAreaView>
  );
}
