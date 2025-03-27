import { Text, View } from "react-native";
import IconUpload from "../../../assets/images/icon_upload.svg";

export function UploadImage() {
  return (
    <View className="bg-stone-100 py-10 items-center rounded-lg">
      <IconUpload />
      <Text className="ml-3 my-2 color-stone-400">
        사진을 촬영하거나 선택하여 업로드 해주세요
      </Text>
    </View>
  );
}
