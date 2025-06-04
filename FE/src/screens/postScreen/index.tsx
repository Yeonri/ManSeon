import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Heart, MessageSquareMore, Pencil, Trash2 } from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDeletePost, useGetPostDetail } from "../../api/quries/usePost";
import DefaultImage from "../../assets/images/image_default.svg";
import TagFollow from "../../assets/images/tag_follow.svg";
import { HeaderBeforeLogo } from "../../components/common/headerBeforeLogo";
import { Loading } from "../../components/common/loading";
import { AddComment } from "../../components/community/addComment";
import { CommunityStackParams } from "../../types/CommunityStackParams";
// import formatTime from "../../utils/formatTime";
import { IMAGE_API } from "@env";
import { useEffect } from "react";
import { CommentList } from "../../components/community/commentList";
import { useUserStore } from "../../store/userStore";
import deleteAlert from "../../utils/deleteAlert";

interface PostScreenProps
  extends NativeStackScreenProps<CommunityStackParams, "Post"> {}

interface PostScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "AddPost"> {}

export function PostScreen({ route }: PostScreenProps) {
  const { postId } = route.params;
  const navigation = useNavigation<PostScreenNavigationProps>();
  const { data: response, refetch } = useGetPostDetail(postId);
  console.log("응답 전체", response);

  const postDetail = response?.data ?? [];
  console.log("상세 게시글:", postDetail);

  const { mutate: deletePost } = useDeletePost();
  const user = useUserStore((state) => state.user);
  const isOwner = user?.id === postDetail?.userId;
  console.log("유저 정보:", user);

  function handleDelete() {
    console.log("게시글 삭제 요청");
    deleteAlert("게시글", () => {
      deletePost(postId, {
        onSuccess: () => {
          console.log("게시글 삭제 성공");
          navigation.reset({
            index: 0,
            routes: [{ name: "Community" }],
          });
        },
      });
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("🔄 PostScreen 포커스됨 → 게시글 다시 불러오기");
      refetch();
    });

    return unsubscribe;
  }, [navigation, refetch]);

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
                  <DefaultImage width={32} height={32} />
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
            {/* <Text className="text-neutral-400 text-sm">
              {formatTime(postDetail.createdAt)}
            </Text> */}
            {/* 수정 */}
            {isOwner ? (
              <View className="flex-row items-center">
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
                  className="p-2"
                >
                  <Pencil color={"#A1A1A1"} size={20} />
                </TouchableOpacity>

                {/* 삭제 */}
                <TouchableOpacity onPress={handleDelete} className="p-2">
                  <Trash2 color={"#A1A1A1"} size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
        <View className="my-3 gap-3">
          {/* 게시글 사진 */}
          {postDetail.postImg ? (
            <Image
              source={{ uri: `${IMAGE_API}/${postDetail.postImg}` }}
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
          <AddComment boardId={postId} />
        </View>
        {/* 댓글 목록 */}
        <CommentList boardId={postId} />
      </ScrollView>
    </SafeAreaView>
  );
}
