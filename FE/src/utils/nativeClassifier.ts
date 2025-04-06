import { NativeModules } from "react-native";

const { ImageClassifier } = NativeModules;

export async function classifyFishImage(imagePath: string) {
  try {
    return await ImageClassifier.classifyImage(imagePath);
  } catch (error) {
    console.error("Fish classification error:", error);
    throw error;
  }
}
