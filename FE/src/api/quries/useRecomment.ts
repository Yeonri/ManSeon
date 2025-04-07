import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecomment, deleteRecomment, editRecomment } from "../recomment";

// 답글 작성
export function useAddRecomment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
      content,
    }: {
      postId: number;
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
      recommentId,
      content,
    }: {
      recommentId: number;
      content: string;
    }) => editRecomment(recommentId, content),
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
