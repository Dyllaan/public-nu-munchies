import axios from "axios";
import * as api from './api'; 
import { toast } from "sonner";
import useUserSubsystem from "./use-user-subsystem";
import { atom } from "jotai";
import { useAtom } from "jotai";

/**
 * @author Louis Figes
 */

export const isModeratorAtom = atom(false);
export const loadingAtom = atom(false);

export const useModerator = () => {

    const [moderator, setIsModerator] = useAtom(isModeratorAtom);
    const [loadingStatus, setLoadingStatus] = useAtom(loadingAtom);

    const setLoading = (state:boolean) => {
        setLoadingStatus((loadingStatus) => state);
      }
      const setMod = (state:boolean) => {
        setIsModerator((moderator) => state);
      }

    async function checkModerator() {
        if(localStorage.getItem('token') === null){
          return;
        }
        if(localStorage.getItem('token') !== null && !moderator) {
          console.log("here");
          setLoading(true);
          const response = await api.get("moderator", localStorage.getItem("token"));
          if(response.success) {
            setMod(true);
          } else {
            toast.error("You are not a moderator");
          }
        }
        setLoading(false);
    }

    return {
        moderator,
        loadingStatus,
        checkModerator
    };
};

export default useModerator;
