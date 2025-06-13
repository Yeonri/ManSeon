import authClient from "./client/authClient";

// 게시글 전체 조회
export async function getBoards() {
  try {
    const response = await authClient.get(`/boards`);
    console.log("게시글 전체 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("게시글 전체 조회 실패: ", error);
    return null;
  }
}

// 게시글 상세 조회
export async function getBoardDetail(boardId: number) {
  try {
    const response = await authClient.get(`/boards/${boardId}`);
    console.log("게시글 상세 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("게시글 상세 조회 실패: ", error);
    return null;
  }
}

// 내가 작성한 게시글 조회
export async function getMyBoards() {
  try {
    const response = await authClient.get(`/boards/me`);
    console.log("내가 작성한 게시글 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("내가 작성한 게시글 조회 실패: ", error);
    return null;
  }
}

// 다른 유저가 작성한 게시글 조회
export async function getOtherBoards(userId: string) {
  try {
    const response = await authClient.get(`/boards/${userId}`);
    console.log("다른 유저가 작성한 게시글 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("다른 유저가 작성한 게시글 조회 실패: ", error);
    return null;
  }
}

// 게시글 추가
export async function addBoard(title: string, content: string, image: string) {
  try {
    const response = await authClient.post(`/boards`, {
      title,
      content,
      image,
    });
    console.log("게시글 추가 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("게시글 추가 실패: ", error);
    return null;
  }
}

// 게시글 변경
export async function editBoard(
  boardId: number,
  title?: string,
  content?: string,
  image?: string
) {
  try {
    const response = await authClient.patch(`/boards/${boardId}`, {
      title,
      content,
      image,
    });
    console.log("게시글 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("게시글 변경 실패: ", error);
    return null;
  }
}

// 게시글 삭제
export async function deleteBoard(boardId: number) {
  try {
    const response = await authClient.delete(`/boards/${boardId}`);
    console.log("게시글 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("게시글 삭제 실패: ", error);
    return null;
  }
}

// 게시글 좋아요
export async function likeBoard(boardId: number) {
  try {
    const response = await authClient.post(`/boards/${boardId}/like`);
    console.log("게시글 좋아요 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("게시글 좋아요 실패: ", error);
    return null;
  }
}

// 게시글 좋아요 취소
export async function unlikeBoard(boardId: number) {
  try {
    const response = await authClient.patch(`/boards/${boardId}/like`);
    console.log("게시글 좋아요 취소 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("게시글 좋아요 취소 실패: ", error);
    return null;
  }
}
