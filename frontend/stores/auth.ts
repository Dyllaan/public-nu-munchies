import { atom } from "jotai";
// Define the atom type
interface UserState {
  name: string | undefined;
}
export const userAtom = atom<UserState>({
  name: undefined,
});
