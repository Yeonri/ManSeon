import { NativeModules, Platform } from "react-native";

const { ImageClassifier } = NativeModules;

export interface DetectionResult {
  className: string;
  score: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 이미지 경로를 받아 객체 탐지 수행
 * @param imagePath 이미지 파일 경로 (file:// 접두사 포함 또는 미포함)
 * @returns 탐지된 객체 배열
 */
export async function classifyFishImage(
  imagePath: string
): Promise<DetectionResult[]> {
  try {
    // iOS와 Android의 경로 처리 방식 차이 대응
    const normalizedPath =
      Platform.OS === "ios"
        ? imagePath.startsWith("file://")
          ? imagePath
          : `file://${imagePath}`
        : imagePath;

    console.log(`객체 탐지 요청: ${normalizedPath}`);

    const results = await ImageClassifier.classifyImage(normalizedPath);

    // 결과 유효성 검사
    if (!Array.isArray(results)) {
      console.error("유효하지 않은 탐지 결과:", results);
      return [];
    }

    console.log(`탐지 완료: ${results.length}개 객체 발견`);
    return results;
  } catch (error) {
    console.error("객체 탐지 오류:", error);
    throw error;
  }
}
