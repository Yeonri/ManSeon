import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAddComment } from "../../../api/quries/useComment";

export function AddRecomment({
  boardId,
  commentId,
}: {
  boardId: number;
  commentId: number;
}) {
  const [content, setContent] = useState("");
  const { mutate: addRecomment } = useAddComment();

  return (
    <View className="border border-stone-200 rounded-lg ml-7">
      <View className="flex-row items-center mx-3 mt-1">
        <TextInput
          placeholder="답글을 입력해주세요"
          textAlignVertical="center"
          multiline={true}
          value={content}
          onChangeText={setContent}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          addRecomment(
            { boardId, parentId: commentId, content },
            {
              onSuccess: () => setContent(""),
            }
          )
        }
        className="mx-3 mb-3 px-5 py-1 bg-blue-500 rounded-xl self-end"
      >
        <Text className="text-white font-semibold text-sm">저장</Text>
      </TouchableOpacity>
    </View>
  );
}
