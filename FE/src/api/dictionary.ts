import authClient from "./client/authClient";

// 도감 전체 조회
export async function getDictionary() {
  try {
    const response = await authClient.get(`/dictionaries`);
    console.log("도감 전체 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("도감 전체 조회 실패: ", error);
    return null;
  }
}

// 도감 상세 조회
export async function getDictionaryDetail(fishId: number) {
  try {
    const response = await authClient.get(`/dictionaries/${fishId}`);
    console.log("도감 상세 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("도감 상세 조회 실패: ", error);
    return null;
  }
}
