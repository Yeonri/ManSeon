import { API_BASE } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Alert } from "react-native";
import client from "./client";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const authClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// 갱신 중 여부(true/false), 대기 중인 함수 리스트
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// 새로운 토큰으로 함수 갱신
function onRefreshed(newToken: string) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

// 대기 중인 함수 추가
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

// 토큰 갱신 요청
async function refreshingToken(): Promise<AxiosResponse|null> {
  // 토큰 저장소에서 갱신해야하는 토큰을 꺼내서 보냄
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  console.log("리프레시 토큰 요청 시도: ", refreshToken);
  try {
    const response = await client.post("/auth/refresh", {
      refreshToken: refreshToken,
    });
    console.log("리프레시 토큰 요청 성공:", response.data);
    return response;
  } catch (error) {
    console.log("리프레시 토큰 요청 실패:", error);
    return null;
  }
}

// 요청 가로채서 확인
authClient.interceptors.request.use(async (config) => {
  // 토큰 저장소에서 꺼냄
  const token = await AsyncStorage.getItem("accessToken");

  // 토큰이 있으면 해더에 토큰 추가
  if (token) {
    if (config.headers && typeof config.headers === "object") {
      (config.headers as Record<string, string>).authorization =
        `Bearer ${token}`;
    }
  }
  return config;
});

// 응답 가로채서 확인
authClient.interceptors.response.use(
  (response) => {
    // accessToken을 응답에서 꺼냄
    const accessToken = response.data?.data?.accessToken;

    if (typeof accessToken === "string") {
      AsyncStorage.setItem("accessToken", `${accessToken}`);
    }

    return response;
  },
  async (error: AxiosError) => {
    // 401 에러인 경우
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      // 이미 시도한 경우 에러로 처리
      if (originalRequest._retry) return Promise.reject(error);
      originalRequest._retry = true;

      // 토큰 갱신 중이면 대기 중인 함수에 추가
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            if (
              originalRequest.headers &&
              typeof originalRequest.headers === "object"
            ) {
              (
                originalRequest.headers as Record<string, string>
              ).authorization = newToken;
            }
            resolve(authClient(originalRequest));
          });
        });
      }

      // 토큰 갱신 중 상태 변경
      isRefreshing = true;
      try {
        // 응답에서 갱신된 accessToken과 refreshToken을 확인 후 토큰 저장소 갱신
        const response = await refreshingToken();
        
        // response가 null인 경우
        if (!response) {
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");
          Alert.alert("세션 만료", "다시 로그인해주세요.");
          return Promise.reject(error);
        }

        const { accessToken, refreshToken } = response.data.data;
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        authClient.defaults.headers.common.authorization = `Bearer ${accessToken}`;

        onRefreshed(accessToken);

        return authClient(originalRequest);
        // 오류 발생 시 토큰 저장소에서 토큰 삭제
      } catch (error) {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        Alert.alert("세션 만료", "다시 로그인해주세요.");
        return Promise.reject(error);

        // 토큰 갱신 중 상태 종료
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default authClient;
