import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addComment,
  deleteComment,
  editComment,
  getComments,
} from "../comment";

// 댓글 가져오기
export function useGetComments(boardId: number) {
  return useQuery({
    queryKey: ["comments", boardId],
    queryFn: () => getComments(boardId),
    staleTime: 1000,
    refetchOnMount: true,
  });
}

// 댓글 작성
export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      content,
      parentId,
    }: {
      boardId: number;
      content: string;
      parentId: number | null;
    }) => addComment(boardId, content, parentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });
}

// 댓글 수정
export function useEditComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      commentId,
      content,
    }: {
      boardId: number;
      commentId: number;
      content: string;
    }) => editComment(boardId, commentId, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });
}
// 댓글 삭제
export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      commentId,
    }: {
      boardId: number;
      commentId: number;
    }) => deleteComment(boardId, commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });
}
