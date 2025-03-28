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
import IconDelete from "../../../assets/images/icon_delete.svg";
import IconEdit from "../../../assets/images/icon_edit.svg";
import TagFollow from "../../../assets/images/tag_follow.svg";
import { DeleteAlert } from "../../../utils/deleteAlert";
import { FormatTime } from "../../../utils/formatTime";
import { AddRecomment } from "../addRecomment";
import { RecommentList } from "../recommentList";

export function CommentList({ comments }: { comments: Comment[] }) {
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [commentContent, setCommentContent] = useState("");

  function handleComment(id: number, content: string) {
    setEditCommentId(id);
    setCommentContent(content);
  }

  function handleEditCancel() {
    setEditCommentId(null);
  }

  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <View>
          <View className="flex-row items-center justify-between mt-3 mb-2">
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                onPress={() => {}}
                className="flex-row items-center gap-2"
              >
                <Image
                  source={{ uri: item.profileImg }}
                  className="w-10 h-10 rounded-full"
                />
                <Text className="font-semibold">{item.nickname}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} className="h-4">
                <TagFollow />
                {/* <TagFollowing /> */}
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center gap-1">
              <TouchableOpacity
                onPress={() =>
                  handleComment(item.commentId, item.commentContent)
                }
                className="h-6"
              >
                <IconEdit />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => DeleteAlert("댓글")}
                className="h-6"
              >
                <IconDelete />
              </TouchableOpacity>
              <Text className="text-neutral-400 text-sm">
                {FormatTime(item.createAt)}
              </Text>
            </View>
          </View>
          {editCommentId === item.commentId ? (
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
                  onPress={handleEditCancel}
                  className="px-5 py-1 bg-blue-50 rounded-xl self-end"
                >
                  <Text className="text-blue-500 font-semibold text-sm">
                    취소
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {}}
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
            <RecommentList recomments={item.RecommentList} />
          </View>
          <View className="my-4">
            <AddRecomment />
          </View>
        </View>
      )}
      scrollEnabled={false}
    />
  );
}
