import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../api/types/post";
import authClient from "../authClient";

export async function fetchMyPosts(): Promise<Post[]> {
  const res = await authClient.get("/board/list/my");
  return res.data;
}

export function useMyPosts() {
  return useQuery<Post[]>({
    queryKey: ["myPosts"],
    queryFn: fetchMyPosts,
  });
}
