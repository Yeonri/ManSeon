import { useQuery } from "@tanstack/react-query";
import {
  getFishingPointDetail,
  getFishingPointRecommend,
  getFishingPoints,
  getFishingPointSearch,
  getMyFishes,
} from "../fishingPoint";

// 낚시 포인트 전체 조회
export function useGetFishingPoints() {
  return useQuery({
    queryKey: ["fishingPoints"],
    queryFn: getFishingPoints,
  });
}

// 낚시 포인트 상세 조회
export function useGetFishingPointDetail(fishingPointId: number) {
  return useQuery({
    queryKey: ["fishingPointDetail", fishingPointId],
    queryFn: () => getFishingPointDetail(fishingPointId),
  });
}

// 낚시 포인트 검색 결과 조회
export function useGetFishingPointSearch(keyword: string) {
  return useQuery({
    queryKey: ["fishingPointSearch", keyword],
    queryFn: () => getFishingPointSearch(keyword),
  });
}

// 추천 포인트 조회
export function useGetFishingPointRecommend() {
  return useQuery({
    queryKey: ["fishingPointRecommend"],
    queryFn: getFishingPointRecommend,
  });
}

// 내가 잡은 물고기 조회
export function useGetMyFishes() {
  return useQuery({
    queryKey: ["myFishes"],
    queryFn: getMyFishes,
  });
}
