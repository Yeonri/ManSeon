import { handleError } from "../utils/handleError";
import authClient from "./authClient";

// 전체 게시글 가져오기
export async function getPosts() {
  try {
    const response = await authClient.get("/board/all");
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 친구 게시글 가져오기
export async function getFriendsPosts(userId: number) {
  try {
    const response = await authClient.get(`board/following?user_id=${userId}`);
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 상세 게시글 가져오기
export async function getPostDetail(boardId: number) {
  try {
    const response = await authClient.get(
      `/board/all/detail?board_id=${boardId}`
    );
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 게시글 작성
export async function addPost(title: string, content: string) {
  try {
    const response = await authClient.post("/board", { title, content });
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}
// 게시글 수정
export async function editPost(
  boardId: number,
  title: string,
  content: string
) {
  try {
    const response = await authClient.put("/board", {
      boardId,
      title,
      content,
    });
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}
// 게시글 삭제
export async function deletePost(boardId: number) {
  try {
    const response = await authClient.delete("/board", {
      data: { boardId },
    });
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}
