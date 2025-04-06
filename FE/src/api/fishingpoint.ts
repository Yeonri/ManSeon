import authClient from "./authClient";

export const getFishingPoints = async () => {
  const response = await authClient.get("/fishing_point/list/all");
  return response.data;
};
