import { atom } from "jotai";

export interface AuthState {
    logged: boolean;
    loading: boolean;
  }
  export const statusAtom = atom<AuthState>({
    logged: false,
    loading: false,
  });