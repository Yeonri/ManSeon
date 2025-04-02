import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { MoreStackParams } from "../../../api/types/MoreStackParams";
import type { Post } from "../../../api/types/post";
import IconMove from "../../../assets/images/icon_move.svg";
import { PostCard } from "../postCard";

type ProfilePost = Pick<
  Post,
  | "postId"
  | "title"
  | "content"
  | "postImg"
  | "like"
  | "commentNum"
  | "createAt"
>;

type MyPostListProps = {
  posts: ProfilePost[];
};

interface MoreScreenNavigationProps
  extends NativeStackNavigationProp<MoreStackParams, "More"> {}

export function MyPostList({ posts }: MyPostListProps) {
  const navigation = useNavigation<MoreScreenNavigationProps>();

  return (
    <View className="mt-4">
      <TouchableOpacity
        className="flex-row items-center px-4 mb-2"
        onPress={() => navigation.navigate("MyPosts")}
      >
        <Text className="font-bold text-base text-neutral-800">
          내가 쓴 게시글
        </Text>
        <IconMove />
      </TouchableOpacity>

      <View className="px-4">
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </View>
    </View>
  );
}
