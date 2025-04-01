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
import IconDelete from "../../../assets/images/icon_delete.svg";
import IconEdit from "../../../assets/images/icon_edit.svg";
import TagFollow from "../../../assets/images/tag_follow.svg";
import { DeleteAlert } from "../../../utils/deleteAlert";
import { FormatTime } from "../../../utils/formatTime";

export function RecommentList({ recomments }: { recomments: Recomment[] }) {
  const [editRecommentId, setEditRecommentId] = useState<number | null>(null);
  const [recommendContent, setRecommentContent] = useState("");

  function handleRecomment(id: number, content: string) {
    setEditRecommentId(id);
    setRecommentContent(content);
  }

  function handleEditCancel() {
    setEditRecommentId(null);
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
                  onPress={() => DeleteAlert("답글")}
                  className="h-6"
                >
                  <IconDelete />
                </TouchableOpacity>
                <Text className="text-neutral-400 text-sm">
                  {FormatTime(item.createAt)}
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
