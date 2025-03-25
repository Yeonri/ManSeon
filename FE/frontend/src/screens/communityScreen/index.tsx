import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommunityStackParams } from "../../api/types/CommunityStackParams";
import { HeaderLogo } from "../../components/common/headerLogo";
import { FollowingPost } from "../../components/community/followingPost";
import { PostList } from "../../components/community/postList";

interface CommunityScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "Community"> {}

export function CommunityScreen() {
  const navigation = useNavigation<CommunityScreenNavigationProps>();

  return (
    <SafeAreaView className="mx-5 my-2">
      <HeaderLogo />
      <View className="mt-2">
        <Text>내가 팔로잉한 친구 게시글</Text>
        <FollowingPost />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddPost")}
        className="bg-blue-500 rounded-xl mb-2 py-3 items-center"
      >
        <Text className="text-white font-bold">게시글 작성하기</Text>
      </TouchableOpacity>
      <PostList />
    </SafeAreaView>
  );
}
