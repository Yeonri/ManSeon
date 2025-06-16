import { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera, useCameraDevice, PhotoFile } from "react-native-vision-camera";
import Loading from "../../common/loading";

interface CameraViewProps {
  onPhotoTaken: (photo: PhotoFile) => void;
}

export default function CameraView({ onPhotoTaken }: CameraViewProps) {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");

  async function takePhoto() {
    if (camera.current == null) return;
    const photo = await camera.current.takePhoto();
    onPhotoTaken(photo);
  }

  if (device == null) {
    return <Loading />;
  }

  return (
    <View className="flex-1 relative">
      <Camera
        ref={camera}
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        photo={true}
      />
      <TouchableOpacity
        onPress={takePhoto}
        className="absolute bottom-14 self-center bg-white px-8 py-8 rounded-full"
      >
        <Text className="text-xl">📸</Text>
      </TouchableOpacity>
    </View>
  );
}
