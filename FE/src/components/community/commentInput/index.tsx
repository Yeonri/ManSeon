import { useState } from "react";
import { useAddComment } from "../../../api/queries/comment";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CommentInput({ boardId }: { boardId: number }) {
  const [comment, setComment] = useState<string>("");
  const { mutate: addComment } = useAddComment();

  return (
    <View className="px-3 pb-3 flex-row items-end border border-neutral-100 rounded-xl">
      <TextInput
        placeholder="댓글을 입력해 주세요"
        value={comment}
        onChangeText={setComment}
        textAlignVertical="center"
        multiline={true}
        className="flex-1 text-neutral-800 text-sm"
      />
      <View className="px-5 py-1 bg-blue-50 rounded-lg">
        <TouchableOpacity
          onPress={() => addComment({ boardId, content: comment })}
        >
          <Text className="text-blue-500 text-xs font-semibold">작성</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
