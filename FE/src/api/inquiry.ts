import authClient from "./client/authClient";

// 문의사항 전체 조회
export async function getInquiry() {
  try {
    const response = await authClient.get(`/inquiries`);
    console.log("문의사항 전체 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("문의사항 전체 조회 실패: ", error);
    return null;
  }
}

// 문의사항 상세 조회
export async function getInquiryDetail(inquiryId: number) {
  try {
    const response = await authClient.get(`/inquiries/${inquiryId}`);
    console.log("문의사항 상세 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("문의사항 상세 조회 실패: ", error);
    return null;
  }
}

// [유저] 문의사항 추가
export async function addInquiry(title: string, content: string) {
  try {
    const response = await authClient.post(`/inquiries`, { title, content });
    console.log("문의사항 추가 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("문의사항 추가 실패: ", error);
    return null;
  }
}

// [유저] 문의사항 변경
export async function editInquiry(
  inquiryId: number,
  title?: string,
  content?: string
) {
  try {
    const response = await authClient.patch(`/inquiries/${inquiryId}`, {
      title,
      content,
    });
    console.log("문의사항 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("문의사항 변경 실패: ", error);
    return null;
  }
}

// [유저] 문의사항 삭제
export async function deleteInquiry(inquiryId: number) {
  try {
    const response = await authClient.delete(`/inquiries/${inquiryId}`);
    console.log("문의사항 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("문의사항 삭제 실패: ", error);
    return null;
  }
}

// [관리자] 문의사항 답변 추가
export async function addInquiryAnswer(
  inquiryId: number,
  title: string,
  content: string
) {
  try {
    const response = await authClient.post(`/inquiries/${inquiryId}/answer`, {
      title,
      content,
    });
    console.log("문의사항 답변 추가 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("문의사항 답변 추가 실패: ", error);
    return null;
  }
}

// [관리자] 문의사항 변경
export async function editInquiryAnswer(
  inquiryId: number,
  title?: string,
  content?: string
) {
  try {
    const response = await authClient.patch(`/inquiries/${inquiryId}/answer`, {
      title,
      content,
    });
    console.log("문의사항 답변 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("문의사항 답변 변경 실패: ", error);
    return null;
  }
}

// [관리자] 문의사항 삭제
export async function deleteInquiryAnswer(inquiryId: number) {
  try {
    const response = await authClient.delete(`/inquiries/${inquiryId}/answer`);
    console.log("문의사항 답변 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("문의사항 답변 삭제 실패: ", error);
    return null;
  }
}
