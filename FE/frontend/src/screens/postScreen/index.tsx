import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommunityStackParams } from "../../api/types/communityStackParams";
import IconComment from "../../assets/images/icon_comment.svg";
import IconDelete from "../../assets/images/icon_delete.svg";
import IconEdit from "../../assets/images/icon_edit.svg";
import IconLike from "../../assets/images/icon_like.svg";
import TagFollow from "../../assets/images/tag_follow.svg";
import { HeaderBeforeLogo } from "../../components/common/headerBeforeLogo";
import postsMocks from "../../mocks/postsMocks.json";
import { useNavigation } from "@react-navigation/native";

interface PostScreenProps
  extends NativeStackScreenProps<CommunityStackParams, "Post"> {}

interface PostScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "AddPost"> {}

export function PostScreen({ route }: PostScreenProps) {
  const { postId } = route.params;
  const navigation = useNavigation<PostScreenNavigationProps>();

  function formatTime(time: string) {
    return formatDistanceToNow(new Date(time), { addSuffix: true, locale: ko });
  }

  function createDeleteAlert() {
    Alert.alert("게시글 삭제", "게시글을 삭제하시겠습니까?", [
      { text: "아니오", onPress: () => {} },
      { text: "네", onPress: () => {} },
    ]);
  }

  return (
    <SafeAreaView className="mx-5">
      <HeaderBeforeLogo />
      <Text className="font-bold mb-2 text-lg">
        {postsMocks[postId - 1].title}
      </Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="flex-row items-center gap-2">
            <Image
              source={{ uri: postsMocks[postId - 1].profileImg }}
              className="w-10 h-10 rounded-full"
            />
            <Text>{postsMocks[postId - 1].nickname}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} className="h-4">
            <TagFollow />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center gap-1">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditPost", {
                postId: postId,
                title: postsMocks[postId - 1].title,
                content: postsMocks[postId - 1].content,
                postImg: postsMocks[postId - 1].postImg,
              })
            }
            className="h-6"
          >
            <IconEdit />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => createDeleteAlert()} className="h-6">
            <IconDelete />
          </TouchableOpacity>
          <Text>{formatTime(postsMocks[postId - 1].createAt)}</Text>
        </View>
      </View>
      <View className="my-3 gap-3">
        <Image
          source={{ uri: postsMocks[postId - 1].postImg }}
          className="w-full h-48 rounded-lg"
        />
        <Text>{postsMocks[postId - 1].content}</Text>
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
