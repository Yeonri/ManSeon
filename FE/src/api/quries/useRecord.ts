import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRecord, getRecordDetail, getRecords } from "../record";

// 잡은 물고기 기록
export function useAddRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      fishType,
      fishImg,
      latitude,
      longitude,
      scale,
      bait,
      method,
    }: {
      fishType: string;
      fishImg: string;
      latitude: string;
      longitude: string;
      scale: string;
      bait: 0 | 1 | 2 | 3;
      method: 0 | 1 | 2;
    }) =>
      addRecord(fishType, fishImg, latitude, longitude, scale, bait, method),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["records"] }),
  });
}

// 잡은 물고기 가져오기
export function useGetRecords() {
  return useQuery({
    queryKey: ["records"],
    queryFn: () => getRecords(),
    refetchOnMount: true,
  });
}

// 잡은 물고기 상세 가져오기
export function useGetRecordDetail() {
  return useQuery({
    queryKey: ["record"],
    queryFn: () => getRecordDetail(),
    refetchOnMount: true,
  });
}
