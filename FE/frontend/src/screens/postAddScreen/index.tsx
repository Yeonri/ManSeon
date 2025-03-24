import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import { UploadImage } from "../../components/community/uploadImage";

export function PostAddScreen() {
  return (
    <SafeAreaView className="mx-5">
      <HeaderBeforeTitle name="게시글 작성" />
      <View className="mx-5 my-10 gap-10">
        <View>
          <Text className="text-lg font-bold color-stone-600">제목</Text>
          <View className="border-b border-stone-200">
            <TextInput
              placeholder="제목을 입력해주세요"
              textAlignVertical="center"
              className="ml-3 my-2"
            />
          </View>
        </View>
        <Text className="text-lg font-bold color-stone-600">사진 업로드</Text>
        <TouchableOpacity onPress={() => {}}>
          <UploadImage />
        </TouchableOpacity>
        <View>
          <Text className="text-lg font-bold color-stone-600 mb-10">내용</Text>
          <View className="border border-stone-200 rounded-lg pb-28">
            <TextInput
              placeholder="내용을 입력해주세요"
              textAlignVertical="center"
              multiline={true}
              className="ml-3 my-2"
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {}}
          className="bg-blue-500 rounded-xl py-3 items-center"
        >
          <Text className="text-white font-bold">저장</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
