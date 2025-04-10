import { useQuery } from "@tanstack/react-query";
import { getFishingPointDetail } from "../../api/fishingpoint";

export const useFishingPointDetail = (pointId: number) => {
  return useQuery({
    queryKey: ["fishingPointDetail", pointId],
    queryFn: () => getFishingPointDetail(pointId),
    enabled: !!pointId,
  });
};
