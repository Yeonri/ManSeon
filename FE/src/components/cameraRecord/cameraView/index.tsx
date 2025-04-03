import { Circle } from "lucide-react-native";
import { useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { Camera, PhotoFile, useCameraDevice } from "react-native-vision-camera";
import { Loading } from "../../common/loading";

interface CameraViewProps {
  onPhotoTaken: (photo: PhotoFile) => void;
}

export function CameraView({ onPhotoTaken }: CameraViewProps) {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");

  async function takePhoto() {
    if (camera.current == null) return;
    const photo = await camera.current.takePhoto();
    onPhotoTaken(photo);
  }

  if (device == null) {
    return <Loading name="카메라" />;
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
      <View
        className="absolute top-0 left-0 right-0 bg-black/30 border-b border-white"
        style={{ height: "25%" }}
      />

      <View
        className="absolute bottom-0 left-0 right-0 bg-black/30 border-t border-white"
        style={{ height: "25%" }}
      />

      <TouchableOpacity
        onPress={takePhoto}
        className="absolute bottom-14 self-center bg-white rounded-full p-1"
      >
        <Circle size={60} color={"#525252"} />
      </TouchableOpacity>
    </View>
  );
}
