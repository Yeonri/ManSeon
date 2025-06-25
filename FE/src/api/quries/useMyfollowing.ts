import { useQuery } from "@tanstack/react-query";
import authClient from "../authClient";

export const useMyFollowing = () => {
  return useQuery({
    queryKey: ["myFollowing"],
    queryFn: async () => {
      const res = await authClient.get("/follow/following/my");
      return res.data;
    },
  });
};
