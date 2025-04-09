import { handleError } from "../utils/handleError";
import authClient from "./authClient";

// 댓글 가져오기
export async function getComments(boardId: number) {
  try {
    const response = await authClient.get(`/boards/${boardId}/comments`);
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 댓글 작성
export async function addComment(
  boardId: number,
  parentId: number | null,
  content: string
) {
  try {
    const response = await authClient.post(`/boards/${boardId}/comments`, {
      content,
      parentId,
    });
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 댓글 수정
export async function editComment(
  boardId: number,
  commentId: number,
  content: string
) {
  try {
    const response = await authClient.put(
      `/boards/${boardId}/comments/${commentId}`,
      {
        content,
      }
    );
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 댓글 삭제
export async function deleteComment(boardId: number, commentId: number) {
  try {
    const response = await authClient.delete(
      `/boards/${boardId}/comments/${commentId}`
    );
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}
