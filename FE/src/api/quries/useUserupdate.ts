import authClient from "../authClient";

export async function updateUserInfo(data: {
  email?: string;
  name?: string;
  phone_number?: string;
  nickname?: string;
  password?: string;
  profile_img?: string;
}) {
  console.log("보내는 데이터: ", data);
  const response = await authClient.patch("/users", data);
  console.log("응답 데이터: ", response.data);
  return response.data;
}
