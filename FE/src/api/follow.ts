import authClient from "./client/authClient";

// 내 팔로잉 전체 조회
export async function getMyFollowings() {
  try {
    const response = await authClient.get(`/users/me/followings`);
    console.log("내 팔로잉 전체 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("내 팔로잉 전체 조회 실패: ", error);
    return null;
  }
}

// 내 팔로워 전체 조회
export async function getMyFollowers() {
  try {
    const response = await authClient.get(`/users/me/followers`);
    console.log("내 팔로워 전체 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("내 팔로워 전체 조회 실패: ", error);
    return null;
  }
}

// 다른 유저 팔로잉 전체 조회
export async function getOtherFollowings(userId: string) {
  try {
    const response = await authClient.get(`/users/${userId}/followings`);
    console.log("다른 유저 팔로잉 전체 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("다른 유저 팔로잉 전체 조회 실패: ", error);
    return null;
  }
}

// 다른 유저 팔로워 전체 조회
export async function getOtherFollowers(userId: string) {
  try {
    const response = await authClient.get(`/users/${userId}/followers`);
    console.log("다른 유저 팔로워 전체 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("다른 유저 팔로워 전체 조회 실패: ", error);
    return null;
  }
}

// 팔로잉 추가
export async function addFollowing(userId: string) {
  try {
    const response = await authClient.post(`/users/${userId}/followings`);
    console.log("팔로잉 추가 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("팔로잉 추가 실패: ", error);
    return null;
  }
}

// 팔로잉 삭제
export async function deleteFollowing(userId: string) {
  try {
    const response = await authClient.delete(`/users/${userId}/followings`);
    console.log("팔로잉 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("팔로잉 삭제 실패: ", error);
    return null;
  }
}
