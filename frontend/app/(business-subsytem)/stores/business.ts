import { atom } from "jotai";
import { IBusiness } from "../components/my-business-card";
import { BusinessResponse } from "../businesses/page";

export interface BusinessState {
  loadedMyBusinesses: IBusiness[] | undefined;
  loadingMyBusinesses: boolean;
}
export const businessesAtom = atom<BusinessState>({
  loadedMyBusinesses: undefined,
  loadingMyBusinesses: true,
});
