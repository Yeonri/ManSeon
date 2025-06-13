import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addBoard,
  deleteBoard,
  editBoard,
  getBoardDetail,
  getBoards,
  getMyBoards,
  getOtherBoards,
  likeBoard,
  unlikeBoard,
} from "../board";
import { useApiMutation } from "../../hooks/useApiMutation";

// 게시글 전체 조회
export function useGetBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });
}

// 게시글 상세 조회
export function useGetBoardDetail(boardId: number) {
  return useQuery({
    queryKey: ["boardDetail", boardId],
    queryFn: () => getBoardDetail(boardId),
  });
}

// 내가 작성한 게시글 조회
export function useGetMyBoards() {
  return useQuery({
    queryKey: ["myBoard"],
    queryFn: getMyBoards,
  });
}

// 다른 유저가 작성한 게시글 조회
export function useGetOtherBoards(userId: string) {
  return useQuery({
    queryKey: ["otherBoard", userId],
    queryFn: () => getOtherBoards(userId),
  });
}

// 게시글 추가
export function useAddBoard() {
  return useApiMutation({
    mutationFn: ({
      title,
      content,
      image,
    }: {
      title: string;
      content: string;
      image: string;
    }) => addBoard(title, content, image),
    keysToInvalidate: [["boards"], ["myBoard"]],
    successMessage: "게시글이 성공적으로 등록되었습니다.",
    errorMessage: "게시글 등록 실패",
  });
}

// 게시글 변경
export function useEditBoard() {
  return useApiMutation({
    mutationFn: ({
      boardId,
      title,
      content,
      image,
    }: {
      boardId: number;
      title?: string;
      content?: string;
      image?: string;
    }) => editBoard(boardId, title, content, image),
    keysToInvalidate: [["boards"], ["myBoard"]],
    successMessage: "게시글이 성공적으로 변경되었습니다.",
    errorMessage: "게시글 변경 실패",
  });
}

// 게시글 삭제
export function useDeleteBoard() {
  return useApiMutation({
    mutationFn: (boardId: number) => deleteBoard(boardId),
    keysToInvalidate: [["boards"], ["myBoard"]],
    successMessage: "게시글이 성공적으로 삭제되었습니다.",
    errorMessage: "게시글 삭제 실패",
  });
}

// 게시글 좋아요
export function useLikeBoard() {
  return useMutation({
    mutationFn: (boardId: number) => likeBoard(boardId),
  });
}

// 게시글 좋아요 취소
export function useUnlikeBoard() {
  return useMutation({
    mutationFn: (boardId: number) => unlikeBoard(boardId),
  });
}
