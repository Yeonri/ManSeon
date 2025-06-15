// 이메일 유효성 검증
export function validateEmail(text: string): string {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(text) ? "" : "유효한 이메일 형식이 아닙니다.";
}

// 닉네임 유효성 검증
export function validateNickname(text: string): string {
  return text.trim().length > 0 && !text.includes(" ")
    ? ""
    : "공백 없이 입력해 주세요.";
}

// 핸드폰 유효성 검증
export function validatePhone(text: string): string {
  const numericOnly = text.replace(/[^0-9]/g, "");
  return /^[0-9]{10,11}$/.test(numericOnly)
    ? ""
    : "전화번호는 숫자 10~11자리여야 합니다.";
}

// 비밀번호 유효성 검증
export function validatePassword(text: string): string {
  return text.length >= 8 && /[A-Za-z]/.test(text) && /[0-9]/.test(text)
    ? ""
    : "비밀번호는 영문+숫자 포함 8자 이상입니다.";
}

// 비밀번호 확인 유효성 검증
export function validateCheckPassword(text: string, password: string): string {
  return text === password ? "" : "비밀번호가 일치하지 않습니다.";
}
