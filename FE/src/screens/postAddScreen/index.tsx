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
import { useAddPost } from "../../api/quries/usePost";
import { FullButton } from "../../components/common/fullButton";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import { UploadImage } from "../../components/community/uploadImage";
import { CommunityStackParams } from "../../navigation/types";
import selectImage from "../../utils/selectImage";

interface PostAddScreenProps
  extends NativeStackScreenProps<CommunityStackParams, "AddPost"> {}

export function PostAddScreen({ navigation }: PostAddScreenProps) {
  const [addTitle, setAddTitle] = useState("");
  const [addContent, setAddContent] = useState("");
  const [addPostImage, setAddPostImage] = useState("");
  const isSavable = addTitle.trim() !== "" && addContent.trim() !== "";
  const { mutate: addPost } = useAddPost();

  function handleSave() {
    console.log("게시글 추가 요청");
    return addPost(
      {
        title: addTitle,
        content: addContent,
        postImg: addPostImage,
      },
      {
        onSuccess: () => {
          console.log("게시글 추가 성공");
          navigation.navigate("Community");
        },
        onError: () => {
          console.log("게시글 추가 실패");
          Alert.alert("게시글 추가 실패", "잠시 후 다시 시도해주세요.");
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
        onPress: () => setAddPostImage(""),
      },
    ]);
  }

  return (
    <SafeAreaView>
      <HeaderBeforeTitle name="게시글 작성" />
      <ScrollView className="mb-10">
        <View className="mx-5 my-5 mb-14 gap-10">
          <View>
            <Text className="text-lg font-bold text-neutral-600">제목</Text>
            <View className="border-b border-neutral-200">
              <TextInput
                value={addTitle}
                onChangeText={setAddTitle}
                placeholder="제목을 입력해주세요"
                textAlignVertical="center"
                className="ml-3 my-2"
              />
            </View>
          </View>
          <View className="gap-5">
            <Text className="text-lg font-bold text-neutral-600">
              사진 업로드
            </Text>
            {addPostImage ? (
              <TouchableOpacity onPress={deleteImage}>
                <Image
                  source={{ uri: addPostImage }}
                  className="w-full h-96 rounded-lg"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  selectImage((uri) => {
                    setAddPostImage(uri);
                  });
                }}
              >
                <UploadImage />
              </TouchableOpacity>
            )}
          </View>
          <View className="gap-5">
            <Text className="text-lg font-bold text-neutral-600">내용</Text>
            <View className="border border-neutral-200 rounded-lg min-h-48">
              <TextInput
                value={addContent}
                onChangeText={setAddContent}
                placeholder="내용을 입력해주세요"
                textAlignVertical="center"
                multiline={true}
                className="mx-3 my-2"
              />
            </View>
          </View>
          <FullButton name="저장" disable={!isSavable} onPress={handleSave} />
        </View>
        <View className="m-12" />
      </ScrollView>
    </SafeAreaView>
  );
}
