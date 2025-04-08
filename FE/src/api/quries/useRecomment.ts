import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecomment, deleteRecomment, editRecomment } from "../recomment";

// 답글 작성
export function useAddRecomment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      PostId,
      commentId,
      content,
    }: {
      PostId: number;
      commentId: number;
      content: string;
    }) => addRecomment(PostId, commentId, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
}

// 답글 수정
export function useEditRecomment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
      recommentId,
      content,
    }: {
      postId: number;
      commentId: number;
      recommentId: number;
      content: string;
    }) => editRecomment(postId, commentId, recommentId, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
}

// 답글 삭제
export function useDeleteRecomment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recommentId: number) => deleteRecomment(recommentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
}
