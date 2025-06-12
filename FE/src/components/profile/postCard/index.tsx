import dayjs from "dayjs";
import { Image, Text, View } from "react-native";
import type { Post } from "../../../types/Post";

type ProfilePost = Pick<
  Post,
  | "postId"
  | "title"
  | "content"
  | "postImg"
  | "like"
  | "commentNum"
  | "createdAt"
>;

type PostCardProps = {
  post: ProfilePost;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <View className="flex-row justify-between items-center p-3 bg-blue-50 rounded-2xl mb-3">
      <View className="flex-1 pr-2">
        <Text className="font-bold text-base mb-1 text-neutral-800">
          {post.title}
        </Text>
        <Text className="text-neutral-500 text-sm" numberOfLines={2}>
          {post.content}
        </Text>
        <Text className="text-sm text-neutral-500-400 mt-1 mb-2">
          {dayjs(post.createdAt).format("YYYY년 MM월 DD일")}
        </Text>
        {/* <View className="flex-row space-x-4 gap-3">
          <View className="flex-row items-center space-x-1 gap-1">
            <IcomComment />
            <Text className="text-base text-neutral-500">
              {post.commentNum}
            </Text>
          </View>
          <View className="flex-row items-center space-x-1 gap-1">
            <IconLike />
            <Text className="text-base">{post.like}</Text>
          </View>
        </View> */}
      </View>

      <Image
        source={{ uri: post.thumbImg }}
        className="w-24 h-24 rounded-xl"
        resizeMode="cover"
      />
    </View>
  );
}
