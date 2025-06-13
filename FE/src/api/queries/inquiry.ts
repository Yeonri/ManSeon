import { useQuery } from "@tanstack/react-query";
import {
  addInquiry,
  addInquiryAnswer,
  deleteInquiry,
  deleteInquiryAnswer,
  editInquiry,
  editInquiryAnswer,
  getInquiry,
  getInquiryDetail,
} from "../inquiry";
import { useApiMutation } from "../../hooks/useApiMutation";

// 문의사항 전체 조회
export function useGetInquiry() {
  useQuery({
    queryKey: ["inquiry"],
    queryFn: getInquiry,
  });
}

// 문의사항 상세 조회
export function useGetInquiryDetail(inquiryId: number) {
  useQuery({
    queryKey: ["inquiryDetail", inquiryId],
    queryFn: () => getInquiryDetail(inquiryId),
  });
}

// [유저] 문의사항 추가
export function useAddInquiry() {
  useApiMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      addInquiry(title, content),
    keysToInvalidate: [["inquiry"]],
    successMessage: "문의사항이 성공적으로 등록되었습니다.",
    errorMessage: "문의사항 등록 실패",
  });
}

// [유저] 문의사항 변경
export function useEditInquiry() {
  useApiMutation({
    mutationFn: ({
      inquiryId,
      title,
      content,
    }: {
      inquiryId: number;
      title?: string;
      content?: string;
    }) => editInquiry(inquiryId, title, content),
    keysToInvalidate: [["inquiry"]],
    successMessage: "문의사항이 성공적으로 변경되었습니다.",
    errorMessage: "문의사항 변경 실패",
  });
}

// [유저] 문의사항 삭제
export function useDeleteInquiry() {
  useApiMutation({
    mutationFn: (inquiryId: number) => deleteInquiry(inquiryId),
    keysToInvalidate: [["inquiry"]],
    successMessage: "문의사항이 성공적으로 삭제되었습니다.",
    errorMessage: "문의사항 삭제 실패",
  });
}

// [관리자] 문의사항 답변 추가
export function useAddInquiryAnswer() {
  useApiMutation({
    mutationFn: ({
      inquiryId,
      title,
      content,
    }: {
      inquiryId: number;
      title: string;
      content: string;
    }) => addInquiryAnswer(inquiryId, title, content),
    keysToInvalidate: [["inquiry"]],
    successMessage: "문의사항 답변이 성공적으로 등록되었습니다.",
    errorMessage: "문의사항 답변 등록 실패",
  });
}

// [관리자] 문의사항 변경
export function useEditInquiryAnswer() {
  return useApiMutation({
    mutationFn: ({
      inquiryId,
      title,
      content,
    }: {
      inquiryId: number;
      title?: string;
      content?: string;
    }) => editInquiryAnswer(inquiryId, title, content),
    keysToInvalidate: [["inquiry"]],
    successMessage: "문의사항 답변이 성공적으로 변경되었습니다.",
    errorMessage: "문의사항 답변 변경 실패",
  });
}

// [관리자] 문의사항 삭제
export function useDeleteInquiryAnswer() {
  useApiMutation({
    mutationFn: (inquiryId: number) => deleteInquiryAnswer(inquiryId),
    keysToInvalidate: [["inquiry"]],
    successMessage: "문의사항 답변이 성공적으로 삭제되었습니다.",
    errorMessage: "문의사항 답변 삭제 실패",
  });
}
