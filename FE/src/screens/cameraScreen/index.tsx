import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight, X } from "lucide-react-native";
import { useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { PhotoFile } from "react-native-vision-camera";
import { RootStackParams } from "../../api/types/RootStackParams";
import { CameraView } from "../../components/cameraRecord/cameraView";
import { FullButton } from "../../components/common/fullButton";
import { PermissionCheck } from "../../components/common/permissionCheck";
import { useCameraPermission } from "../../hooks/useCameraPermission";
import { imageToTensor } from "../../utils/imageProcessor";
import { loadModel, runModelOnImage } from "../../utils/tfliteRunner";

export function CameraScreen() {
  const hasCameraPermission = useCameraPermission();
  const [photo, setPhoto] = useState<PhotoFile | null>(null);
  const sheetRef = useRef<Modalize>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [selectedFishName, setSelectedFishName] = useState<string | null>(null);
  const [next, setNext] = useState<boolean>(true);
  const [processedUri, setProcessedUri] = useState<string | null>(null);
  const [predictionResults, setPredictionResults] = useState<any[]>([]);

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

  async function handlePhotoTaken(newPhoto: PhotoFile) {
    try {
      setPhoto(newPhoto);
      const fileUri = newPhoto.path.startsWith("file://")
        ? newPhoto.path
        : `file://${newPhoto.path}`;

      const { processedUri: uri } = await imageToTensor(fileUri);
      setProcessedUri(uri);
      // console.log("원본", newPhoto?.path);
      // console.log("변환:", uri);

      await loadModel();
      console.log("모델 로딩 했음");
      const results = await runModelOnImage(uri);
      console.log("추론 결과", results);
      setPredictionResults(results);
    } catch (e: unknown) {
      console.log(processedUri);
      console.log("사진 처리 중 오류 발생", e);
      if (e instanceof Error) throw new Error(e.message);
      else throw new Error("unknown Error");
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
            source={{ uri: "file://" + photo.path }}
            className="flex-1 resize-contain"
          />
        </View>
      ) : (
        <CameraView onPhotoTaken={handlePhotoTaken} />
      )}
      <Modalize ref={sheetRef} snapPoint={300}>
        <View className="p-10">
          {/* <Probability
            onSelectedFishName={setSelectedFishName}
            onNext={setNext}
            processedUri={processedUri}
          /> */}
          <View className="flex-1 p-5" />
          <FullButton name="다음" disable={next} onPress={handleNext} />
        </View>
      </Modalize>
    </View>
  );
}
