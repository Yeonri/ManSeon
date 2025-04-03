import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight, X } from "lucide-react-native";
import { useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { PhotoFile } from "react-native-vision-camera";
import { RootStackParams } from "../../api/types/RootStackParams";
import { CameraView } from "../../components/cameraRecord/cameraView";
import { Probability } from "../../components/cameraRecord/probability";
import { FullButton } from "../../components/common/fullButton";
import { PermissionCheck } from "../../components/common/permissionCheck";
import { useCameraPermission } from "../../hooks/useCameraPermission";
import { ResizeImage } from "../../utils/resizeImage";

export function CameraScreen() {
  const hasCameraPermission = useCameraPermission();
  const [photo, setPhoto] = useState<PhotoFile | null>(null);
  const sheetRef = useRef<Modalize>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [selectedFishName, setSelectedFishName] = useState<string | null>(null);

  async function handlePhoto(original: PhotoFile) {
    try {
      const croppedUri = await ResizeImage("file://" + original.path);
      const croppedPhoto: PhotoFile = {
        ...original,
        path: String(croppedUri).replace("file://", ""),
      };
      setPhoto(croppedPhoto);
      console.log("[ResizeImage] 최종 이미지 URI:", croppedPhoto);
    } catch (e: unknown) {
      console.error("사진 처리 중 오류 발생", e);
    }
  }

  function openBottomSheet() {
    sheetRef.current?.open();
  }

  function handleNext() {
    if (photo?.path && selectedFishName) {
      navigation.navigate("Record", {
        photoUri: photo.path,
        fishName: selectedFishName,
      });
    }
  }

  if (hasCameraPermission === null) {
    return <PermissionCheck name="카메라" />;
  }

  return (
    <View className="flex-1">
      {photo ? (
        <View className="flex-1">
          <TouchableOpacity
            onPress={() => setPhoto(null)}
            className="absolute top-5 left-5 z-10"
          >
            <X color="white" size={50} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openBottomSheet}
            className="absolute top-5 right-5 z-10"
          >
            <ChevronRight color="white" size={50} />
          </TouchableOpacity>

          <Image
            source={{
              uri: "file://" + photo.path,
            }}
            className="flex-1 object-contain"
          />
        </View>
      ) : (
        <CameraView onPhotoTaken={handlePhoto} />
      )}
      <Modalize ref={sheetRef} snapPoint={300}>
        <View className="p-10">
          <Probability onSelectedFishName={setSelectedFishName} />
          <View className="flex-1 p-5" />
          <FullButton name="다음" disable={false} onPress={handleNext} />
        </View>
      </Modalize>
    </View>
  );
}
