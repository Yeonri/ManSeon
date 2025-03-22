import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FollowingPost } from "../../components/community/followingPost";
import postsMocks from "../../mocks/postsMocks.json";
import { useNavigation } from "@react-navigation/native";
import { Post } from "../../api/types/post";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommunityStackParams } from "../../api/types/communityStackParams";

interface CommunityScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "Community"> {}

export function CommunityScreen() {
  const navigation = useNavigation<CommunityScreenNavigationProps>();

  function handlePostClick(postId: number) {
    navigation.navigate("Post", { postId });
  }

  function renderPost({ item }: { item: Post }) {
    return (
      <TouchableOpacity onPress={() => handlePostClick(item.postId)}>
        <View>
          <Text>{item.title}</Text>
          <View>
            <Image source={{ uri: item.profileImg }} className="w-20 h-20" />
            <Text>{item.nickname}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <SafeAreaView>
        <View>
          <Text>내가 팔로잉한 친구 게시글</Text>
          <FollowingPost />
        </View>
        <View>
          <FlatList
            data={postsMocks}
            renderItem={renderPost}
            keyExtractor={(post) => post.postId.toString()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
