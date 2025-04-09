import { handleError } from "../utils/handleError";
import authClient from "./authClient";

// 전체 게시글 가져오기
export async function getPosts() {
  try {
    const response = await authClient.get("/boards");
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
    const response = await authClient.get(`/boards/${boardId}`);
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 게시글 작성
export async function addPost(title: string, content: string, postImg: string) {
  try {
    const response = await authClient.post("/boards", {
      title,
      content,
      postImg,
    });
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}
// 게시글 수정
export async function editPost(
  boardId: number,
  title: string,
  content: string,
  postImage: string
) {
  try {
    const response = await authClient.put(`/boards/${boardId}`, {
      title,
      content,
      postImage,
    });
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}
// 게시글 삭제
export async function deletePost(boardId: number) {
  try {
    const response = await authClient.delete(`/boards/${boardId}`);
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}
