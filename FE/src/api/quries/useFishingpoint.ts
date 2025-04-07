import { useQuery } from "@tanstack/react-query";
import { getFishingPoints } from "../../api/fishingpoint";

export const useFishingPoints = () => {
  return useQuery({
    queryKey: ["fishingPoints"],
    queryFn: getFishingPoints,
  });
};
