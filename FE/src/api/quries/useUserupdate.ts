import handleError from "../../utils/handleError";
import authClient from "../client/authClient";

export async function updateUserInfo(data: {
  nickname?: string;
  phoneNum?: string;
  password?: string;
  profileImg?: {
    uri: string;
    name: string;
    type: string;
  } | null;
}) {
  try {
    const formData = new FormData();

    const dto = {
      nickname: data.nickname,
      phoneNum: data.phoneNum,
      password: data.password ?? "",
    };

    formData.append("dto", JSON.stringify(dto));

    if (data.profileImg) {
      const fileName = data.profileImg.name.split("/").pop()!;
      const fileType = fileName.split(".").pop();
      formData.append("profileImg", {
        uri: data.profileImg,
        name: fileName,
        type: `image/${fileType}`,
      } as any);
    }

    const response = await authClient.patch("/users", formData);
    return response.data;
  } catch (e: unknown) {
    handleError(e);
  }
}
