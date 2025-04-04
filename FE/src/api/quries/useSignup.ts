import { useMutation } from "@tanstack/react-query";
import { User } from "../types/User";
import { signup } from "../auth";

export function useSignup() {
  return useMutation({
    mutationFn: (data: User) => signup(data),
  });
}
