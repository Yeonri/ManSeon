import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../auth";

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
