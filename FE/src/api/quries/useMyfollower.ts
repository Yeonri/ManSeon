import { useQuery } from "@tanstack/react-query";
import authClient from "../client/authClient";

export const useMyFollower = () => {
  return useQuery({
    queryKey: ["myFollower"],
    queryFn: async () => {
      const res = await authClient.get("/follow/following/my");
      return res.data;
    },
  });
};
