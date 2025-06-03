import { updateUserInfo } from "../../../api/quries/useUserupdate";

export async function safeUpdateUserInfo(payload: {
  name?: string;
  nickname?: string;
  phoneNum?: string;
  profileImg?: string;
  // password?: string;
}): Promise<{ success: boolean; error?: unknown }> {
  try {
    await updateUserInfo(payload);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
