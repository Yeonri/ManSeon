import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { API_BASE } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const authClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function onRefreshed(newToken: string) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

async function refreshToken(): Promise<AxiosResponse> {
  return axios.get(`${API_BASE}/oauth/gitlab/refresh`);
}

authClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("access_token");
  if (token) {
    if (config.headers && typeof config.headers === "object") {
      (config.headers as Record<string, string>).authorization = token;
    }
  }
  return config;
});

authClient.interceptors.response.use(
  (response) => {
    const newToken = response.headers.authorization;
    if (newToken) {
      AsyncStorage.setItem("access_token", newToken);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      if (originalRequest._retry) return Promise.reject(error);
      originalRequest._retry = true;

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

      isRefreshing = true;
      try {
        const res = await refreshToken();
        const newToken: string = res.headers.authorization;
        await AsyncStorage.setItem("access_token", newToken);
        authClient.defaults.headers.common.authorization = newToken;
        onRefreshed(newToken);
        return authClient(originalRequest);
      } catch (err) {
        await AsyncStorage.removeItem("access_token");
        Alert.alert("세션 만료", "다시 로그인해주세요.");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default authClient;
