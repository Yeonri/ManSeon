import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommunityStackParams } from "../../api/types/communityStackParams";
import IconComment from "../../assets/images/icon_comment.svg";
import IconLike from "../../assets/images/icon_like.svg";
import { HeaderBeforeLogo } from "../../components/common/headerBeforeLogo";
import postsMocks from "../../mocks/postsMocks.json";

interface PostScreenProps
  extends NativeStackScreenProps<CommunityStackParams, "Post"> {}

export function PostScreen({ route }: PostScreenProps) {
  const { postId } = route.params;
  return (
    <SafeAreaView className="mx-5">
      <HeaderBeforeLogo />
      <Text className="font-bold mb-2 text-lg">
        {postsMocks[postId - 1].title}
      </Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Image
            source={{ uri: postsMocks[postId - 1].profileImg }}
            className="w-10 h-10 rounded-full"
          />
          <Text>{postsMocks[postId - 1].nickname}</Text>
        </View>
        <Text>1분전</Text>
      </View>
      <View className="my-3 gap-3 items-center">
        <Image
          source={{ uri: postsMocks[postId - 1].postImg }}
          className="w-full h-48 rounded-lg"
        />
        <Text className="self-center">{postsMocks[postId - 1].content}</Text>
      </View>
      <View className="mt-2 mb-5 border-b border-gray-500" />
      <View className="flex-row items-center">
        <IconComment />
        <Text className="mr-3">{postsMocks[postId - 1].commentNum}</Text>
        <IconLike />
        <Text className="ml-1">{postsMocks[postId - 1].like}</Text>
      </View>
    </SafeAreaView>
  );
}
