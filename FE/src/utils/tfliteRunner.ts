import { loadTensorflowModel } from "react-native-fast-tflite";

let model: any = null;

// 모델 초기화
export async function loadModel() {
  if (!model) {
    model = await loadTensorflowModel(
      require("../assets/models/best_float16.tflite")
    );
    console.log("모델 로딩 성공");
  }
  return model;
}

// 이미지 예측 실행
export async function runModelOnImage(imageUri: string): Promise<any> {
  if (!model) {
    throw new Error("모델이 로딩되지 않았습니다.");
  }

  const results = await model.predict(imageUri.replace("file://", ""));
  console.log("📊 추론 결과:", results);
  return results;
}
