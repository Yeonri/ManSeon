import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import { UploadImage } from "../../components/community/uploadImage";
import { FullButton } from "../../components/common/fullButton";

export function PostAddScreen() {
  return (
    <SafeAreaView>
      <HeaderBeforeTitle name="게시글 작성" />
      <ScrollView className="mb-10">
        <View className="mx-5 my-5 mb-14 gap-10">
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
          <View className="gap-5">
            <Text className="text-lg font-bold color-stone-600">
              사진 업로드
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <UploadImage />
            </TouchableOpacity>
          </View>
          <View className="gap-5">
            <Text className="text-lg font-bold color-stone-600">내용</Text>
            <View className="border border-stone-200 rounded-lg min-h-48">
              <TextInput
                placeholder="내용을 입력해주세요"
                textAlignVertical="center"
                multiline={true}
                className="mx-3 my-2"
              />
            </View>
          </View>
          <FullButton name="저장" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
