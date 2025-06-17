import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Pencil, Trash2 } from "lucide-react-native";
import formatTime from "../../../utils/formatTime";
import {
  useDeleteComment,
  useEditComment,
  useGetComments,
} from "../../../api/queries/comment";
import { useNavigation } from "@react-navigation/native";
import { CommunityStackParams } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SelectButton from "../../common/selectButton";
import DefaultImage from "../../../assets/images/image_default.svg";

interface CommentsNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "AddBoard"> {}

export default function Comments({ boardId }: { boardId: number }) {
  const navigation = useNavigation<CommentsNavigationProps>();

  const [edit, setEdit] = useState<boolean>(false);
  const [editCommentId, setEditCommentId] = useState<number>(0);
  const [editContent, setEditContent] = useState("");

  // const { data: response } = useGetComments(boardId);

  // 임시 데이터
  const data = {
    data: [
      {
        commentId: 1,
        userId: 111211,
        profileImg: null,
        nickname: "김철수",
        commentContent: "좋은 글 감사합니다!",
        createdAt: "2025-06-16T08:30:00Z",
      },
      {
        commentId: 2,
        userId: 111212,
        profileImg:
          "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
        nickname: "이영희",
        commentContent: "궁금한 점이 있어요. 자세히 설명해주실 수 있나요?",
        createdAt: "2025-06-16T09:15:00Z",
      },
      {
        commentId: 3,
        userId: 111213,
        profileImg:
          "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
        nickname: "박민수",
        commentContent: "동의합니다. 정말 공감돼요.",
        createdAt: "2025-06-16T10:00:00Z",
      },
      {
        commentId: 4,
        userId: 111214,
        profileImg:
          "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
        nickname: "최지우",
        commentContent: "이런 내용은 처음 알았어요. 공유 감사합니다!",
        createdAt: "2025-06-16T10:45:00Z",
      },
      {
        commentId: 5,
        userId: 111215,
        profileImg: null,
        nickname: "홍길동",
        commentContent: "질문이 있는데요, DM 가능할까요?",
        createdAt: "2025-06-16T11:00:00Z",
      },
    ],
  };

  const comments = data?.data ?? [];

  const { mutate: editComment } = useEditComment();
  const { mutate: deleteComment } = useDeleteComment();

  // 댓글 수정
  function handleEdit(id: number, content: string) {
    setEdit(true);
    setEditCommentId(id);
    setEditContent(content);
  }

  // 수정한 댓글 전송
  function handleSubmit() {
    if (editContent.trim()) {
      editComment(
        { boardId, commentId: editCommentId, content: editContent },
        {
          onSuccess: () => {
            cancelEdit();
          },
        }
      );
    }
  }

  // 수정 취소
  function cancelEdit() {
    setEdit(false);
    setEditCommentId(0);
    setEditContent("");
  }

  // 삭제
  function handleDelete(id: number) {
    deleteComment({ boardId, commentId: id });
  }

  return (
    <FlatList
      data={comments}
      keyExtractor={(item) => item.commentId.toString()}
      renderItem={({ item }) => (
        <View className="gap-2 my-2">
          <View className="flex-row items-center justify-between">
            {/* 작성자 정보 */}
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("UserPage", { userId: item.userId })
                }
                className="flex-row items-center gap-2"
              >
                {item.profileImg ? (
                  <Image
                    source={{ uri: item.profileImg }}
                    className="w-[22px] h-[22px] rounded-full"
                  />
                ) : (
                  <View style={{ borderRadius: 16, overflow: "hidden" }}>
                    <DefaultImage width={22} height={22} />
                  </View>
                )}
                <Text className="text-neutral-600 text-sm font-semibold">
                  {item.nickname}
                </Text>
              </TouchableOpacity>
              <SelectButton
                name="팔로잉"
                fill={false}
                follow={true}
                onPress={() => {}}
              />
            </View>

            {/* 수정 / 삭제 */}
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                onPress={() => handleEdit(item.commentId, item.commentContent)}
              >
                <Pencil color="#A3A3A3" size={14} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.commentId)}>
                <Trash2 color="#A3A3A3" size={14} />
              </TouchableOpacity>

              <Text className="text-neutral-400 text-xs">
                {formatTime(item.createdAt)}
              </Text>
            </View>
          </View>

          {/* 댓글 내용 or 입력창 */}
          {editCommentId === item.commentId ? (
            <View className="mt-1 px-3 pb-3 flex-row items-end border border-neutral-100 rounded-xl">
              <TextInput
                placeholder="댓글을 입력해 주세요"
                value={editContent}
                onChangeText={setEditContent}
                textAlignVertical="center"
                multiline={true}
                className="flex-1 text-neutral-800 text-sm"
              />

              <View className="flex-row gap-1">
                <View className="px-3 py-1 bg-neutral-100 rounded-lg">
                  <TouchableOpacity onPress={cancelEdit}>
                    <Text className="text-neutral-400 text-xs font-semibold">
                      취소
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="px-3 py-1 bg-blue-50 rounded-lg">
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text className="text-blue-500 text-xs font-semibold">
                      작성
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <Text className="text-neutral-800 text-sm">
              {item.commentContent}
            </Text>
          )}
        </View>
      )}
      scrollEnabled={false}
    />
  );
}
