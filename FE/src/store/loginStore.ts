import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Auth } from "../types/Auth";
import { User } from "../types/User";

interface LoginState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setLogin: (auth: Auth) => Promise<void>;
  logout: () => Promise<void>;
  restoreLogin: () => Promise<void>;
}

export const useLoginStore = create<LoginState>()(
  subscribeWithSelector((set) => ({
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    user: null,

    // 로그인 상태 저장(앱 종료 후에도 로그인 유지)
    setLogin: async (auth) => {
      await AsyncStorage.setItem("accessToken", auth.accessToken);
      await AsyncStorage.setItem("refreshToken", auth.refreshToken);
      await AsyncStorage.setItem("user", JSON.stringify(auth.user));
      set({
        isLoggedIn: true,
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        user: auth.user,
      });
    },
    logout: async () => {
      await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
      set({
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
        user: null,
      });
    },

    // 앱 실행 시 로그인 상태 가져오기
    restoreLogin: async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const userString = await AsyncStorage.getItem("user");

      if (accessToken && refreshToken && userString) {
        try {
          const user: User = JSON.parse(userString);
          set({
            isLoggedIn: true,
            accessToken,
            refreshToken,
            user,
          });
        } catch (error) {
          console.error("유저 정보 가져오기 실패: ", error);
          await AsyncStorage.multiRemove([
            "accessToken",
            "refreshToken",
            "user",
          ]);
        }
      }
    },
  }))
);
