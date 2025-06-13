import { useQuery } from "@tanstack/react-query";
import {
  addNotice,
  deleteNotice,
  editNotice,
  getNotice,
  getNoticeDetail,
} from "../notice";
import { useApiMutation } from "../../hooks/useApiMutation";

// 공지사항 전체 조회
export function useGetNotice() {
  return useQuery({
    queryKey: ["notice"],
    queryFn: getNotice,
  });
}

// 공지사항 상세 조회
export function useGetNoticeDetail(noticeId: number) {
  return useQuery({
    queryKey: ["noticeDetail", noticeId],
    queryFn: () => getNoticeDetail(noticeId),
  });
}

// [관리자] 공지사항 추가
export function useAddNotice() {
  useApiMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      addNotice(title, content),
    keysToInvalidate: [["notice"]],
    successMessage: "공지사항이 성공적으로 등록되었습니다.",
    errorMessage: "공지사항 등록 실패",
  });
}

// [관리자] 공지사항 변경
export function useEditNotice() {
  useApiMutation({
    mutationFn: ({
      noticeId,
      title,
      content,
    }: {
      noticeId: number;
      title: string;
      content: string;
    }) => editNotice(noticeId, title, content),
    keysToInvalidate: [["notice"]],
    successMessage: "공지사항이 성공적으로 변경되었습니다.",
    errorMessage: "공지사항 변경 실패",
  });
}

// [관리자] 공지사항 삭제
export function useDeleteNotice() {
  useApiMutation({
    mutationFn: (noticeId: number) => deleteNotice(noticeId),
    keysToInvalidate: [["notice"]],
    successMessage: "공지사항이 성공적으로 삭제되었습니다.",
    errorMessage: "공지사항 삭제 실패",
  });
}
