import { atom } from "jotai";

export interface UserState {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  verified: boolean;
  created_at?: string;
  allowed?: boolean;
  banned?: boolean;
}
export const userAtom = atom<UserState>({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  verified: false,
  created_at: undefined,
  allowed: false,
  banned: false
});
