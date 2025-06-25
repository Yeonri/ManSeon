import authClient from "./authClient";
import { ApiResponse } from "./types/ApiResponse";
import { User } from "./types/User";

// 다른 유저의 정보 불러오기
export const fetchUserById = async (userId: number) => {
  const response = await authClient.get(`/users/${userId}`, {
    params: { userId },
  });
  return response.data;
};

// 로그인한 유저 정보 가져오기
export async function getMyInfo(): Promise<User> {
  const response = await authClient.get<ApiResponse<User>>("/users");
  console.log("로그인한 유저 정보", response);
  return response.data.data;
}
