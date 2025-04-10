import { handleError } from "../utils/handleError";
import authClient from "./authClient";

// 잡은 물고기 기록
export async function addRecord(
  fishType: string,
  fishImg: string,
  latitude: string,
  longitude: string,
  scale: string,
  bait: 0 | 1 | 2 | 3,
  method: 0 | 1 | 2
) {
  try {
    const response = await authClient.post(`물고기 post url`, {
      fishType,
      fishImg,
      latitude,
      longitude,
      scale,
      bait,
      method,
    });
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 잡은 물고기 가져오기
export async function getRecords() {
  try {
    const response = await authClient.get(`물고기 가져오기`);
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 잡은 물고기 상세 가져오기
export async function getRecordDetail() {
  try {
    const response = await authClient.get(`물고기 디테일 가져오기`);
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}
