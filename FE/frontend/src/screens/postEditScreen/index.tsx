import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommunityStackParams } from "../../api/types/CommunityStackParams";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import { UploadImage } from "../../components/community/uploadImage";

interface PostEditScreenProps
  extends NativeStackScreenProps<CommunityStackParams, "EditPost"> {}

export function PostEditScreen({ route }: PostEditScreenProps) {
  const { postId, title, content, postImg } = route.params;
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [editPostImg, setEditPostImg] = useState(postImg);

  return (
    <SafeAreaView>
      <HeaderBeforeTitle name="게시글 수정" />
      <ScrollView className="mb-10">
        <View className="mx-5 my-5 mb-14 gap-10">
          <View>
            <Text className="text-lg font-bold color-stone-600">제목</Text>
            <View className="border-b border-stone-200">
              <TextInput
                value={editTitle}
                onChangeText={setEditTitle}
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
            {editPostImg ? (
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={{ uri: editPostImg }}
                  className="w-full h-48 rounded-lg"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => {}}>
                <UploadImage />
              </TouchableOpacity>
            )}
          </View>
          <View className="gap-5">
            <Text className="text-lg font-bold color-stone-600">내용</Text>
            <View className="border border-stone-200 rounded-lg min-h-48">
              <TextInput
                value={editContent}
                onChangeText={setEditContent}
                placeholder="내용을 입력해주세요"
                textAlignVertical="center"
                multiline={true}
                className="mx-3 my-2"
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
      </ScrollView>
    </SafeAreaView>
  );
}
