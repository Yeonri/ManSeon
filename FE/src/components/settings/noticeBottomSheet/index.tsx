import { RefObject, useState } from "react";
import { Alert, ScrollView, TextInput, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { useAddNotice } from "../../../api/queries/notice";
import CustomButton from "../../common/customButton";

export default function NoticeBottomSheet({
  height,
  sheetRef,
}: {
  height: number;
  sheetRef: RefObject<Modalize | null>;
}) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { mutate: addNotice } = useAddNotice();

  function handleSave() {
    if (!title || !content) return;

    addNotice(
      { title, content },
      {
        onSuccess: () => {
          sheetRef.current?.close();
        },
      }
    );
  }

  function handleCancel() {
    Alert.alert("삭제", "입력된 내용을 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        style: "destructive",
        onPress: () => {
          setTitle("");
          setContent("");
        },
      },
    ]);
  }

  return (
    <Modalize ref={sheetRef} snapPoint={height * 0.7}>
      {/* 헤더 */}
      <View className="mx-5 mt-7 mb-5 flex-row items-center justify-start gap-2">
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="제목을 입력해주세요"
          className="text-lg font-bold self-center"
        />
      </View>

      {/* 본문 */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <View className="mx-5">
          <TextInput
            value={content}
            onChangeText={setContent}
            textAlignVertical="top"
            multiline
            placeholder="내용을 입력해주세요"
            className="h-[300px] text-neutral-600"
          />
          <View className="flex-row gap-3">
            <View className="flex-1">
              <CustomButton
                fill={false}
                full={false}
                title="취소"
                onPress={handleCancel}
              />
            </View>
            <View className="flex-1">
              <CustomButton
                fill={true}
                full={false}
                title="확인"
                onPress={handleSave}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modalize>
  );
}
