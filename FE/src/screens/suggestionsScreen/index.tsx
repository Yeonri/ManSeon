import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import { SaveModal } from "../../components/more/saveModal";

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
            <View className="border border-neutral-400 rounded-xl px-4 py-2">
              <TextInput placeholder="제목을 입력해 주세요." />
            </View>
          </View>
          <View>
            <Text className="text-base font-bold mb-2">내용</Text>
            <View className="border border-neutral-400 rounded-xl px-4 py-3 h-96">
              <TextInput placeholder="내용을 입력해 주세요." />
            </View>
          </View>

          <View className="flex-1 flex-row justify-between px-5">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="border border-blue-500 bg-white rounded-2xl w-40 py-3 items-center"
            >
              <Text className="text-blue-500 font-bold ">취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="bg-blue-500 rounded-2xl py-3 w-40 items-center"
            >
              <Text className="text-white font-bold">저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <SaveModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
