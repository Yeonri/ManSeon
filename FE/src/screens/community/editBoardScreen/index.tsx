import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEditBoard } from "../../../api/queries/board";
import Header from "../../../components/common/header";
import selectImage from "../../../utils/selectImage";
import CustomButton from "../../../components/common/customButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommunityStackParams } from "../../../navigation/types";
import { Upload } from "lucide-react-native";

interface EditBoardScreenProps
  extends NativeStackScreenProps<CommunityStackParams, "EditBoard"> {}

export default function EditBoardScreen({
  route,
  navigation,
}: EditBoardScreenProps) {
  const { boardId, title, content, image } = route.params;

  const [editTitle, setEditTitle] = useState<string>(title);
  const [editContent, setEditContent] = useState<string>(content);
  const [editImage, setEditImage] = useState<string>(image);
  const [editImageBase64, setEditImageBase64] = useState<string>("");

  const isSavable = editTitle.trim() !== "" && editContent.trim() !== "";
  const { mutate: editBoard } = useEditBoard();

  function handleSave() {
    editBoard(
      {
        boardId,
        title: editTitle,
        content: editContent,
        image: editImageBase64,
      },
      {
        onSuccess: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "BoardDetail", params: { boardId } }],
          });
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
        onPress: () => {
          setEditImage("");
          setEditImageBase64("");
        },
      },
    ]);
  }

  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={false} title="게시글 편집" before={true} />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 52 }}>
        <View className="mx-5 gap-7">
          <View>
            <Text className=" text-neutral-600 font-semibold">제목</Text>
            <TextInput
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="제목을 입력해 주세요"
              textAlignVertical="center"
              className="px-3 text-neutral-800 text-sm border-b border-neutral-100"
            />
          </View>
          <View className="gap-5">
            <Text className=" text-neutral-600 font-semibold">사진 업로드</Text>
            {editImage ? (
              <TouchableOpacity onPress={deleteImage}>
                <Image
                  source={{ uri: editImage }}
                  className="w-full h-60 rounded-xl"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  selectImage((uri, base64) => {
                    setEditImage(uri);
                    setEditImageBase64(base64);
                  });
                }}
              >
                <View className="m-1 h-36 justify-center items-center rounded-xl bg-neutral-50 gap-2">
                  <Upload size={25} color={"#A3A3A3"} strokeWidth={1.5} />
                  <Text className="text-neutral-400 text-sm">
                    사진을 촬영하거나 선택하여 업로드 해주세요
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View className="gap-5">
            <Text className=" text-neutral-600 font-semibold">내용</Text>
            <TextInput
              value={editContent}
              onChangeText={setEditContent}
              placeholder="내용을 입력해주세요"
              textAlignVertical="center"
              multiline={true}
              className="px-3 text-neutral-800 text-sm border border-neutral-100 rounded-xl min-h-48"
            />
          </View>
          <CustomButton
            fill={true}
            full={true}
            title="저장"
            disable={!isSavable}
            onPress={handleSave}
          />
        </View>
        <View className="m-12" />
      </ScrollView>
    </SafeAreaView>
  );
}
