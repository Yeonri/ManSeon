import client from "./client";
import { Auth } from "./types/Auth";
import { MessageResponse } from "./types/MessageResponse";
import { User } from "./types/User";

// 회원가입
export async function signup(data: User): Promise<MessageResponse> {
  const response = await client.post<MessageResponse>("/users", data);
  return response.data;
}

// 로그인
export async function login(email: string, password: string): Promise<Auth> {
  const response = await client.post<Auth>("/users/login", { email, password });
  return response.data;
}
