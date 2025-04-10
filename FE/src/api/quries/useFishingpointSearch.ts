import { useQuery } from "@tanstack/react-query";
import { searchFishingPoints } from "../../api/fishingpoint";

export const useFishingPointsSearch = (keyword: string) => {
  return useQuery({
    queryKey: ["fishingPointsSearch", keyword],
    queryFn: () => searchFishingPoints(keyword),
  });
};
