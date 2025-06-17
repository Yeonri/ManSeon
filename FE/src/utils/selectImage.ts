import { launchImageLibrary } from "react-native-image-picker";

export default function selectImage(
  onSelect: (uri: string, base64: string) => void
) {
  launchImageLibrary({ mediaType: "photo", includeBase64: true }, (res) => {
    if (res.didCancel) {
      console.log("이미지 선택 취소");
    } else if (res.errorCode) {
      console.log("에러 발생:", res.errorMessage);
    } else if (res.assets && res.assets.length > 0) {
      const asset = res.assets[0];
      const uri = asset.uri;
      const base64 = asset.base64;

      if (uri && base64) {
        // base64 MIME 타입을 붙여서 전달
        const base64WithPrefix = `data:${asset.type};base64,${base64}`;
        onSelect(uri, base64WithPrefix);
      }
    }
  });
}
