import { handleError } from "../utils/handleError";
import authClient from "./authClient";

// 댓글 작성
export async function addComment(postId: number, content: string) {
  try {
    const response = await authClient.post("/comment", { postId, content });
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 댓글 수정
export async function editComment(commentId: number, content: string) {
  try {
    const response = await authClient.put("/comment", {
      commentId,
      content,
    });
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 댓글 삭제
export async function deleteComment(commentId: number) {
  try {
    const response = await authClient.delete("/comment", {
      data: { commentId },
    });
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}
