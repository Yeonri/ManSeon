import { useQuery } from "@tanstack/react-query";
import { getDictionary, getDictionaryDetail } from "../dictionary";

// 도감 전체 조회
export function useGetDictionary() {
  return useQuery({
    queryKey: ["dictionary"],
    queryFn: getDictionary,
  });
}

// 도감 상세 조회
export function useGetDictionaryDetail(fishId: number) {
  return useQuery({
    queryKey: ["dictionaryDetail", fishId],
    queryFn: () => getDictionaryDetail(fishId),
  });
}
