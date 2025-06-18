import { TextInput, View } from "react-native";

export default function Form({
  title,
  content,
  setTitle,
  setContent,
}: {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
}) {
  return (
    <View className="p-3 bg-blue-50 rounded-xl">
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="제목을 입력해주세요"
        className="font-bold text-neutral-800 mb-2"
      />

      <View className="w-full h-[1px] bg-neutral-200" />

      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="내용을 입력해주세요"
        textAlignVertical="top"
        multiline
        className="h-[300px] self-start text-sm text-neutral-600 mt-2"
      />
    </View>
  );
}
