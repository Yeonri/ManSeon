import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MoreStackParams } from "../../../api/types/moreStackParams";
import type { Post } from "../../../api/types/Post";
import IcomComment from "../../../assets/images/icon_comment.svg";
import IconLike from "../../../assets/images/icon_like.svg";

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

interface PostCardProps {
  post: ProfilePost;
}

interface CommunityScreenNavigationProps
  extends NativeStackNavigationProp<MoreStackParams> {}

export function PostCard({ post }: PostCardProps) {
  const navigation = useNavigation<CommunityScreenNavigationProps>();

  function handlePostClick(postId: number) {
    navigation.navigate("Post", { postId });
    console.log(postId);
  }

  return (
    <TouchableOpacity onPress={() => handlePostClick(post.postId)}>
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
          <View className="flex-row space-x-4 gap-3">
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
          </View>
        </View>

        <Image
          source={{ uri: post.postImg }}
          className="w-24 h-24 rounded-xl"
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
}
