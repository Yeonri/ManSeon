import { useState } from "react";
import { Image, View } from "react-native";
import { PhotoFile } from "react-native-vision-camera";
import { CameraView } from "../../components/cameraRecord/cameraView";
import { PermissionCheck } from "../../components/common/permissionCheck";
import { useCameraPermission } from "../../hooks/useCameraPermission";
// import { useLocationPermission } from "../../hooks/useLocationPermission";

export function RecordScreen() {
  const hasCameraPermission = useCameraPermission();
  // const hasLocationPermission = useLocationPermission();
  const [photo, setPhoto] = useState<PhotoFile | null>(null);

  if (hasCameraPermission === null) {
    return <PermissionCheck name="카메라" />;
  } else {
  }

  // if (hasLocationPermission === null) {
  //   return <PermissionCheck name="위치" />;
  // }

  return (
    <View className="flex-1">
      {photo ? (
        <Image
          source={{ uri: "file://" + photo.path }}
          className="flex-1 resize-contain"
        />
      ) : (
        <CameraView onPhotoTaken={setPhoto} />
      )}
    </View>
  );
}
