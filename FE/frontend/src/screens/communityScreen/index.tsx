import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FollowingPost } from "../../components/community/followingPost";
import { PostList } from "../../components/community/postList";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommunityStackParams } from "../../api/types/communityStackParams";

interface CommunityScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "Community"> {}

export function CommunityScreen() {
  const navigation = useNavigation<CommunityScreenNavigationProps>();

  return (
    <SafeAreaView className="mx-5">
      <View>
        <Text>내가 팔로잉한 친구 게시글</Text>
        <FollowingPost />
      </View>
      <Button
        onPress={() => navigation.navigate("AddPost")}
        title="게시글 작성하기"
        color="#3A84EF"
      />
      <PostList />
    </SafeAreaView>
  );
}
