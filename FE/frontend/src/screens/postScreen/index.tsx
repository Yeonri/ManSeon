import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";
import { CommunityStackParams } from "../../api/types/communityStackParams";
import { SafeAreaView } from "react-native-safe-area-context";
import postsMocks from "../../mocks/postsMocks.json";
import IconLike from "../../assets/images/icon_like.svg";
import IconComment from "../../assets/images/icon_comment.svg";

interface PostScreenProps
  extends NativeStackScreenProps<CommunityStackParams, "Post"> {}

export function PostScreen({ route }: PostScreenProps) {
  const { postId } = route.params;
  return (
    <SafeAreaView>
      <Text>커뮤니티 {postId}번 게시글</Text>
      <Text>{postsMocks[0].title}</Text>
      <View className="flex-row items-center">
        <Image
          source={{ uri: postsMocks[0].profileImg }}
          className="w-10 h-10 rounded-full"
        />
        <Text>{postsMocks[0].nickname}</Text>
      </View>
      <View>
        <Image source={{ uri: postsMocks[0].postImg }} className="w-96 h-96" />
        <Text>{postsMocks[0].content}</Text>
      </View>
      <View className="mx-5 my-2 border-b border-gray-500" />
      <View className="flex-row items-center">
        <IconComment />
        <Text className="mr-3">{postsMocks[0].commentNum}</Text>
        <IconLike />
        <Text className="ml-1">{postsMocks[0].like}</Text>
      </View>
    </SafeAreaView>
  );
}
