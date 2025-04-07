import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Comment } from "../../../api/types/Comment";
import TagFollow from "../../../assets/images/tag_follow.svg";
import { DeleteAlert } from "../../../utils/deleteAlert";
import { FormatTime } from "../../../utils/formatTime";
import { AddRecomment } from "../addRecomment";
import { RecommentList } from "../recommentList";
import DefaultProfile from "../../../assets/images/image_default.svg";
import { Pencil, Trash2 } from "lucide-react-native";
import { useUserStore } from "../../../store/userStore";
import {
  useDeleteComment,
  useEditComment,
} from "../../../api/quries/useComment";

export function CommentList({ comments }: { comments: Comment[] }) {
  const user = useUserStore((state) => state.user);
  const [edit, setEdit] = useState<boolean>(false);
  const [editCommentId, setEditCommentId] = useState<number>(0);
  const [commentContent, setCommentContent] = useState("");
  const { mutate: editComment } = useEditComment();
  const { mutate: deleteComment } = useDeleteComment();

  function handleEdit(id: number, content: string) {
    setEditCommentId(id);
    setCommentContent(content);
    setEdit(true);
  }

  function cancelEdit() {
    setCommentContent("");
    setEditCommentId(0);
    setEdit(false);
  }

  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <View>
          <View className="flex-row items-center justify-between mt-3 mb-2">
            {/* 유저 정보 */}
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                onPress={() => {}}
                className="flex-row items-center gap-2"
              >
                {item.profileImg ? (
                  <Image
                    source={{ uri: item.profileImg }}
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
                <Text className="font-semibold">{item.nickname}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} className="h-4">
                <TagFollow />
                {/* <TagFollowing /> */}
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center gap-1">
              {/* 편집, 삭제 */}
              {item.userId === user?.id ? (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      handleEdit(item.commentId, item.commentContent)
                    }
                    className="h-6"
                  >
                    <Pencil color={"#A1A1A1"} size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      DeleteAlert("댓글", () => deleteComment(item.commentId))
                    }
                    className="h-6"
                  >
                    <Trash2 color={"#A1A1A1"} size={20} />
                  </TouchableOpacity>
                </>
              ) : (
                <></>
              )}
              {/* 작성시간 */}
              <Text className="text-neutral-400 text-sm">
                {FormatTime(item.createdAt)}
              </Text>
            </View>
          </View>
          {/* 편집 권한 여부 */}
          {edit && editCommentId === item.commentId ? (
            <View className="border border-stone-200 rounded-lg">
              <View className="flex-row items-center mx-3 mt-1">
                <TextInput
                  value={commentContent}
                  onChangeText={setCommentContent}
                  placeholder="댓글을 입력해주세요"
                  textAlignVertical="center"
                  multiline={true}
                />
              </View>
              <View className="flex-row items-center justify-end m-3 gap-3">
                <TouchableOpacity
                  onPress={cancelEdit}
                  className="px-5 py-1 bg-blue-50 rounded-xl self-end"
                >
                  <Text className="text-blue-500 font-semibold text-sm">
                    취소
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    editComment(
                      { commentId: editCommentId, content: commentContent },
                      {
                        onSuccess: () => {
                          cancelEdit();
                        },
                      }
                    )
                  }
                  className="px-5 py-1 bg-blue-500 rounded-xl self-end"
                >
                  <Text className="text-white font-semibold text-sm">저장</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text className="ml-10">{item.commentContent}</Text>
          )}
          <View className="mt-2">
            <RecommentList recomments={item.recomment} />
          </View>
          <View className="my-4">
            <AddRecomment postId={item.boardId} commentId={item.commentId} />
          </View>
        </View>
      )}
      scrollEnabled={false}
    />
  );
}
