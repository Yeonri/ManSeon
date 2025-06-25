import { useQuery } from "@tanstack/react-query";
import { getRecommendPoints } from "../../api/fishingpoint";

export const useFishingPoints = () => {
  return useQuery({
    queryKey: ["recommendPoints"],
    queryFn: getRecommendPoints,
  });
};
