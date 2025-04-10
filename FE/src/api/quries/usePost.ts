import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPost,
  deletePost,
  editPost,
  getFriendsPosts,
  getLatestPosts,
  getMyPosts,
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
      postImg,
    }: {
      title: string;
      content: string;
      postImg: string;
    }) => addPost(title, content, postImg),
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
      postImg,
    }: {
      boardId: number;
      title: string;
      content: string;
      postImg: string;
    }) => editPost(boardId, title, content, postImg),
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

// 최근 게시글 확인
export function useGetLatestPost() {
  return useQuery({
    queryKey: ["latestPosts"],
    queryFn: () => getLatestPosts(),
    refetchOnMount: true,
  });
}

// 내 게시글 확인
export function useGetMyPost() {
  return useQuery({
    queryKey: ["myPosts"],
    queryFn: () => getMyPosts(),
    refetchOnMount: true,
  });
}
