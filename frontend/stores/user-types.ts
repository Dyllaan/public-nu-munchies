import { atom } from "jotai";

export interface UserTypes {
  moderator? : boolean;
  councillor? : boolean;
}
export const userTypesAtom = atom<UserTypes>({
    moderator: false,
    councillor: false
});
