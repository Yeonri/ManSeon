import ImageEditor from "@react-native-community/image-editor";
import { Image as RNImage } from "react-native";
import ImageResizer from "react-native-image-resizer";

export async function ResizeImage(imageUri: string) {
  const originalSize = await new Promise<{ width: number; height: number }>(
    (resolve, reject) => {
      RNImage.getSize(
        imageUri,
        (width, height) => resolve({ width, height }),
        reject
      );
    }
  );

  const { width: originalWidth, height: originalHeight } = originalSize;
  const ratio = originalWidth / originalHeight;

  let targetWidth = 640;
  let targetHeight = 640;

  if (originalWidth < originalHeight) {
    targetWidth = 640;
    targetHeight = Math.round(640 / ratio);
  } else {
    targetHeight = 640;
    targetWidth = Math.round(640 / ratio);
  }

  const resized = await ImageResizer.createResizedImage(
    imageUri,
    targetWidth,
    targetHeight,
    "JPEG",
    100,
    0
  );

  const { uri, width, height } = resized;

  const offsetX = Math.max(0, Math.floor((width - 640) / 2));
  const offsetY = Math.max(0, Math.floor((height - 640) / 2));

  const cropData = {
    offset: { x: offsetX, y: offsetY },
    size: { width: 640, height: 640 },
    displaySize: { width: 640, height: 640 },
    resizeMode: "contain" as const,
  };

  const croppedUri = await ImageEditor.cropImage(uri, cropData);

  return croppedUri;
}
