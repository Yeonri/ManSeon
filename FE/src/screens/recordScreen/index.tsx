import { useState } from "react";
import { Image, View } from "react-native";
import { PhotoFile } from "react-native-vision-camera";
import { CameraView } from "../../components/cameraRecord/cameraView";
import { PermissionCheck } from "../../components/common/permissionCheck";
import { PermissionNotice } from "../../components/common/permissionNotice";
import { useCameraPermission } from "../../hooks/useCameraPermission";

export function RecordScreen() {
  const hasPermission = useCameraPermission();
  const [photo, setPhoto] = useState<PhotoFile | null>(null);

  if (hasPermission === null) {
    return <PermissionCheck name="카메라" />;
  }

  if (hasPermission === false) {
    return <PermissionNotice name="카메라" />;
  }

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
