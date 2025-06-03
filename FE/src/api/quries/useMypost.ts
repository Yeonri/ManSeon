import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../api/types/post";
import { getMyPosts } from "../post";

export function useMyPosts() {
  return useQuery<Post[]>({
    queryKey: ["myPosts"],
    queryFn: getMyPosts,
  });
}
