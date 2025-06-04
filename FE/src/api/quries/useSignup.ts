import { useMutation } from "@tanstack/react-query";
import { Signup } from "../../types/Signup";
import { signup } from "../auth";

export function useSignup() {
  return useMutation({
    mutationFn: (data: Signup) => signup(data),
  });
}
