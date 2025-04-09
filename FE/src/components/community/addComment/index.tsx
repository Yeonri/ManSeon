import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAddComment } from "../../../api/quries/useComment";

export function AddComment({ boardId }: { boardId: number }) {
  const [comment, setComment] = useState<string>("");
  const { mutate: addComment } = useAddComment();

  return (
    <View className="border border-stone-200 rounded-lg">
      <View className="flex-row items-center mx-3 mt-1">
        <TextInput
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChangeText={setComment}
          textAlignVertical="center"
          multiline={true}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          addComment({ boardId, parentId: null, content: comment })
        }
        className="mx-3 mb-3 px-5 py-1 bg-blue-500 rounded-xl self-end"
      >
        <Text className="text-white font-semibold text-sm">저장</Text>
      </TouchableOpacity>
    </View>
  );
}
