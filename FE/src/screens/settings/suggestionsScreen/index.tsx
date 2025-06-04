import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HalfButton } from "../../../components/common/halfButton";
import { HeaderBeforeTitle } from "../../../components/common/headerBeforeTitle";
import { SaveModal } from "../../../components/setting/saveModal";

export function SuggestionsScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const handleSave = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1">
      <HeaderBeforeTitle name="문의사항" />
      <ScrollView className="mb-10 ">
        <View className="mx-5 my-5 mb-14 gap-10">
          <View>
            <Text className="text-base font-bold mb-2">제목</Text>
            <View className="border border-neutral-400 rounded-xl px-3 py-1">
              <TextInput placeholder="제목을 입력해 주세요." />
            </View>
          </View>
          <View>
            <Text className="text-base font-bold mb-2">내용</Text>
            <View className="border border-neutral-400 rounded-xl px-4 py-3 h-96">
              <TextInput placeholder="내용을 입력해 주세요." />
            </View>
          </View>

          <View className="flex-1 flex-row justify-between px-10">
            <HalfButton
              title="취소"
              type="line"
              onPress={() => navigation.goBack()}
            />
            <HalfButton title="저장" type="default" onPress={handleSave} />
          </View>
        </View>
      </ScrollView>
      <SaveModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
}
