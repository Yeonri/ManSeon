import { handleError } from "../utils/handleError";
import authClient from "./authClient";

// 잡은 물고기 기록
export async function addRecord(
  fishName: string,
  lat: number,
  lng: number,
  size: number,
  bait: string,
  equipment: string,
  fishImg: any
) {
  try {
    console.log("addRecord 호출됨", {
      fishName,
      lat,
      lng,
      size,
      bait,
      equipment,
      fishImg,
    });
    const formData = new FormData();

    const data = {
      fishName,
      lat,
      lng,
      size,
      bait,
      equipment,
    };
    formData.append("data", JSON.stringify(data));

    if (fishImg) {
      const fileName = fishImg.split("/").pop() ?? "image.jpg";
      const extMatch = /\.(\w+)$/.exec(fileName);
      const fileType = extMatch ? extMatch[1].toLowerCase() : "jpg";

      console.log("첨부 이미지 있음", fileName);

      const imageResponse = await fetch(fishImg);
      const imageBlob = await imageResponse.blob();

      const blobWithMeta = imageBlob as Blob & { name?: string; type?: string };
      blobWithMeta.name = fileName;
      blobWithMeta.type = `image/${fileType}`;

      formData.append("image", blobWithMeta as any);

      console.log("formData에 이미지 blob 추가 완료");
    }

    const response = await authClient.post(`/fishes`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      transformRequest: (formData) => formData,
    });

    console.log("서버 응답 받음", response.data);
    return response.data;
  } catch (e: unknown) {
    console.log("addRecord 에러 발생", e);
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
