import { useMutation, useQuery } from "@tanstack/react-query";
import { useApiMutation } from "../../hooks/useApiMutation";
import {
  checkEmailDuplication,
  checkNicknameDuplication,
  editNickname,
  editPassword,
  editPhone,
  editProfileImage,
  emailLogin,
  getMyInformtaion,
  getOtherInformtaion,
  kakaoLogin,
  signup,
  withdrawal,
} from "../auth";
import { useLoginStore } from "../../store/loginStore";
import { Alert } from "react-native";

// 회원가입
export function useSignup() {
  return useApiMutation({
    mutationFn: ({
      email,
      password,
      nickname,
      phone,
    }: {
      email: string;
      password: string;
      nickname: string;
      phone: string;
    }) => signup(email, password, nickname, phone),
    keysToInvalidate: [],
    successMessage: "회원가입 성공",
    errorMessage: "회원가입 실패",
  });
}

// 이메일 로그인
export function useEmailLogin() {
  const setLogin = useLoginStore((state) => state.setLogin);

  return useApiMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      emailLogin(email, password),
    keysToInvalidate: [],
    successMessage: "로그인 성공",
    errorMessage: "로그인 실패",
    onSuccess: (data) => {
      if (data === null) {
        return;
      }
      console.log("로그인 성공: ", data);
      setLogin(data);
    },
    onError: (error) => {
      console.log("로그인 실패: ", error);
      Alert.alert("로그인 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// 카카오 로그인
export function useKakaologin() {
  const setLogin = useLoginStore((state) => state.setLogin);

  return useApiMutation({
    mutationFn: (accessToken: string) => kakaoLogin(accessToken),
    keysToInvalidate: [],
    successMessage: "로그인 성공",
    errorMessage: "로그인 실패",
    onSuccess: (data) => {
      if (data === null) {
        return;
      }
      console.log("로그인 성공: ", data);
      setLogin(data);
    },
    onError: (error) => {
      console.log("로그인 실패: ", error);
      Alert.alert("로그인 실패", "잠시 후 다시 시도해주세요.");
    },
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
export function useCheckEmailDuplication(email: string) {
  return useQuery({
    queryKey: ["emailDuplication", email],
    queryFn: () => checkEmailDuplication(email),
    enabled: false,
  });
}

// 닉네임 중복 확인
export function useCheckNicknameDuplication(nickname: string) {
  return useQuery({
    queryKey: ["nicknameDuplication", nickname],
    queryFn: () => checkNicknameDuplication(nickname),
    enabled: false,
  });
}

// 프로필 이미지 변경
export function useEditProfileImage() {
  return useApiMutation({
    mutationFn: (profileImage: string) => editProfileImage(profileImage),
    keysToInvalidate: [],
    successMessage: "프로필 이미지가 성공적으로 변경되었습니다.",
    errorMessage: "프로필 이미지 변경 실패",
  });
}

// 닉네임 변경
export function useEditNickname() {
  return useApiMutation({
    mutationFn: (nickname: string) => editNickname(nickname),
    keysToInvalidate: [],
    successMessage: "닉네임이 성공적으로 변경되었습니다.",
    errorMessage: "닉네임 변경 실패",
  });
}

// 핸드폰 번호 변경
export function useEditPhone() {
  return useApiMutation({
    mutationFn: (phone: string) => editPhone(phone),
    keysToInvalidate: [],
    successMessage: "핸드폰 번호가가 성공적으로 변경되었습니다.",
    errorMessage: "핸드폰 번호 변경 실패",
  });
}

// 비밀번호 변경
export function useEditPassword() {
  return useApiMutation({
    mutationFn: (password: string) => editPassword(password),
    keysToInvalidate: [],
    successMessage: "비밀번호가 성공적으로 변경되었습니다.",
    errorMessage: "비밀번호 변경 실패",
  });
}

// 내 정보 조회
export function useGetMyInformtaion() {
  return useQuery({
    queryKey: ["myInformtaion"],
    queryFn: getMyInformtaion,
  });
}

// 다른 유저 정보 조회
export function useGetOtherInformtaion(userId: number) {
  return useQuery({
    queryKey: ["otherInformtaion", userId],
    queryFn: () => getOtherInformtaion(userId),
  });
}
