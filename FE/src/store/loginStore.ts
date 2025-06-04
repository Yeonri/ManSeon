import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Auth } from "../types/Auth";

interface LoginState {
  isLoggedIn: boolean;
  token: Auth | null;
  setLogin: (auth: Auth) => void;
  logout: () => void;
}

export const useLoginStore = create<LoginState>()(
  subscribeWithSelector((set) => ({
    isLoggedIn: false,
    token: null,
    setLogin: (auth) => set({ isLoggedIn: true, token: auth }),
    logout: () => set({ isLoggedIn: false, token: null }),
  }))
);
