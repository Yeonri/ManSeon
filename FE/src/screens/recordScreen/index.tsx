import { useState } from "react";
import { View, Image } from "react-native";
import { PhotoFile } from "react-native-vision-camera";
import { useCameraPermission } from "../../hooks/useCameraPermission";
import { PermissionNotice } from "../../components/common/permissionNotice";
import { PermissionCheck } from "../../components/common/permissionCheck";
import { CameraView } from "../../components/cameraRecord/cameraView";

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
