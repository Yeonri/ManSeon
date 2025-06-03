import { handleError } from "../utils/handleError";
import authClient from "./authClient";

// 내 물고기 목록 가져오기
export async function getFishes() {
  try {
    const response = await authClient.get("/fishes/me");
    console.log("물고기 가져오기 확인", response.data);
    return response.data.data;
  } catch (e: unknown) {
    handleError(e);
  }
}
