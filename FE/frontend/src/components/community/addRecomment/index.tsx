import { Text, TextInput, TouchableOpacity, View } from "react-native";

export function AddRecomment() {
  return (
    <View className="border border-stone-200 rounded-lg ml-7">
      <View className="flex-row items-center mx-3 my-1 justify-between">
        <TextInput
          placeholder="내용을 입력해주세요"
          textAlignVertical="center"
          multiline={true}
        />
        <TouchableOpacity
          onPress={() => {}}
          className="px-3 py-1 bg-blue-100 rounded-xl"
        >
          <Text className="text-blue-600 font-semibold text-sm">저장</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
