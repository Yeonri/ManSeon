import { handleError } from "../utils/handleError";
import authClient from "./client/authClient";

// 팔로우
export async function followUser(userId: number) {
  try {
    const response = await authClient.post(`/follow/${userId}`);
    return response.data;
  } catch (e) {
    handleError(e);
  }
}

// 언팔로우
export async function unfollowUser(userId: number) {
  try {
    const response = await authClient.delete(`/follow/${userId}`);
    return response.data;
  } catch (e) {
    handleError(e);
  }
}

// 팔로우 목록 조회
export async function getMyFollowingList() {
  try {
    const response = await authClient.get("/follow/following/my");
    return response.data;
  } catch (e) {
    handleError(e);
  }
}

// 팔로워 목록 조회
export async function getMyFollowerList() {
  try {
    const response = await authClient.get("/follow/follower/my");
    return response.data;
  } catch (e) {
    handleError(e);
  }
}
