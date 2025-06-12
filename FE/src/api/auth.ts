import authClient from "./client/authClient";
import client from "./client/client";

// 자체 회원가입
export async function signup(
  email: string,
  password: string,
  nickname: string
) {
  try {
    const response = await client.post(``, {
      email,
      password,
      nickname,
    });
    console.log("자체 회원가입 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("자체 회원가입 실패: ", error);
    return null;
  }
}

// 카카오 로그인
export async function kakaologin(accessToken: string) {
  try {
    const response = await client.post(``, { accessToken });
    console.log("카카오 로그인 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("카카오 로그인 실패: ", error);
    return null;
  }
}

// 회원 탈퇴
export async function withdrawal() {
  try {
    const response = await authClient.delete(``);
    console.log("회원 탈퇴 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("회원 탈퇴 실패: ", error);
    return null;
  }
}

// 이메일 중복 확인
export async function checkEmailDuplication(email: string) {
  try {
    const response = await client.post(``, { email });
    console.log("이메일 중복 확인 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("이메일 중복 확인 실패: ", error);
    return null;
  }
}

// 닉네임 중복 확인
export async function checkNicknameDuplication(nickname: string) {
  try {
    const response = await client.post(``, { nickname });
    console.log("닉네임 중복 확인 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("닉네임 중복 확인 실패: ", error);
    return null;
  }
}

// 로그인
export async function login(email: string, password: string) {
  try {
    const response = await client.post(``, { email, password });
    console.log("로그인 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("로그인 실패: ", error);
    return null;
  }
}

// 프로필 이미지 변경
export async function changeProfileImage(profileImage: string) {
  try {
    const response = await authClient.patch(`/users/me/profile-Img`, {
      profileImage,
    });
    console.log("프로필 이미지 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("프로필 이미지 변경 실패: ", error);
    return null;
  }
}

// 닉네임 변경
export async function changeNickname(nickname: string) {
  try {
    const response = await client.patch(``, { nickname });
    console.log("닉네임 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("닉네임 변경 실패: ", error);
    return null;
  }
}

// 핸드폰 번호 변경
export async function changePhoneNumber(phoneNumber: string) {
  try {
    const response = await authClient.patch(`/users/me/phone`, { phoneNumber });
    console.log("핸드폰 번호 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("핸드폰 번호 변경 실패: ", error);
    return null;
  }
}

// 비밀번호 변경
export async function changePassword(password: string) {
  try {
    const response = await authClient.patch(`/users/me/password`, { password });
    console.log("비밀번호 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("비밀번호 변경 실패: ", error);
    return null;
  }
}

// 내 정보 조회
export async function getMyInformtaion() {
  try {
    const response = await authClient.get(`/users/me`);
    console.log("내 정보 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("내 정보 조회 실패: ", error);
    return null;
  }
}

// 다른 유저 정보 조회
export async function getOtherInformtaion(userId: number) {
  try {
    const response = await authClient.get(`/users/${userId}`);
    console.log("다른 유저 정보 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("다른 유저 정보 조회 실패: ", error);
    return null;
  }
}
