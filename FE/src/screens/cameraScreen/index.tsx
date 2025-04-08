import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight, X } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { PhotoFile } from "react-native-vision-camera";
import { RootStackParams } from "../../api/types/RootStackParams";
import { CameraView } from "../../components/cameraRecord/cameraView";
import { FullButton } from "../../components/common/fullButton";
import { PermissionCheck } from "../../components/common/permissionCheck";
import { useCameraPermission } from "../../hooks/useCameraPermission";
import {
  classifyFishImage,
  DetectionResult,
} from "../../utils/nativeClassifier";

export function CameraScreen() {
  const hasCameraPermission = useCameraPermission();
  const [photo, setPhoto] = useState<PhotoFile | null>(null);
  const [selectedFishName, setSelectedFishName] = useState<string | null>(null);
  const [next, setNext] = useState<boolean>(true);
  const [detectedClassName, setDetectedClassName] = useState<string | null>(
    null
  );
  const [detectedScore, setDetectedScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sheetRef = useRef<Modalize>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [detectedResults, setDetectedResults] = useState<DetectionResult[]>([]);

  const openBottomSheet = () => sheetRef.current?.open();
  const closeBottomSheet = () => sheetRef.current?.close();

  const handleNext = () => {
    if (photo?.path && selectedFishName) {
      navigation.navigate("Record", {
        photoUri: photo.path,
        fishName: selectedFishName,
      });
    }
  };

  // 이미지 경로 처리 개선
  const handlePhotoTaken = async (newPhoto: PhotoFile) => {
    try {
      setPhoto(newPhoto);

      // 로딩 상태 표시
      setIsLoading(true);

      // 네이티브 모듈 호출
      const detectionResults = await classifyFishImage(newPhoto.path);

      // 로딩 상태 해제
      setIsLoading(false);

      if (Array.isArray(detectionResults) && detectionResults.length > 0) {
        // 결과 처리 및 UI 업데이트
        console.log(`탐지 성공: ${detectionResults.length}개 객체`);
        console.log(detectionResults);

        // 탐지 결과 저장
        setDetectedResults(detectionResults);

        // 가장 높은 신뢰도의 결과를 기본 선택으로 설정
        const topResult = detectionResults[0];
        setDetectedClassName(topResult.className);
        setDetectedScore(topResult.score);

        // 사용자가 선택할 수 있도록 다음 버튼 활성화
        setNext(false);

        // 기본 선택된 물고기 이름 설정
        setSelectedFishName(topResult.className);

        // 결과가 있을 경우 바텀시트 열기
        openBottomSheet();
      } else {
        console.log("🕳️ 탐지된 객체 없음");
        // 사용자에게 알림 표시
        Alert.alert(
          "객체 감지 실패",
          "이미지에서 인식 가능한 물고기를 찾지 못했습니다. 다른 각도나 조명에서 다시 시도해보세요.",
          [{ text: "확인", onPress: () => setPhoto(null) }]
        );
      }
    } catch (e: unknown) {
      setIsLoading(false);
      console.error("❌ 사진 처리 중 오류 발생", e);

      // 오류 메시지 표시
      Alert.alert(
        "처리 오류",
        "이미지 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
        [{ text: "확인", onPress: () => setPhoto(null) }]
      );
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
            onPress={() => {
              setPhoto(null);
              setDetectedResults([]);
              setSelectedFishName(null);
              setNext(true);
            }}
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

          {isLoading && (
            <View className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text className="text-white mt-2">물고기 분석 중...</Text>
            </View>
          )}
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

          {isLoading ? (
            <View className="items-center justify-center py-10">
              <ActivityIndicator size="large" color="#0000ff" />
              <Text className="text-center mt-2">분석 중...</Text>
            </View>
          ) : detectedResults.length > 0 ? (
            <>
              <Text className="text-xl font-bold mb-4">탐지 결과</Text>
              {detectedResults.map((item, index) => (
                <TouchableOpacity
                  key={`${item.className}_${index}`}
                  onPress={() => {
                    setSelectedFishName(item.className);
                    setNext(false);
                  }}
                  className={`p-4 rounded-xl mb-2 ${
                    selectedFishName === item.className
                      ? "bg-blue-500 border-2 border-blue-700"
                      : index === 0
                        ? "bg-blue-100"
                        : "bg-neutral-100"
                  }`}
                >
                  <Text
                    className={`text-lg font-semibold ${
                      selectedFishName === item.className
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {index + 1}. {item.className}
                  </Text>
                  <Text
                    className={`text-sm ${
                      selectedFishName === item.className
                        ? "text-blue-100"
                        : "text-neutral-500"
                    }`}
                  >
                    신뢰도: {(item.score * 100).toFixed(1)}%
                  </Text>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <Text className="text-neutral-500 text-center py-4">
              탐지 결과가 없습니다. 다른 사진을 시도해보세요.
            </Text>
          )}

          <View className="flex-1 p-5" />
          <FullButton
            name="다음"
            disable={!selectedFishName || detectedResults.length === 0}
            onPress={handleNext}
          />
        </View>
      </Modalize>
    </View>
  );
}
