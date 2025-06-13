import authClient from "./client/authClient";

// 낚시 기록 전체 조회
export async function getFishingRecords() {
  try {
    const response = await authClient.get(`/fishing-records`);
    console.log("낚시 기록 전체 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("낚시 기록 전체 조회 실패: ", error);
    return null;
  }
}

// 낚시 기록 상세 조회
export async function getFishingRecordDetail(recordId: number) {
  try {
    const response = await authClient.get(`/fishing-records/${recordId}`);
    console.log("낚시 기록 상세 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("낚시 기록 상세 조회 실패: ", error);
    return null;
  }
}

// 낚시 기록 추가
export async function addFishingRecord(
  fishName: string,
  fishImage: string,
  time: string,
  lng: string,
  lat: string,
  status: boolean,
  size: number,
  bait: string,
  equipment: string
) {
  try {
    const response = await authClient.post(`/fishing-records`, {
      fishName,
      fishImage,
      time,
      lng,
      lat,
      status,
      size,
      bait,
      equipment,
    });
    console.log("낚시 기록 추가 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("낚시 기록 추가 실패: ", error);
    return null;
  }
}

// 낚시 기록 삭제
export async function deleteFishingRecord(recordId: number) {
  try {
    const response = await authClient.delete(`/fishing-records/${recordId}`);
    console.log("낚시 기록 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("낚시 기록 삭제 실패: ", error);
    return null;
  }
}
