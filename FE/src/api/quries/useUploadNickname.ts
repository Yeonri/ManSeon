import { useMutation } from "@tanstack/react-query";
import { uploadNickname } from "../auth";

export function useUploadNickname() {
  return useMutation({
    mutationFn: ({ email, nickname }: { email: string; nickname: string }) =>
      uploadNickname(email, nickname),
  });
}
