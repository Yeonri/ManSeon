import authClient from "./authClient";

export const getFishingPoints = async () => {
  const response = await authClient.get("/fishing_point/list/all");
  console.log(response.data);
  return response.data;
};

export const getFishingPointDetail = async (pointId: number) => {
  const response = await authClient.get(
    `/fishing_point/list/detail?point_id=${pointId}`
  );
  console.log(response.data);
  return response.data;
};

export const searchFishingPoints = async (keyword: string) => {
  const response = await authClient.get(
    `/fishing_point/search?point_name=${keyword}`
  );
  console.log("검색결과", response.data);
  return response.data;
};
