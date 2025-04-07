import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../user";

export function useGetMyInfo() {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    refetchOnMount: true,
  });
}
