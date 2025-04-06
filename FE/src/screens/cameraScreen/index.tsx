import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight, X } from "lucide-react-native";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { PhotoFile } from "react-native-vision-camera";
import { RootStackParams } from "../../api/types/RootStackParams";
import { CameraView } from "../../components/cameraRecord/cameraView";
import { Probability } from "../../components/cameraRecord/probability";
import { FullButton } from "../../components/common/fullButton";
import { PermissionCheck } from "../../components/common/permissionCheck";
import { useCameraPermission } from "../../hooks/useCameraPermission";
import { classifyFishImage } from "../../utils/nativeClassifier";

export function CameraScreen() {
  const hasCameraPermission = useCameraPermission();
  const [photo, setPhoto] = useState<PhotoFile | null>(null);
  const [selectedFishName, setSelectedFishName] = useState<string | null>(null);
  const [next, setNext] = useState<boolean>(true);
  const [detectedClassName, setDetectedClassName] = useState<string | null>(
    null
  );
  const [detectedScore, setDetectedScore] = useState<number | null>(null);
  const sheetRef = useRef<Modalize>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [detectedResults, setDetectedResults] = useState<
    {
      className: string;
      score: number;
      x: number;
      y: number;
      width: number;
      height: number;
    }[]
  >([]);

  const openBottomSheet = () => sheetRef.current?.open();

  const handleNext = () => {
    if (photo?.path && selectedFishName) {
      navigation.navigate("Record", {
        photoUri: photo.path,
        fishName: selectedFishName,
      });
    }
  };

  // 이미지 경로 처리 수정
  const handlePhotoTaken = async (newPhoto: PhotoFile) => {
    try {
      setPhoto(newPhoto);

      // 네이티브 모듈이 스스로 접두사를 처리하므로 원본 경로 사용
      const result = await classifyFishImage(newPhoto.path);

      if (Array.isArray(result) && result.length > 0) {
        // 결과 처리 및 UI 업데이트
        const processedResults = result.map((item) => ({
          fishName: item.className,
          probability: item.score * 100,
          character: "물고기 특성", // 임시 데이터
          fishImg: "https://via.placeholder.com/150", // 임시 이미지
        }));
        console.log("되나요?", processedResults);
        setDetectedResults(result);
        if (result.length > 0) {
          setDetectedClassName(result[0].className);
          setDetectedScore(result[0].score);
          openBottomSheet(); // 결과가 있을 경우 바텀시트 열기
        }
      } else {
        console.log("🕳️ 탐지 실패");
      }
    } catch (e: unknown) {
      console.log("❌ 사진 처리 중 오류 발생", e);
    }
  };

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
            detectedClassName={detectedClassName}
            probability={detectedScore}
          /> */}
          {detectedResults.length > 0 ? (
            detectedResults.map((item, index) => (
              <View
                key={`${item.className}_${index}`}
                className={`p-4 rounded-xl ${
                  index === 0 ? "bg-blue-100" : "bg-neutral-100"
                }`}
              >
                <Text className="text-lg font-semibold">
                  {index + 1}. {item.className}
                </Text>
                <Text className="text-sm text-neutral-500">
                  신뢰도: {(item.score * 100).toFixed(2)}%
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-neutral-500">탐지 결과가 없습니다.</Text>
          )}
          <View className="flex-1 p-5" />
          <FullButton name="다음" disable={next} onPress={handleNext} />
        </View>
      </Modalize>
    </View>
  );
}
