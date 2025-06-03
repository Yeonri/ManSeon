import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRecord, getRecordDetail, getRecords } from "../record";

// 잡은 물고기 등록
export function useAddRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      fishName,
      lat,
      lng,
      size,
      bait,
      equipment,
      fishImg,
    }: {
      fishName: string;
      lat: number;
      lng: number;
      size: number;
      bait: string;
      equipment: string;
      fishImg: any;
    }) => addRecord(fishName, lat, lng, size, bait, equipment, fishImg),
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
