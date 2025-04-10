import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../api/types/post";
import { fetchMyPosts } from "../post";

export function useMyPosts() {
  return useQuery<Post[]>({
    queryKey: ["myPosts"],
    queryFn: fetchMyPosts,
  });
}
