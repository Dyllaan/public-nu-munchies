import { atom } from "jotai";
// Define the atom type
export interface AuthState {
  logged: boolean;
  loading: boolean;
}
export const statusAtom = atom<AuthState>({
  logged: false,
  loading: false,
});
