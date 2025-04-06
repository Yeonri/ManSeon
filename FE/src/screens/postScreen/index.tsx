import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommunityStackParams } from "../../api/types/CommunityStackParams";
import TagFollow from "../../assets/images/tag_follow.svg";
import { HeaderBeforeLogo } from "../../components/common/headerBeforeLogo";
import { AddComment } from "../../components/community/addComment";
import { CommentList } from "../../components/community/commentList";
import commentsMocks from "../../mocks/commentsMocks.json";
import { DeleteAlert } from "../../utils/deleteAlert";
import { FormatTime } from "../../utils/formatTime";
import { Heart, MessageSquareMore, Pencil, Trash2 } from "lucide-react-native";
import { useGetPostDetail } from "../../api/quries/usePost";
import DefaultProfile from "../../assets/images/profile_default.svg";

interface PostScreenProps
  extends NativeStackScreenProps<CommunityStackParams, "Post"> {}

interface PostScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "AddPost"> {}

export function PostScreen({ route }: PostScreenProps) {
  const { postId } = route.params;
  const navigation = useNavigation<PostScreenNavigationProps>();
  const { data: postDetail } = useGetPostDetail(postId);
  console.log("상세 게시글:", postDetail);
  return (
    <SafeAreaView>
      <HeaderBeforeLogo />
      <ScrollView className="px-5 mt-2">
        <Text className="font-bold mb-2 text-lg">{postDetail.title}</Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity className="flex-row items-center gap-2">
              {postDetail.profileImg ? (
                <Image
                  source={{ uri: postDetail.profileImg }}
                  className="w-8 h-8 mr-2 rounded-full"
                />
              ) : (
                <View
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    marginRight: 8,
                  }}
                >
                  <DefaultProfile width={32} height={32} />
                </View>
              )}
              <Text className="font-semibold">{postDetail.nickname}</Text>
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
                  title: postDetail.title,
                  content: postDetail.content,
                  postImg: postDetail.postImg,
                })
              }
              className="h-6"
            >
              <Pencil />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => DeleteAlert("게시글")}
              className="h-6"
            >
              <Trash2 />
            </TouchableOpacity>
            <Text className="text-neutral-400 text-sm">
              {postDetail.createAt}
              {/* {FormatTime(postDetail.createAt)} */}
            </Text>
          </View>
        </View>
        <View className="my-3 gap-3">
          <Image
            source={{ uri: postDetail.postImg }}
            className="w-full h-48 rounded-lg"
          />
          <Text>{postDetail.content}</Text>
        </View>
        <View className="mt-2 mb-5 border-b border-neutral-500" />
        <View className="flex-row items-center">
          <MessageSquareMore />

          <Text className="mr-3">{postDetail.commentNum}</Text>
          <Heart />
          <Text className="ml-1">{postDetail.like}</Text>
        </View>
        <View className="my-4">
          <AddComment />
        </View>
        <CommentList comments={commentsMocks} />
      </ScrollView>
    </SafeAreaView>
  );
}
