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
import { DeleteAlert } from "../../utils/deleteAlert";
import { Heart, MessageSquareMore, Pencil, Trash2 } from "lucide-react-native";
import { useGetPostDetail } from "../../api/quries/usePost";
import DefaultProfile from "../../assets/images/profile_default.svg";
import { Loading } from "../../components/common/loading";

interface PostScreenProps
  extends NativeStackScreenProps<CommunityStackParams, "Post"> {}

interface PostScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "AddPost"> {}

export function PostScreen({ route }: PostScreenProps) {
  const { postId } = route.params;
  const navigation = useNavigation<PostScreenNavigationProps>();
  const { data: postDetail } = useGetPostDetail(postId);
  console.log("상세 게시글:", postDetail);

  if (!postDetail) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <HeaderBeforeLogo />
      <ScrollView className="px-5 mt-2">
        {/* 제목 */}
        <Text className="font-bold mb-2 text-lg text-neutral-800">
          {postDetail.title}
        </Text>
        <View className="flex-row items-center justify-between">
          {/* 작성자 정보 */}
          <View className="flex-row items-center gap-2">
            <TouchableOpacity className="flex-row items-center gap-1">
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
              <Text className=" text-neutral-600 font-semibold">
                {postDetail.nickname}
              </Text>
            </TouchableOpacity>
            {/* 팔로잉 여부 */}
            <TouchableOpacity onPress={() => {}} className="h-4">
              <TagFollow />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-2">
            {/* 작성 시간 */}
            <Text className="text-neutral-400 text-sm">
              {/* {FormatTime(postDetail.createdAt)} */}
              n시간 전
            </Text>
            {/* 수정 */}
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
              <Pencil color={"#A1A1A1"} size={20} />
            </TouchableOpacity>
            {/* 삭제 */}
            <TouchableOpacity
              onPress={() => DeleteAlert("게시글")}
              className="h-6"
            >
              <Trash2 color={"#A1A1A1"} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="my-3 gap-3">
          {/* 게시글 사진 */}
          {postDetail.postImg ? (
            <Image
              source={{ uri: postDetail.postImg }}
              className="w-full h-96 rounded-lg"
            />
          ) : null}
          {/* 게시글 내용 */}
          <Text className="text-neutral-800">{postDetail.content}</Text>
        </View>
        {/* 구분선 */}
        <View className="mt-2 mb-5 border-b border-neutral-200" />
        <View className="flex-row items-center">
          {/* 댓글 수 */}
          <View className="flex-row items-center gap-2">
            <MessageSquareMore color={"#A1A1A1"} size={22} />
            <Text className="mr-3">{postDetail.commentNum}</Text>
          </View>
          {/* 좋아요 수 */}
          <View className="flex-row items-center gap-2">
            <Heart color={"#A1A1A1"} size={22} />
            <Text className="ml-1">{postDetail.like}</Text>
          </View>
        </View>
        {/* 댓글 추가 */}
        <View className="my-4">
          <AddComment />
        </View>
        {/* 댓글 목록 */}
        <CommentList comments={postDetail.commentList} />
      </ScrollView>
    </SafeAreaView>
  );
}
