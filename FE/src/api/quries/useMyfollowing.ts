import { useQuery } from "@tanstack/react-query";
import authClient from "../client/authClient";

export const useMyFollowing = () => {
  return useQuery({
    queryKey: ["myFollowing"],
    queryFn: async () => {
      const res = await authClient.get("/follow/following/my");
      return res.data;
    },
  });
};
