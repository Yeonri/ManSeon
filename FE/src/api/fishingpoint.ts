import authClient from "./authClient";

export const getFishingPoints = async () => {
  const response = await authClient.get("/fishing_point/list/all");
  console.log(response.data);
  return response.data;
};
