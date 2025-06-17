import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommunityStackParams } from "../../../navigation/types";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useDeleteBoard, useGetBoardDetail } from "../../../api/queries/board";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/common/header";
import DefaultImage from "../../../assets/images/image_default.svg";
import formatTime from "../../../utils/formatTime";
import SelectButton from "../../../components/common/selectButton";
import {
  MessageSquareMore,
  Pencil,
  ThumbsUp,
  Trash2,
} from "lucide-react-native";
import CommentInput from "../../../components/community/commentInput";
import Comments from "../../../components/community/comments";

interface BoardDetailScreenProps
  extends NativeStackScreenProps<CommunityStackParams, "BoardDetail"> {}

interface BoardDetailScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "AddBoard"> {}

export default function BoardDetailScreen({ route }: BoardDetailScreenProps) {
  const { boardId } = route.params;
  const navigation = useNavigation<BoardDetailScreenNavigationProps>();
  // const { data, refetch } = useGetBoardDetail(boardId);

  const data = {
    data: {
      userId: 111211,
      boardId: 1,
      title: "임시 게시글 제목",
      content: "이것은 임시 내용입니다. 게시글의 본문을 여기에 작성하세요.",
      postImg:
        "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
      profileImg: "",
      nickname: "홍길동",
      commentNum: 3,
      like: 12,
      createdAt: "2025-06-16T15:00:00Z",
    },
  };

  const postDetail = data?.data ?? [];

  const { mutate: deleteBoard } = useDeleteBoard();

  function handleDelete() {}

  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={true} before={true} />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <View className="mx-5 gap-3">
          {/* 제목 */}
          <Text className="text-neutral-800 font-bold">{postDetail.title}</Text>

          {/* 작성자 정보, 게시글 수정 및 삭제 */}
          <View className="flex-row items-center justify-between">
            {/* 작성자 정보 */}
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("UserPage", { userId: postDetail.userId })
                }
                className="flex-row items-center gap-2"
              >
                {postDetail.profileImg ? (
                  <Image
                    source={{ uri: postDetail.profileImg }}
                    className="w-[22px] h-[22px] rounded-full"
                  />
                ) : (
                  <View
                    style={{
                      borderRadius: 16,
                      overflow: "hidden",
                    }}
                  >
                    <DefaultImage width={22} height={22} />
                  </View>
                )}
                <Text className=" text-neutral-600 text-sm font-semibold">
                  {postDetail.nickname}
                </Text>
              </TouchableOpacity>

              {/* 팔로잉 여부 */}
              <View>
                <SelectButton
                  name="팔로잉"
                  fill={false}
                  follow={true}
                  onPress={() => {}}
                />
              </View>
            </View>

            {/* 게시글 수정 및 삭제 */}
            <View className="flex-row items-center gap-2">
              <View className="flex-row items-center gap-1">
                {/* 수정 */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditBoard", {
                      boardId: boardId,
                      title: postDetail.title,
                      content: postDetail.content,
                      postImg: postDetail.postImg,
                    })
                  }
                >
                  <Pencil color={"#A3A3A3"} size={14} />
                </TouchableOpacity>

                {/* 삭제 */}
                <TouchableOpacity onPress={handleDelete}>
                  <Trash2 color={"#A3A3A3"} size={14} />
                </TouchableOpacity>
              </View>

              {/* 작성 시간 */}
              <Text className="text-neutral-400 text-xs">
                {formatTime(postDetail.createdAt)}
              </Text>
            </View>
          </View>

          {/* 본문 */}
          {/* 게시글 사진 */}
          {postDetail.postImg ? (
            <Image
              source={{ uri: `${postDetail.postImg}` }}
              className="w-full h-60 rounded-xl"
            />
          ) : null}
          {/* 게시글 내용 */}
          <Text className="text-neutral-800 text-sm">{postDetail.content}</Text>

          {/* 구분선 */}
          <View className="mt-2 w-full h-px bg-neutral-100" />

          <View className="flex-row gap-3">
            {/* 댓글 수 */}
            <View className="flex-row gap-1 items-center">
              <MessageSquareMore fill={"#FFFFFF"} color={"#3B82F6"} size={16} />
              <Text className="text-neutral-600 text-sm">
                {postDetail.commentNum}
              </Text>
            </View>

            {/* 좋아요 수 */}
            <View className="flex-row gap-1 items-center">
              <ThumbsUp fill={"#FFFFFF"} color={"#3B82F6"} size={16} />
              <Text className="text-neutral-600 text-sm">
                {postDetail.like}
              </Text>
            </View>
          </View>

          {/* 댓글 입력창 */}
          <CommentInput boardId={boardId} />

          {/* 댓글 목록 */}
          <Comments boardId={boardId} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
