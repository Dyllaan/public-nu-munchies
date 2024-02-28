import { atom } from "jotai";
// Define the atom type
interface UserState {
  name: string | undefined;
  email: string | undefined;
  token: string | undefined;
}
export const userAtom = atom<UserState>({
  name: undefined,
  email: undefined,
  token: undefined
});
