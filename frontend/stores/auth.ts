import { atom } from "jotai";
// Define the atom type
export interface UserState {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  verified: boolean;
}
export const userAtom = atom<UserState>({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  verified: false,
});
