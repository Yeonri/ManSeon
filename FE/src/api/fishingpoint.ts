import authClient from "./authClient";

// 전체 낚시 포인트 조회
export const getFishingPoints = async () => {
  const response = await authClient.get("/fishing_point/list/all");
  console.log(response.data);
  return response.data;
};

// 낚시 포인트 상세 조회
export const getFishingPointDetail = async (pointId: number) => {
  const response = await authClient.get(
    `/fishing_point/list/detail?point_id=${pointId}`
  );
  console.log(response.data);
  return response.data;
};

// 낚시 포인트 검색 결과
export const searchFishingPoints = async (keyword: string) => {
  const response = await authClient.get(
    `/fishing_point/search?point_name=${keyword}`
  );
  console.log("검색결과", response.data);
  return response.data;
};

// 추천 포인트 받아오기
export const getRecommendPoints = async () => {
  const response = await authClient.get("주소");
  return response.data;
};
