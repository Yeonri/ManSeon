import { useMutation, useQuery } from "@tanstack/react-query";
import { useApiMutation } from "../../hooks/useApiMutation";
import {
  checkEmailDuplication,
  checkNicknameDuplication,
  editNickname,
  editPassword,
  editPhoneNumber,
  editProfileImage,
  getMyInformtaion,
  getOtherInformtaion,
  kakaologin,
  login,
  signup,
  withdrawal,
} from "../auth";

// 자체 회원 가입
export function useSignup() {
  return useApiMutation({
    mutationFn: ({
      email,
      password,
      nickname,
    }: {
      email: string;
      password: string;
      nickname: string;
    }) => signup(email, password, nickname),
    keysToInvalidate: [],
    successMessage: "회원 가입되었습니다.",
    errorMessage: "회원 가입 실패",
  });
}

// 카카오 로그인
export function useKakaologin() {
  //   const setLogin = useLoginStore((state) => state.setLogin);

  return useApiMutation({
    mutationFn: (accessToken: string) => kakaologin(accessToken),
    keysToInvalidate: [],
    successMessage: "로그인 성공",
    errorMessage: "로그인 실패",
    // onSuccess: (data) => {
    //   if (data === null) {
    //     return;
    //   }
    //   console.log("로그인 성공: ", data);
    //   setLogin(data);
    // },
  });
}

// 회원 탈퇴
export function useWithdrawal() {
  return useApiMutation({
    mutationFn: () => withdrawal(),
    keysToInvalidate: [],
    successMessage: "회원 탈퇴되었습니다.",
    errorMessage: "회원 탈퇴 실패",
  });
}

// 이메일 중복 확인
export function useCheckEmailDuplication() {
  return useMutation({
    mutationFn: (email: string) => checkEmailDuplication(email),
  });
}

// 닉네임 중복 확인
export function useCheckNicknameDuplication() {
  return useMutation({
    mutationFn: (nickname: string) => checkNicknameDuplication(nickname),
  });
}

// 로그인
export async function useLogin() {
  // const setLogin = useLoginStore((state) => state.setLogin);

  return useApiMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    keysToInvalidate: [],
    successMessage: "로그인 성공",
    errorMessage: "로그인 실패",
    // onSuccess: (data) => {
    //   if (data === null) {
    //     return;
    //   }
    //   console.log("로그인 성공: ", data);
    //   setLogin(data);
    // },
  });
}

// 프로필 이미지 변경
export async function useEditProfileImage() {
  return useApiMutation({
    mutationFn: (profileImage: string) => editProfileImage(profileImage),
    keysToInvalidate: [],
    successMessage: "프로필 이미지가 성공적으로 변경되었습니다.",
    errorMessage: "프로필 이미지 변경 실패",
  });
}

// 닉네임 변경
export async function useEditNickname() {
  return useApiMutation({
    mutationFn: (nickname: string) => editNickname(nickname),
    keysToInvalidate: [],
    successMessage: "닉네임이 성공적으로 변경되었습니다.",
    errorMessage: "닉네임 변경 실패",
  });
}

// 핸드폰 번호 변경
export async function useEditPhoneNumber() {
  return useApiMutation({
    mutationFn: (phoneNumber: string) => editPhoneNumber(phoneNumber),
    keysToInvalidate: [],
    successMessage: "핸드폰 번호가가 성공적으로 변경되었습니다.",
    errorMessage: "핸드폰 번호 변경 실패",
  });
}

// 비밀번호 변경
export async function useEditPassword() {
  return useApiMutation({
    mutationFn: (password: string) => editPassword(password),
    keysToInvalidate: [],
    successMessage: "비밀번호가 성공적으로 변경되었습니다.",
    errorMessage: "비밀번호 변경 실패",
  });
}

// 내 정보 조회
export async function useGetMyInformtaion() {
  return useQuery({
    queryKey: ["myInformtaion"],
    queryFn: getMyInformtaion,
  });
}

// 다른 유저 정보 조회
export async function useGetOtherInformtaion(userId: number) {
  return useQuery({
    queryKey: ["otherInformtaion", userId],
    queryFn: () => getOtherInformtaion(userId),
  });
}
