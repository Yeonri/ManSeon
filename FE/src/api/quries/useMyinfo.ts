import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../auth";

export function useGetMyInfo() {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    refetchOnMount: true,
  });
}
