import { useMutation } from "@tanstack/react-query";
import { signup } from "../auth";
import { Signup } from "../types/Signup";

export function useSignup() {
  return useMutation({
    mutationFn: (data: Signup) => signup(data),
  });
}
