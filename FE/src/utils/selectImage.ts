import { launchImageLibrary } from "react-native-image-picker";

export function selectImage(onSelect: (uri: string) => void) {
  launchImageLibrary({ mediaType: "photo" }, (res) => {
    if (res.didCancel) {
      console.log("이미지 선택 취소");
    } else if (res.errorCode) {
      console.log("에러 발생:", res.errorMessage);
    } else if (res.assets && res.assets.length > 0) {
      const selectedImageUri = res.assets[0].uri;
      if (selectedImageUri) {
        onSelect(selectedImageUri);
      }
    }
  });
}
