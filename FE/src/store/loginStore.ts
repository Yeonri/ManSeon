import { create } from "zustand";

interface LoginState {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  isLoggedIn: false,
  logIn: () => set({ isLoggedIn: true }),
  logOut: () => set({ isLoggedIn: false }),
}));
