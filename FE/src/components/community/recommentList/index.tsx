import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Recomment } from "../../../api/types/Recomment";
import IconArrow from "../../../assets/images/icon_arrow.svg";
import IconDelete from "../../../assets/images/icon_delete.svg";
import IconEdit from "../../../assets/images/icon_edit.svg";
import TagFollow from "../../../assets/images/tag_follow.svg";

export function RecommentList({ recomments }: { recomments: Recomment[] }) {
  const [editRecommentId, setEditRecommentId] = useState<number | null>(null);
  const [recommendContent, setRecommentContent] = useState("");

  function formatTime(time: string) {
    return formatDistanceToNow(new Date(time), { addSuffix: true, locale: ko });
  }

  function handleRecomment(id: number, content: string) {
    setEditRecommentId(id);
    setRecommentContent(content);
  }

  function handleEditCancel() {
    setEditRecommentId(null);
  }

  function createDeleteAlert() {
    Alert.alert("답글 삭제", "답글을 삭제하시겠습니까?", [
      { text: "아니오", onPress: () => {} },
      { text: "네", onPress: () => {} },
    ]);
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
                    <Image
                      source={{ uri: item.profileImg }}
                      className="w-10 h-10 rounded-full"
                    />
                    <Text className="font-semibold">{item.nickname}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <TagFollow />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex-row items-center gap-1">
                <TouchableOpacity
                  onPress={() =>
                    handleRecomment(item.recommentId, item.recommentContent)
                  }
                  className="h-6"
                >
                  <IconEdit />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => createDeleteAlert()}
                  className="h-6"
                >
                  <IconDelete />
                </TouchableOpacity>
                <Text className="text-neutral-400 text-sm">
                  {formatTime(item.createAt)}
                </Text>
              </View>
            </View>
            {editRecommentId === item.recommentId ? (
              <View className="border border-stone-200 rounded-lg ml-7 mt-1">
                <View className="flex-row items-center mx-3 mt-1">
                  <TextInput
                    value={recommendContent}
                    onChangeText={setRecommentContent}
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
