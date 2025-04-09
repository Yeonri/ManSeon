import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Recomment } from "../../../api/types/Recomment";
import IconArrow from "../../../assets/images/icon_arrow.svg";
import TagFollow from "../../../assets/images/tag_follow.svg";
import { DeleteAlert } from "../../../utils/deleteAlert";
import { FormatTime } from "../../../utils/formatTime";
import DefaultProfile from "../../../assets/images/image_default.svg";
import { Pencil, Trash2 } from "lucide-react-native";
import { useUserStore } from "../../../store/userStore";
import {
  useDeleteComment,
  useEditComment,
} from "../../../api/quries/useComment";

export function RecommentList({
  recomments,
  boardId,
}: {
  recomments: Recomment[];
  boardId: number;
}) {
  const userId = useUserStore((state) => state.user);
  const [editRecommentId, setEditRecommentId] = useState<number>(0);
  const [recommentContent, setRecommentContent] = useState("");
  const { mutate: editRecomment } = useEditComment();
  const { mutate: deleteRecomment } = useDeleteComment();

  function handleEdit(id: number, content: string) {
    setEditRecommentId(id);
    setRecommentContent(content);
  }

  function cancelEdit() {
    setRecommentContent("");
    setEditRecommentId(0);
  }

  return (
    <View>
      <FlatList
        data={recomments}
        renderItem={({ item }) => (
          <View>
            <View className="flex-row items-center justify-between mt-3 mb-2">
              <View className="flex-row items-center">
                <IconArrow />
                <View className="flex-row items-center gap-2">
                  <TouchableOpacity className="flex-row items-center gap-2">
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
                  <TouchableOpacity>
                    <TagFollow />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex-row items-center gap-1">
                {item.userId === userId?.id && (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        handleEdit(item.recommentId, item.recommentContent)
                      }
                      className="h-6"
                    >
                      <Pencil color={"#A1A1A1"} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        DeleteAlert("답글", () =>
                          deleteRecomment({
                            boardId,
                            commentId: item.recommentId,
                          })
                        )
                      }
                      className="h-6"
                    >
                      <Trash2 color={"#A1A1A1"} size={20} />
                    </TouchableOpacity>
                  </>
                )}
                <Text className="text-neutral-400 text-sm">
                  {FormatTime(item.createdAt)}
                </Text>
              </View>
            </View>

            {editRecommentId === item.recommentId ? (
              <View className="border border-stone-200 rounded-lg ml-7 mt-1">
                <View className="flex-row items-center mx-3 mt-1">
                  <TextInput
                    value={recommentContent}
                    onChangeText={setRecommentContent}
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
                      editRecomment(
                        {
                          boardId: boardId,
                          commentId: editRecommentId,
                          content: recommentContent,
                        },
                        { onSuccess: cancelEdit }
                      )
                    }
                    className="px-5 py-1 bg-blue-500 rounded-xl self-end"
                  >
                    <Text className="text-white font-semibold text-sm">
                      저장
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Text className="ml-16">{item.recommentContent}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}
