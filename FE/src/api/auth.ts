import client from "./client";
import { Auth } from "./types/Auth";
import { MessageResponse } from "./types/MessageResponse";
import { Signup } from "./types/Signup";

// 회원가입
export async function signup(data: Signup): Promise<MessageResponse> {
  const response = await client.post<MessageResponse>("/users", data);
  return response.data;
}

// 닉네임 설정
export async function uploadNickname(email: string, nickname: string) {
  const response = await client.post("/users/nickname/set", {
    email,
    nickname,
  });
  return response.data;
}

// 로그인
export async function login(email: string, password: string): Promise<Auth> {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const response = await client.post("/users/login", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

// 이메일 중복 여부 확인 (true여야 가입 가능)
export async function checkEmail(email: string) {
  const response = await client.get(`/users/verify/email?email=${email}`);
  return response.data;
}

// 핸드폰 중복 여부 확인 (true여야 가입 가능)
export async function checkPhoneNum(phoneNum: string) {
  const response = await client.get(
    `/users/verify/phone_num?phone_num=${phoneNum}`
  );
  return response.data;
}
