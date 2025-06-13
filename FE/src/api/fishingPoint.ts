import authClient from "./client/authClient";

// 낚시 포인트 전체 조회
export async function getFishingPoints() {
  try {
    const response = await authClient.get(`/fishing-points`);
    console.log("낚시 포인트 전체 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("낚시 포인트 전체 조회 실패: ", error);
    return null;
  }
}

// 낚시 포인트 상세 조회
export async function getFishingPointDetail(fishingPointId: number) {
  try {
    const response = await authClient.get(`/fishing-points/${fishingPointId}`);
    console.log("낚시 포인트 상세 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("낚시 포인트 상세 조회 실패: ", error);
    return null;
  }
}

// 낚시 포인트 검색 결과 조회
export async function getFishingPointSearch(keyword: string) {
  try {
    const response = await authClient.get(`/fishing-points?${keyword}`);
    console.log("낚시 포인트 검색 결과 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("낚시 포인트 검색 결과 조회 실패: ", error);
    return null;
  }
}

// 추천 포인트 조회
export async function getFishingPointRecommend() {
  try {
    const response = await authClient.get(`/users/me/fishing-point`);
    console.log("추천 포인트 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("추천 포인트 조회 실패: ", error);
    return null;
  }
}

// 내가 잡은 물고기 조회
export async function getMyFishes() {
  try {
    const response = await authClient.get(`/users/me/fishing-species`);
    console.log("내가 잡은 물고기 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("내가 잡은 물고기 조회 실패: ", error);
    return null;
  }
}
