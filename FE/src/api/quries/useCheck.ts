import { useQuery } from "@tanstack/react-query";
import { checkEmail, checkPhoneNum } from "../auth";

// 이메일 중복 여부 확인
export function useGetCheckEmail(email: string) {
  return useQuery({
    queryKey: ["email"],
    queryFn: () => checkEmail(email),
    enabled: false,
  });
}

// 핸드폰 중복 여부 확인
export function useGetCheckPhoneNum(phoneNum: string) {
  return useQuery({
    queryKey: ["phoneNum"],
    queryFn: () => checkPhoneNum(phoneNum),
    enabled: false,
  });
}
