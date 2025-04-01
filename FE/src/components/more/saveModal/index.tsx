import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

type SaveModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function SaveModal(props: SaveModalProps) {
  const { visible, onClose } = props;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/60">
        <View className="bg-white p-4 w-[80%] rounded-2xl items-center">
          <Text className="text-lg font-bold mb-2">문의사항</Text>
          <Text className="text-base text-center mb-6">
            문의사항이 전송되었습니다.
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="bg-blue-500 rounded-xl px-6 py-3"
          >
            <Text className="text-white font-semibold text-base">확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
