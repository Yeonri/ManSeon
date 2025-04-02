import { Text, View } from "react-native";
import type { Post } from "../../../api/types/Post";
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

export function UserPostList({ posts }: MyPostListProps) {
  return (
    <View className="mt-4">
      <View className="flex-row items-center px-4 mb-2">
        <Text className="font-bold text-base text-neutral-800">
          유저 게시글
        </Text>
      </View>

      <View className="px-4">
        {posts.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </View>
    </View>
  );
}
