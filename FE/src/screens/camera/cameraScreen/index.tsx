import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import usePermission from "../../../hooks/usePermission";
import { useRef, useState } from "react";
import { PhotoFile } from "react-native-vision-camera";
import { Modalize } from "react-native-modalize";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/types";
import translateFishName from "../../../utils/translateFishName";
import PermissionCheck from "../../../components/common/permissionCheck";
import { ChevronRight, X } from "lucide-react-native";
import CameraView from "../../../components/camera/cameraView";
import { getFishImage } from "../../../utils/getImages";
import CustomButton from "../../../components/common/customButton";

interface DetectionResult {
  className: string;
  score: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function CameraScreen() {
  const hasCameraPermission = usePermission("카메라", "vision-camera");
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
  // const [detectedResults, setDetectedResults] = useState<DetectionResult[]>([]);
  const { width, height } = useWindowDimensions();
  const imageWidth = width * 0.25;
  const imageHeight = height * 0.1;

  const openBottomSheet = () => sheetRef.current?.open();

  // 임시 데이터
  const detectedResults = [
    {
      className: "mackerel",
      score: 0.92,
      x: 100,
      y: 200,
      width: 150,
      height: 100,
    },
    {
      className: "filefish",
      score: 0.87,
      x: 300,
      y: 100,
      width: 160,
      height: 110,
    },
    {
      className: "cod",
      score: 0.51,
      x: 300,
      y: 100,
      width: 160,
      height: 110,
    },
    {
      className: "korean_rockfish",
      score: 0.28,
      x: 300,
      y: 100,
      width: 160,
      height: 110,
    },
  ];

  function handleNext() {
    if (photo?.path && selectedFishName) {
      navigation.navigate("AddRecord", {
        photoUri: photo.path,
        fishName: translateFishName(selectedFishName),
      });
    }
  }

  // 이미지 경로 처리 개선
  async function handlePhotoTaken(newPhoto: PhotoFile) {
    setPhoto(newPhoto);

    // [임시] 하단의 로직으로 대체 예정
    openBottomSheet();

    // setTimeout(async () => {
    //   try {
    //     // 로딩 상태 표시
    //     setIsLoading(true);

    //     // 네이티브 모듈 호출
    //     const detectionResults = await classifyFishImage(newPhoto.path);

    //     // 로딩 상태 해제
    //     setIsLoading(false);

    //     if (Array.isArray(detectionResults) && detectionResults.length > 0) {
    //       // 결과 처리 및 UI 업데이트
    //       console.log(`탐지 성공: ${detectionResults.length}개 객체`);
    //       console.log(detectionResults);

    //       // 물고기 필터링(동일한 className의 물고기는 가장 신뢰도가 높은 것만 남김)
    //       const filteredResults = new Map<string, DetectionResult>();
    //       detectionResults.forEach((result) => {
    //         const existing = filteredResults.get(result.className);
    //         if (!existing || result.score > existing.score) {
    //           filteredResults.set(result.className, result);
    //         }
    //       });

    //       const uniqueResults = Array.from(filteredResults.values()).sort(
    //         (a, b) => b.score - a.score
    //       );

    //       // 탐지 결과 저장
    //       setDetectedResults(uniqueResults);

    //       // 가장 높은 신뢰도의 결과를 기본 선택으로 설정
    //       const topResult = detectionResults[0];
    //       setDetectedClassName(topResult.className);
    //       setDetectedScore(topResult.score);

    //       // 사용자가 선택할 수 있도록 다음 버튼 활성화
    //       setNext(false);

    //       // 기본 선택된 물고기 이름 설정
    //       setSelectedFishName(topResult.className);

    //       // 결과가 있을 경우 바텀시트 열기
    //       openBottomSheet();
    //     } else {
    //       console.log("탐지된 객체 없음");
    //       // 사용자에게 알림 표시
    //       Alert.alert(
    //         "객체 감지 실패",
    //         "이미지에서 인식 가능한 물고기를 찾지 못했습니다. 다른 각도나 조명에서 다시 시도해보세요.",
    //         [{ text: "확인", onPress: () => setPhoto(null) }]
    //       );
    //     }
    //   } catch (error: unknown) {
    //     setIsLoading(false);
    //     console.error("사진 처리 중 오류 발생", error);

    //     // 오류 메시지 표시
    //     Alert.alert(
    //       "처리 오류",
    //       "이미지 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
    //       [{ text: "확인", onPress: () => setPhoto(null) }]
    //     );
    //   }
    // });
  }

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
              // setDetectedResults([]);
              setSelectedFishName(null);
              setNext(true);
            }}
            className="absolute top-8 left-5 z-10"
          >
            <X color="white" size={35} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openBottomSheet}
            className="absolute top-8 right-5 z-10"
          >
            <ChevronRight color="white" size={35} />
          </TouchableOpacity>

          <Image
            source={{ uri: "file://" + photo.path }}
            className="flex-1 resize-contain"
          />

          {isLoading && (
            <View className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className="text-white mt-2">물고기 분석 중...</Text>
            </View>
          )}
        </View>
      ) : (
        <CameraView onPhotoTaken={handlePhotoTaken} />
      )}

      <Modalize ref={sheetRef} modalHeight={height * 0.4}>
        <ScrollView>
          <View className="m-5">
            {/* {isLoading ? (
              <View className="items-center justify-center py-10">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="text-center mt-2">이미지 분석 중...</Text>
              </View>
            ) : detectedResults.length > 0 ? ( */}
            <View className="gap-3">
              <Text className="mb-3 text-neutral-800 text-lg font-semibold text-center">
                검색 결과
              </Text>

              <FlatList
                data={detectedResults}
                keyExtractor={(item, index) => `${item.className}_${index}`}
                horizontal
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedFishName(item.className);
                      setNext(false);
                    }}
                    className={`px-6 py-5 rounded-2xl items-center ${
                      selectedFishName === item.className
                        ? "bg-blue-100"
                        : "bg-neutral-100"
                    } ${index !== detectedResults.length - 1 ? "mr-3" : ""}`}
                  >
                    <View className="flex-row items-center gap-5">
                      <Image
                        source={getFishImage(item.className)}
                        style={{
                          width: imageWidth,
                          height: imageHeight,
                          resizeMode: "contain",
                        }}
                      />
                      <View>
                        <Text className="text-neutral-800 text-2xl font-extrabold">
                          {translateFishName(item.className)}
                        </Text>
                        <Text
                          className={`text-2xl font-extrabold ${
                            selectedFishName === item.className
                              ? "text-blue-500"
                              : "text-neutral-400"
                          }`}
                        >
                          {(item.score * 100).toFixed(1)}%
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            {/* ) : (
               <Text className="text-neutral-500 text-center py-4">
                 탐지 결과가 없습니다. 다른 사진을 시도해보세요.
               </Text>
             )} */}

            <View className="flex-1 p-3" />
            <CustomButton
              title="다음"
              fill={true}
              full={true}
              disable={!selectedFishName || detectedResults.length === 0}
              onPress={handleNext}
            />
          </View>
        </ScrollView>
      </Modalize>
    </View>
  );
}
