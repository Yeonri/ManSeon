import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEditPost } from "../../api/quries/usePost";
import { FullButton } from "../../components/common/fullButton";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import { UploadImage } from "../../components/community/uploadImage";
import { CommunityStackParams } from "../../types/CommunityStackParams";
import { selectImage } from "../../utils/selectImage";

interface PostEditScreenProps
  extends NativeStackScreenProps<CommunityStackParams, "EditPost"> {}

export function PostEditScreen({ route, navigation }: PostEditScreenProps) {
  const { postId, title, content, postImg } = route.params;
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [editPostImage, setEditPostImage] = useState(postImg);
  const isSavable = editTitle.trim() !== "" && editContent.trim() !== "";
  const { mutate: editPost } = useEditPost();

  function handleEdit() {
    console.log("게시글 편집 요청");
    return editPost(
      {
        boardId: postId,
        title: editTitle,
        content: editContent,
        postImg: editPostImage,
      },
      {
        onSuccess: () => {
          console.log("게시글 편집 성공");
          navigation.navigate("Post", { postId });
        },
        onError: (e: unknown) => {
          console.log("게시글 편집 실패", e);
          Alert.alert("게시글 편집 실패", "잠시 후 다시 시도해주세요.");
        },
      }
    );
  }

  function deleteImage() {
    Alert.alert("사진 삭제", "사진을 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => setEditPostImage(""),
      },
    ]);
  }

  return (
    <SafeAreaView>
      <HeaderBeforeTitle name="게시글 편집" />
      <ScrollView className="mb-10">
        <View className="mx-5 my-5 gap-10">
          <View>
            {/* 제목 */}
            <Text className="text-lg font-bold text-neutral-600">제목</Text>
            <View className="border-b border-neutral-200">
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
            {/* 사진 */}
            <Text className="text-lg font-bold text-neutral-800">
              사진 업로드
            </Text>
            {editPostImage ? (
              <TouchableOpacity onPress={deleteImage}>
                <Image
                  source={{ uri: editPostImage }}
                  className="w-full h-96 rounded-lg"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  selectImage((uri) => {
                    setEditPostImage(uri);
                  });
                }}
              >
                <UploadImage />
              </TouchableOpacity>
            )}
          </View>
          <View className="gap-5">
            {/* 내용 */}
            <Text className="text-lg font-bold text-neutral-800">내용</Text>
            <View className="border border-neutral-200 rounded-lg min-h-48">
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
          <FullButton name="저장" disable={!isSavable} onPress={handleEdit} />
        </View>
        <View className="m-12" />
      </ScrollView>
    </SafeAreaView>
  );
}
