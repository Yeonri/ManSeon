import { ChevronDown, ChevronUp, SquarePen, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useLoginStore } from "../../../store/loginStore";
import {
  useDeleteNotice,
  useEditNotice,
  useGetNoticeDetail,
} from "../../../api/queries/notice";

export default function NoticeList({
  noticeId,
  title,
}: {
  noticeId: number;
  title: string;
}) {
  const color: string = "#A3A3A3";
  const size: number = 18;
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(title);
  const [editContent, setEditContent] = useState<string>("");
  const { user } = useLoginStore();

  const { data } = useGetNoticeDetail(noticeId);
  const { mutate: editNotice } = useEditNotice();
  const { mutate: deleteNotice } = useDeleteNotice();

  // 수정
  function handleEdit() {
    setEditTitle(title);
    setEditContent(data?.content ?? "");
    setIsEdit(true);
  }

  // 수정 내용 저장
  function handleEditSave() {
    if (!editTitle || !editContent)
      return Alert.alert("입력 오류", "제목과 내용을 모두 입력해주세요.");

    if (editTitle === title || editContent === data?.content) setIsEdit(false);

    editNotice(
      { noticeId, title: editTitle, content: editContent },
      {
        onSuccess: () => {
          setEditTitle(title);
          setEditContent("");
          setIsEdit(false);
        },
        onError: () => {
          Alert.alert("수정 실패", "잠시 후 다시 시도해주세요.");
        },
      }
    );
  }

  // 수정 내용 취소
  function handleEditCancel() {
    Alert.alert("취소", "수정을 취소하시겠습니까?", [
      { text: "아니오", style: "cancel" },
      {
        text: "예",
        style: "destructive",
        onPress: () => {
          setEditTitle(title);
          setEditContent(data?.content ?? "");
          setIsEdit(false);
        },
      },
    ]);
  }

  // 삭제
  function handleDelete() {
    Alert.alert("삭제", "입력된 내용을 취소하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        style: "destructive",
        onPress: () => {
          deleteNotice(noticeId);
        },
      },
    ]);
  }

  return (
    <View className="p-5 bg-white rounded-xl gap-5">
      {/* 헤더 */}

      <View className="flex-row items-center justify-between">
        {isEdit ? (
          <TextInput
            value={editTitle}
            onChangeText={setEditTitle}
            className="text-neutral-800 font-bold"
          />
        ) : (
          <Text className="text-neutral-800 font-bold">{title}</Text>
        )}
        <TouchableOpacity onPress={() => setIsToggleOpen(!isToggleOpen)}>
          {isToggleOpen ? (
            <ChevronUp color={color} size={size} />
          ) : (
            <ChevronDown color={color} size={size} />
          )}
        </TouchableOpacity>
      </View>

      {/* 본문 */}
      {data && isToggleOpen && (
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-neutral-600 text-sm">
              {data.createdAt.slice(0, 10).replaceAll("-", ".")}{" "}
              {data.createdAt.slice(11, 16)}
            </Text>
            {user?.role === "ADMIN" && !isEdit && (
              <View className="pt-1 flex-row items-center gap-1">
                {/* 수정 버튼 */}
                <TouchableOpacity onPress={handleEdit}>
                  <SquarePen color={color} size={size - 2} />
                </TouchableOpacity>
                {/* 삭제 버튼 */}
                <TouchableOpacity onPress={handleDelete}>
                  <Trash2 color={color} size={size - 2} />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {isEdit ? (
            <>
              <TextInput
                value={editContent}
                onChangeText={setEditContent}
                placeholder="내용을 입력해주세요"
                textAlignVertical="top"
                multiline
                className="h-[200px] self-start text-sm text-neutral-600"
              />
              <View className="pt-5 flex-row gap-3">
                <View className="flex-1">
                  <TouchableOpacity onPress={handleEditCancel}>
                    <View className="p-3 bg-white rounded-lg items-center border border-violet-400">
                      <Text className="text-violet-400 text-xs">취소</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View className="flex-1">
                  <TouchableOpacity onPress={handleEditSave}>
                    <View className="p-3 bg-violet-400 rounded-lg items-center border border-violet-400">
                      <Text className="text-white text-xs">저장</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <Text className="text-neutral-600 text-sm">{data.content}</Text>
          )}
        </View>
      )}
    </View>
  );
}
