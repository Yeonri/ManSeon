import { useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import Form from "../../common/form";
import { useAddInquiry, useGetInquiry } from "../../../api/queries/inquiry";
import TabMenu from "../../common/tabMenu";
import UserInquiryCard from "../userInquiryCard";
import CustomButton from "../../common/customButton";

export default function UserInquriy() {
  const [selectedMenu, setSelectedMenu] = useState<string>("list");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { mutate: addInquiry } = useAddInquiry();
  const { data } = useGetInquiry();

  // 문의사항 입력 취소
  function handleCancel() {
    Alert.alert("삭제", "입력된 내용을 취소하시겠습니까?", [
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

  // 문의사항 저장
  function handleSave() {
    if (!title || !content)
      return Alert.alert("입력 오류", "제목과 내용을 모두 입력해주세요.");

    addInquiry({ title, content: content });
    setTitle("");
    setContent("");
  }

  return (
    <View>
      <TabMenu
        tabs={[
          { key: "list", label: "문의 내역" },
          { key: "inquriy", label: "문의 하기" },
        ]}
        onSelect={(key) => {
          setSelectedMenu(key);
          setTitle("");
          setContent("");
        }}
      />
      {/* 문의내역 조회 */}
      {/* 사용자가 입력한 문의사항이 존재하는 경우 */}
      {selectedMenu === "list" && data && data.length > 0 && (
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={({ item, index }) => (
            <View className={index === data.length ? "" : "pb-3"}>
              <UserInquiryCard
                inquiryId={item.inquiryId}
                title={item.title}
                status={item.status}
              />
            </View>
          )}
        />
      )}

      {/* 사용자가 입력한 문의사항이 없거나 로딩 중인 상태  */}
      {selectedMenu === "list" && data && data.length === 0 && (
        <View
          className="flex-1 items-center gap-3"
          style={{ marginVertical: 100 }}
        >
          <View className="items-center gap-1">
            <Text className="text-neutral-600 text-sm mt-5">
              만선에 의견이 있다면
            </Text>
            <View className="flex-row">
              <Text className="text-violet-700 font-bold text-sm">
                "문의 하기"
              </Text>
              <Text className="text-neutral-600 text-sm">
                를 눌러서 문의사항을 남겨주세요.
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* 문의사항 작성 */}
      {selectedMenu === "inquriy" && (
        <View className="gap-5">
          <Form
            title={title}
            content={content}
            setTitle={setTitle}
            setContent={setContent}
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
                full={true}
                title="확인"
                onPress={handleSave}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
