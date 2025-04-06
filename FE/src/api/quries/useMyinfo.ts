import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../user";

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
