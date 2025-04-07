import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPost,
  deletePost,
  editPost,
  getFriendsPosts,
  getPostDetail,
  getPosts,
} from "../post";

// 전체 게시글 가져오기
export function useGetPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
    staleTime: 1000,
    refetchOnMount: true,
  });
}
// 친구 게시글 가져오기
export function useGetFriendsPosts(userId: number) {
  return useQuery({
    queryKey: ["friendsPosts", userId],
    queryFn: () => getFriendsPosts(userId),
    refetchOnMount: true,
  });
}

// 상세 게시글 가져오기
export function useGetPostDetail(boardId: number) {
  return useQuery({
    queryKey: ["post", boardId],
    queryFn: () => getPostDetail(boardId),
    refetchOnMount: true,
  });
}

// 게시글 작성
export function useAddPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      content,
      postImage,
    }: {
      title: string;
      content: string;
      postImage: string;
    }) => addPost(title, content, postImage),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
}

// 게시글 수정
export function useEditPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      title,
      content,
      postImage,
    }: {
      boardId: number;
      title: string;
      content: string;
      postImage: string;
    }) => editPost(boardId, title, content, postImage),
    onSuccess: (boardId: number) =>
      queryClient.invalidateQueries({ queryKey: ["post", boardId] }),
  });
}

// 게시글 삭제
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardId: number) => deletePost(boardId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
}
