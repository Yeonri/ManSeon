import { handleError } from "../utils/handleError";
import authClient from "./authClient";

// 답글 작성
export async function addRecomment(
  postId: number,
  commentId: number,
  content: string
) {
  try {
    const response = await authClient.post("/recomment", {
      postId,
      commentId,
      content,
    });
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}
// 답글 수정
export async function editRecomment(recommentId: number, content: string) {
  try {
    const response = await authClient.put("/recomment", {
      recommentId,
      content,
    });
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 답글 삭제
export async function deleteRecomment(recommentId: number) {
  try {
    const response = await authClient.delete("/recomment", {
      data: { recommentId },
    });
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}
