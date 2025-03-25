import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Comment } from "../../../api/types/Comment";
import TagFollow from "../../../assets/images/tag_follow.svg";
import { AddRecomment } from "../addRecomment";
import { RecommentList } from "../recommentList";
import IconEdit from "../../../assets/images/icon_edit.svg";
import IconDelete from "../../../assets/images/icon_delete.svg";

export function CommentList({ comments }: { comments: Comment[] }) {
  function formatTime(time: string) {
    return formatDistanceToNow(new Date(time), { addSuffix: true, locale: ko });
  }

  function createDeleteAlert() {
    Alert.alert("댓글 삭제", "댓글을 삭제하시겠습니까?", [
      { text: "아니오", onPress: () => {} },
      { text: "네", onPress: () => {} },
    ]);
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
              <TouchableOpacity onPress={() => {}} className="h-6">
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

          <Text className="ml-10">{item.commentContent}</Text>
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
