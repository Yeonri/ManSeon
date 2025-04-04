import { Image } from "react-native";
import ImageResizer from "react-native-image-resizer";

// 이미지 전처리(사진 크기를 640*640으로 변경 (비율 유지))
export async function preprocessImage(
  imageUri: string,
  targetSize: number = 640
) {
  try {
    const resizedImage = await ImageResizer.createResizedImage(
      imageUri,
      targetSize,
      targetSize,
      "JPEG",
      80,
      0,
      undefined,
      false,
      { mode: "contain", onlyScaleDown: false }
    );

    return resizedImage.uri;
  } catch (e: unknown) {
    console.log("이미지 전처리 오류", e);
    if (e instanceof Error) throw new Error(e.message);
    else throw new Error("unknown Error");
  }
}

// 이미지 정사각형으로 반환
export async function PadImageToSquare(
  imageUri: string,
  targetSize: number = 640
) {
  try {
    function getImageSize(): Promise<{ width: number; height: number }> {
      return new Promise((resolve, reject) => {
        Image.getSize(
          imageUri,
          (width, height) => resolve({ width, height }),
          (error) => reject(error)
        );
      });
    }
    const { width, height } = await getImageSize();

    if (width === height) {
      return await preprocessImage(imageUri, targetSize);
    }

    const resizedImage = await ImageResizer.createResizedImage(
      imageUri,
      targetSize,
      targetSize,
      "JPEG",
      80,
      0,
      undefined,
      false,
      { mode: "contain", onlyScaleDown: false }
    );

    return resizedImage.uri;
  } catch (e: unknown) {
    console.log("이미지 패딩 오류", e);
    if (e instanceof Error) throw new Error(e.message);
    else throw new Error("unknown Error");
  }
}

// 텐서에 맞도록 이미지 변환
export async function imageToTensor(
  imageUri: string,
  targetSize: number = 640
) {
  try {
    const squareImageUri = await PadImageToSquare(imageUri, targetSize);

    return { processedUri: squareImageUri };
  } catch (e: unknown) {
    console.log("텐서 변환 오류");
    if (e instanceof Error) throw new Error(e.message);
    else throw new Error("unknown Error");
  }
}
