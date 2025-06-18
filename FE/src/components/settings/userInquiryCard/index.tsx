import {
  Check,
  ChevronDown,
  ChevronUp,
  Loader,
  SquarePen,
  Trash2,
} from "lucide-react-native";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  useDeleteInquiry,
  useEditInquiry,
  useGetInquiryDetail,
} from "../../../api/queries/inquiry";

export default function UserInquiryCard({
  inquiryId,
  title,
  status,
}: {
  inquiryId: number;
  title: string;
  status: string;
}) {
  const color: string = "#A3A3A3";
  const size: number = 18;
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(title);
  const [editContent, setEditContent] = useState<string>("");

  const { data } = useGetInquiryDetail(inquiryId);
  const { mutate: editInquiry } = useEditInquiry();
  const { mutate: deleteInquiry } = useDeleteInquiry();

  // 수정
  function handleEdit() {
    setEditTitle(title);
    setEditContent(data?.questionContent ?? "");
    setIsEdit(true);
  }

  // 수정 내용 저장
  function handleEditSave() {
    if (!editTitle || !editContent)
      return Alert.alert("입력 오류", "제목과 내용을 모두 입력해주세요.");

    if (editTitle === title || editContent === data?.questionContent)
      setIsEdit(false);

    editInquiry(
      { inquiryId, title: editTitle, content: editContent },
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
          setEditContent(data?.questionContent ?? "");
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
          deleteInquiry(inquiryId);
        },
      },
    ]);
  }

  return (
    <View className="p-5 bg-white rounded-xl gap-5">
      {/* 헤더 */}

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {status === "PENDING" ? (
            <Loader color={"#A684FF"} size={size} />
          ) : (
            <Check color={"#7FD19B"} size={size} />
          )}
          {isEdit ? (
            <TextInput
              value={editTitle}
              onChangeText={setEditTitle}
              className="text-neutral-800 font-bold"
            />
          ) : (
            <Text className="text-neutral-800 font-bold">{title}</Text>
          )}
        </View>
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
          {!isEdit && (
            <View className="flex-row items-center justify-between">
              <Text className="text-neutral-600 text-sm">
                {data.questionDate.slice(0, 10).replaceAll("-", ".")}{" "}
                {data.questionDate.slice(11, 16)}
              </Text>

              <View className="flex-row items-center gap-1">
                {/* 수정 버튼 */}
                {status === "PENDING" && !isEdit && (
                  <TouchableOpacity onPress={handleEdit}>
                    <SquarePen color={color} size={size - 2} />
                  </TouchableOpacity>
                )}
                {/* 삭제 버튼 */}
                <TouchableOpacity onPress={handleDelete}>
                  <Trash2 color={color} size={size - 4} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 사용자 문의사항 */}
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
            <Text className="text-neutral-600 text-sm">
              {data.questionContent}
            </Text>
          )}

          <View
            className="w-full h-[1px] bg-neutral-100"
            style={{ marginVertical: 20 }}
          />

          {/* 관리자 답변 */}

          {/* 관리자 답변 전 */}
          {status === "PENDING" && (
            <View className="gap-3 mb-5">
              <Text className="text-neutral-800 font-bold text-sm">
                [답변 대기 중]
              </Text>
              <View>
                <Text className="text-neutral-600 text-sm">
                  운영팀에서 확인 중입니다.
                </Text>
                <Text className="text-neutral-600 text-sm">
                  빠른 시일 내에 답변드리겠습니다.
                </Text>
              </View>
            </View>
          )}

          {/* 관리자 답변 후 */}
          {status !== "PENDING" && (
            <View className="gap-2 mb-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-neutral-600 text-sm">
                  {data.answerDate.slice(0, 10).replaceAll("-", ".")}{" "}
                  {data.answerDate.slice(11, 16)}
                </Text>
              </View>

              <Text className="text-neutral-600 text-sm">
                {data.answerContent}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
