import { useQuery } from "@tanstack/react-query";
import { useApiMutation } from "../../hooks/useApiMutation";
import {
  addFishingRecord,
  deleteFishingRecord,
  getFishingRecordDetail,
  getFishingRecords,
} from "../fishingRecord";

// 낚시 기록 전체 조회
export function useGetFishingRecords() {
  return useQuery({
    queryKey: ["fishingRecords"],
    queryFn: getFishingRecords,
  });
}

// 낚시 기록 상세 조회
export function useGetFishingRecordDetail(recordId: number) {
  return useQuery({
    queryKey: ["fishingRecord", recordId],
    queryFn: () => getFishingRecordDetail(recordId),
  });
}

// 낚시 기록 추가
export function useAddFishingRecord() {
  return useApiMutation({
    mutationFn: ({
      fishName,
      fishImage,
      time,
      lng,
      lat,
      status,
      size,
      bait,
      equipment,
    }: {
      fishName: string;
      fishImage: string;
      time: string;
      lng: string;
      lat: string;
      status: boolean;
      size: number;
      bait: string;
      equipment: string;
    }) =>
      addFishingRecord(
        fishName,
        fishImage,
        time,
        lng,
        lat,
        status,
        size,
        bait,
        equipment
      ),
    keysToInvalidate: [["fishingRecords"]],
    successMessage: "낚시 기록이 성공적으로 등록되었습니다.",
    errorMessage: "낚시 기록 등록 실패",
  });
}

// 낚시 기록 삭제
export function useDeleteFishingRecord() {
  return useApiMutation({
    mutationFn: (recordId: number) => deleteFishingRecord(recordId),
    keysToInvalidate: [["fishingRecords"]],
    successMessage: "낚시 기록이 성공적으로 삭제되었습니다.",
    errorMessage: "낚시 기록 삭제 실패",
  });
}
