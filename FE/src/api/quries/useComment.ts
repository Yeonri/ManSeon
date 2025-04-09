import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment, deleteComment, editComment } from "../comment";

// 댓글 작성
export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: { postId: number; content: string }) =>
      addComment(postId, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
}

// 댓글 수정
export function useEditComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => editComment(commentId, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
}
// 댓글 삭제
export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
}
