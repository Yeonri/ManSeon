import { useQuery } from "@tanstack/react-query";
import {
  addComment,
  deleteComment,
  editComment,
  getComments,
} from "../comment";
import { useApiMutation } from "../../hooks/useApiMutation";

// 댓글 조회
export function useGetComments(boardId: number) {
  return useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(boardId),
  });
}

// 댓글 추가
export function useAddComment() {
  return useApiMutation({
    mutationFn: ({ boardId, content }: { boardId: number; content: string }) =>
      addComment(boardId, content),
    keysToInvalidate: [["comments"]],
    successMessage: "댓글이 성공적으로 등록되었습니다.",
    errorMessage: "댓글 등록 실패",
  });
}

// 댓글 변경
export function useEditComment() {
  return useApiMutation({
    mutationFn: ({
      boardId,
      commentId,
      content,
    }: {
      boardId: number;
      commentId: number;
      content: string;
    }) => editComment(boardId, commentId, content),
    keysToInvalidate: [["comments"]],
    successMessage: "댓글이 성공적으로 변경되었습니다.",
    errorMessage: "댓글 변경 실패",
  });
}

// 댓글 삭제
export function useDeleteComment() {
  return useApiMutation({
    mutationFn: ({
      boardId,
      commentId,
    }: {
      boardId: number;
      commentId: number;
    }) => deleteComment(boardId, commentId),
    keysToInvalidate: [["comments"]],
    successMessage: "댓글이 성공적으로 삭제되었습니다.",
    errorMessage: "댓글 삭제 실패",
  });
}
