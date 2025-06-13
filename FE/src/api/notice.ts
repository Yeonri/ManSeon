import authClient from "./client/authClient";

// 공지사항 전체 조회
export async function getNotice() {
  try {
    const response = await authClient.get(`/notices`);
    console.log("공지사항 전체 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("공지사항 전체 조회 실패: ", error);
    return null;
  }
}

// 공지사항 상세 조회
export async function getNoticeDetail(noticeId: number) {
  try {
    const response = await authClient.get(`/notices/${noticeId}`);
    console.log("공지사항 상세 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("공지사항 상세 조회 실패: ", error);
    return null;
  }
}

// [관리자] 공지사항 추가
export async function addNotice(title: string, content: string) {
  try {
    const response = await authClient.post(`/notices`, { title, content });
    console.log("공지사항 추가 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("공지사항 추가 실패: ", error);
    return null;
  }
}

// [관리자] 공지사항 변경
export async function editNotice(
  noticeId: number,
  title?: string,
  content?: string
) {
  try {
    const response = await authClient.patch(`/notices/${noticeId}`, {
      title,
      content,
    });
    console.log("공지사항 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("공지사항 변경 실패: ", error);
    return null;
  }
}

// [관리자] 공지사항 삭제
export async function deleteNotice(noticeId: number) {
  try {
    const response = await authClient.delete(`/notices/${noticeId}`);
    console.log("공지사항 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("공지사항 삭제 실패: ", error);
    return null;
  }
}
