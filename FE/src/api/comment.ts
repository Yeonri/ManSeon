import authClient from "./client/authClient";

// 댓글 조회
export async function getComments(boardId: number) {
  try {
    const response = await authClient.get(`/boards/${boardId}/comment`);
    console.log("댓글 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("댓글 조회 실패: ", error);
    return null;
  }
}

// 댓글 추가
export async function addComment(boardId: number, content: string) {
  try {
    const response = await authClient.post(`/boards/${boardId}/comment`, {
      content,
    });
    console.log("댓글 추가 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("댓글 추가 실패: ", error);
    return null;
  }
}

// 댓글 변경
export async function editComment(
  boardId: number,
  commentId: number,
  content: string
) {
  try {
    const response = await authClient.patch(
      `/boards/${boardId}/comment/${commentId}`,
      { content }
    );
    console.log("댓글 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("댓글 변경 실패: ", error);
    return null;
  }
}

// 댓글 삭제
export async function deleteComment(boardId: number, commentId: number) {
  try {
    const response = await authClient.delete(
      `/boards/${boardId}/comment/${commentId}`
    );
    console.log("댓글 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("댓글 삭제 실패: ", error);
    return null;
  }
}
