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
    const formData = new FormData();

    const data = {
      title,
      content,
    };

    formData.append("data", JSON.stringify(data));

    if (postImg) {
      const fileName = postImg.split("/").pop()!;
      const fileType = fileName.split(".").pop();

      formData.append("image", {
        uri: postImg,
        name: fileName,
        type: `image/${fileType}`,
      } as any); // RN의 FormData에서 파일은 `as any` 필요
    }

    const response = await authClient.post("/boards", formData);

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
  postImg: string
) {
  try {
    const formData = new FormData();

    const data = {
      title,
      content,
    };

    formData.append("data", JSON.stringify(data));

    if (postImg) {
      const fileName = postImg.split("/").pop()!;
      const fileType = fileName.split(".").pop();

      formData.append("image", {
        uri: postImg,
        name: fileName,
        type: `image/${fileType}`,
      } as any); // RN의 FormData에서 파일은 `as any` 필요
    }

    const response = await authClient.post(`/boards/${boardId}`, formData);

    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 게시글 삭제
export async function deletePost(boardId: number) {
  try {
    console.log("삭제 시도:", boardId);
    const response = await authClient.delete(`/boards/${boardId}`);
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}

// 내 게시글 가져오기
export async function fetchMyPosts() {
  const res = await authClient.get("/boards/me");
  console.log("내 게시글 목록", res.data);
  return res.data.data;
}

// 최근 게시글 가져오기
export async function getLatestPosts() {
  const response = await authClient.get("/boards/latest");
  return response.data.data;
}
