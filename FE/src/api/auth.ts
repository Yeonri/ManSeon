import client from "./client";
import { MessageResponse } from "./types/MessageResponse";
import { User } from "./types/User";

export async function signup(data: User): Promise<MessageResponse> {
  const response = await client.post<MessageResponse>("/users", data);
  return response.data;
}
